import type { Elements, RenderChildren, RenderElement } from 'claude-code'

type Ui = Pick<Elements['terminal'], 'Box' | 'Text' | 'Link' | 'Markdown'>

type Span =
  | string
  | { kind: 'strong' | 'em'; children: Span[] }
  | { kind: 'code'; text: string }
  | { kind: 'link'; href: string; children: Span[] }

type Block =
  | { kind: 'heading'; depth: number; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'item'; marker: string; indent: number; text: string }

// A chunk is a run of lines between blank lines; `blocks` is set when we draw it ourselves.
type Chunk = { text: string; blocks?: Block[] }

const FENCE = /^ {0,3}(`{3,}|~{3,})/
// Anything the engine draws better than we would: quotes, tables, rules, html, indented code.
const ENGINE_ONLY = [/^ {0,3}>/, /^\s*\|/, /^ {0,3}([-*_])( *\1){2,} *$/, /^ {0,3}<\/?[A-Za-z!]/, /^ {4}/, /^ {0,3}(=+|-+) *$/]
const HEADING = /^ {0,3}(#{1,6})\s+(.*?)(?:\s+#+)?\s*$/
const ITEM = /^( *)([-*+]|\d{1,9}[.)])\s+(.*)$/
const LINKABLE = /^(?:https?|file):/i

/**
 * Draws markdown like the engine's own `Markdown`, except that paragraphs, headings
 * and lists holding **bold** text are drawn here so the bold can carry a color.
 */
export function drawMarkdown(ui: Ui, text: string, boldColor: string | undefined, dimColor = false): RenderElement {
  const { Box, Markdown } = ui
  const native = (t: string) => <Markdown text={t} dimColor={dimColor} />
  if (!boldColor || !text.includes('**')) return native(text)

  // Neighbouring engine chunks are joined back so lists and tables keep their own spacing.
  const chunks: Chunk[] = []
  for (const c of splitChunks(text)) {
    const prev = chunks.at(-1)
    if (prev && !prev.blocks && !c.blocks) prev.text += `\n\n${c.text}`
    else chunks.push(c)
  }
  if (!chunks.some(c => c.blocks)) return native(text)

  const draw = blockDrawer(ui, boldColor, dimColor)
  return (
    <Box flexDirection="column">
      {chunks.map((c, i) => (
        <Box flexDirection="column" marginTop={i ? 1 : 0}>
          {c.blocks ? draw(c.blocks) : native(c.text)}
        </Box>
      ))}
    </Box>
  )
}

function blockDrawer({ Box, Text, Link }: Ui, boldColor: string, dim: boolean) {
  const spans = (src: Span[]): RenderChildren =>
    src.map(s => {
      if (typeof s === 'string') return s
      if (s.kind === 'code') return <Text color="permission">{s.text}</Text>
      const inner = spans(s.children)
      if (s.kind === 'strong') return <Text bold color={boldColor}>{inner}</Text>
      if (s.kind === 'em') return <Text italic>{inner}</Text>
      if (s.kind !== 'link') return inner
      return LINKABLE.test(s.href) ? <Link href={s.href}>{inner}</Link> : <Text>{inner}</Text>
    })

  return (blocks: Block[]): RenderChildren =>
    blocks.map((b, i) => {
      const prose = spans(parseInline(b.text))
      const marginTop = blocks[i - 1]?.kind === 'heading' ? 1 : 0
      if (b.kind === 'item') {
        const marker = /\d/.test(b.marker) ? b.marker.replace(')', '.') : '-'
        return (
          <Box flexDirection="row" paddingLeft={b.indent} marginTop={marginTop}>
            <Box width={marker.length + 1} flexShrink={0}>
              <Text dimColor={dim}>{marker}</Text>
            </Box>
            <Text dimColor={dim}>{prose}</Text>
          </Box>
        )
      }
      const h1 = b.kind === 'heading' && b.depth === 1
      return (
        <Box marginTop={marginTop}>
          <Text dimColor={dim} bold={b.kind === 'heading'} italic={h1} underline={h1}>
            {prose}
          </Text>
        </Box>
      )
    })
}

function splitChunks(text: string): Chunk[] {
  const chunks: Chunk[] = []
  let lines: string[] = []
  let fence: RegExp | undefined
  const close = () => {
    if (lines.length) chunks.push({ text: lines.join('\n'), blocks: parseChunk(lines) })
    lines = []
  }
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\r$/, '').replace(/\t/g, '    ')
    if (fence) {
      lines.push(line)
      if (fence.test(line)) fence = undefined
      continue
    }
    if (!line.trim()) {
      close()
      continue
    }
    const open = FENCE.exec(line)?.[1]
    if (open) fence = new RegExp(`^ {0,3}${open.charAt(0)}{${open.length},}\\s*$`)
    lines.push(line)
  }
  close()
  return chunks
}

function parseChunk(lines: string[]): Block[] | undefined {
  if (!lines.some(l => l.includes('**'))) return
  if (lines.some(l => FENCE.test(l) || ENGINE_ONLY.some(re => re.test(l) && !ITEM.test(l)))) return

  const blocks: Block[] = []
  for (const line of lines) {
    const heading = HEADING.exec(line)
    const item = ITEM.exec(line)
    const last = blocks.at(-1)
    if (heading) blocks.push({ kind: 'heading', depth: heading[1]?.length ?? 1, text: heading[2] ?? '' })
    else if (item) blocks.push({ kind: 'item', indent: Math.min(item[1]?.length ?? 0, 16), marker: item[2] ?? '-', text: item[3] ?? '' })
    else if (last && last.kind !== 'heading') last.text += ` ${line.trim()}`
    else blocks.push({ kind: 'paragraph', text: line.trim() })
  }
  return blocks.some(b => hasStrong(parseInline(b.text))) ? blocks : undefined
}

function hasStrong(spans: Span[]): boolean {
  return spans.some(s => typeof s !== 'string' && s.kind !== 'code' && (s.kind === 'strong' || hasStrong(s.children)))
}

function parseInline(src: string): Span[] {
  const out: Span[] = []
  let buf = ''
  const push = (span: Span, end: number) => {
    if (buf) out.push(buf)
    buf = ''
    out.push(span)
    return end
  }
  let i = 0
  while (i < src.length) {
    const rest = src.slice(i)
    let m: RegExpExecArray | null
    if (rest[0] === '\\' && rest[1] && /[!-/:-@[-`{-~]/.test(rest[1])) {
      buf += rest[1]
      i += 2
    } else if ((m = /^(`+)([\s\S]*?[^`])\1(?!`)/.exec(rest))) {
      i = push({ kind: 'code', text: (m[2] ?? '').trim() }, i + m[0].length)
    } else if ((m = /^(\*\*|__)(?=\S)([\s\S]*?\S)\1/.exec(rest))) {
      i = push({ kind: 'strong', children: parseInline(m[2] ?? '') }, i + m[0].length)
    } else if ((m = /^\*(?=[^\s*])([\s\S]*?[^\s*])\*(?!\*)/.exec(rest)) || (m = /^_(?=\S)([\s\S]*?\S)_(?![\p{L}\p{N}])/u.exec(rest))) {
      if (rest[0] === '_' && /[\p{L}\p{N}]/u.test(src.charAt(i - 1))) {
        buf += '_'
        i++
      } else i = push({ kind: 'em', children: parseInline(m[1] ?? '') }, i + m[0].length)
    } else if ((m = /^\[([^\]]*)\]\(<?([^)\s>]+)>?(?:\s+"[^"]*")?\)/.exec(rest))) {
      i = push({ kind: 'link', href: m[2] ?? '', children: parseInline(m[1] ?? '') }, i + m[0].length)
    } else {
      buf += rest[0]
      i++
    }
  }
  if (buf) out.push(buf)
  return out
}
