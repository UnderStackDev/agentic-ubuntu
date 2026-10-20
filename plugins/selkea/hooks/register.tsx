import type { Register, RenderElement } from 'claude-code'
import { drawMarkdown } from './markdown'

// A one-line block this short is a note between steps, not an answer.
const NOTE_MAX_CHARS = 160

const isNote = (text: string): boolean => !text.includes('\n') && text.length <= NOTE_MAX_CHARS

const fmtDuration = (ms: number): string => {
  const s = Math.max(1, Math.round(ms / 1000))
  const m = Math.floor(s / 60)
  return m ? `${m} min ${s % 60} s` : `${s} s`
}

const BOLD_COLORS: Record<string, string | undefined> = {
  turkoosi: 'cyan',
  vihreä: 'green',
  violetti: 'magenta',
  pois: undefined,
}

type Element = (props: Record<string, unknown>, ...children: unknown[]) => RenderElement

export const register: Register = (on, options) => {
  const boxAll = options.boxes === 'kaikki'
  const you = options.language === 'en' ? 'You' : 'Sinä'
  // Raw ANSI names, so the shade follows the terminal's own palette in light and dark.
  const bold = String(options.bold)
  const boldColor = bold in BOLD_COLORS ? BOLD_COLORS[bold] : 'cyan'

  const framed = (Box: Element, Text: Element, title: string, color: string, body: RenderElement): RenderElement => (
    <Box flexDirection="column" marginTop={1} marginX={1}>
      <Box flexDirection="column" borderStyle="round" borderColor={color} paddingX={1}>
        {body}
      </Box>
      <Box position="absolute" top={0} left={3}>
        <Text color={color} bold>{` ${title} `}</Text>
      </Box>
    </Box>
  )

  on('ui.render', { component: 'UserMessage' }, ($, e, next) => {
    const text = e.props.text.trim()
    if (e.surface !== 'terminal' || e.props.origin.kind !== 'composer' || !text) return next(e)
    const { Box, Text } = $.ui.resolve(e)
    return framed(Box, Text, you, 'suggestion', <Text>{text}</Text>)
  })

  on('ui.render', { component: 'AssistantMessage' }, ($, e, next) => {
    const text = e.props.text.trim()
    if (e.surface !== 'terminal' || e.props.isSummary || !text) return next(e)
    const ui = $.ui.resolve(e)
    const { Box, Text } = ui
    if (!boxAll && isNote(text)) {
      return (
        <Box flexDirection="row" marginTop={1} paddingLeft={2}>
          <Text color="subtle">{'· '}</Text>
          {drawMarkdown(ui, text, boldColor, true)}
        </Box>
      )
    }
    return framed(Box, Text, 'Claude', 'claude', drawMarkdown(ui, text, boldColor))
  })

  on('ui.render', { component: 'TurnDuration' }, ($, e, next) => {
    if (e.surface !== 'terminal') return next(e)
    const { Box, Text } = $.ui.resolve(e)
    const label = ` ✻ ${e.props.word} · ${fmtDuration(e.props.durationMs)} `
    const width = Math.max(24, (e.viewport?.columns ?? 80) - 2)
    return (
      <Box marginTop={1}>
        <Text color="subtle" wrap="truncate-end">
          {`──${label}${'─'.repeat(Math.max(0, width - label.length - 2))}`}
        </Text>
      </Box>
    )
  })
}
