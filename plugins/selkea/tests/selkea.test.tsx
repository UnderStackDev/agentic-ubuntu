import { describe, expect, test } from 'claude-code/testing'
import type { Engine } from 'claude-code/testing'
import type { On, PromptOrigin, RenderElement } from 'claude-code'

const PLUGIN = 'selkea'
const ANSWER = 'Valmista tuli.\n\n- **Build** onnistui\n- testit menivät läpi'
const PLAIN = 'Valmista tuli.\n\n- build onnistui\n- testit menivät läpi'
const NOTE = 'Katson ensin asetukset:'

const engineText = (Text: (props: Record<string, unknown>, ...children: unknown[]) => RenderElement) => <Text>engine</Text>

function engineBeneath(on: On): void {
  on('ui.render', { component: 'AssistantMessage' }, ($, e) => engineText($.ui.resolve(e).Text))
  on('ui.render', { component: 'UserMessage' }, ($, e) => engineText($.ui.resolve(e).Text))
  on('ui.render', { component: 'TurnDuration' }, ($, e) => engineText($.ui.resolve(e).Text))
}

const fromEngine = { type: 'Text', text: 'engine' } as const

const mountReply = ($: Engine, surface: 'terminal' | 'desktop', text: string) =>
  $.ui.mount({ plugin: PLUGIN, surface, component: 'AssistantMessage', props: { text, isFirstOfReply: true } })

const mountPrompt = ($: Engine, surface: 'terminal' | 'desktop', text: string, origin: PromptOrigin = { kind: 'composer' }) =>
  $.ui.mount({ plugin: PLUGIN, surface, component: 'UserMessage', props: { text, origin, isExpanded: true } })

const boldText = async (ui: Awaited<ReturnType<typeof mountReply>>, text: string) =>
  (await ui.findAll({ type: 'Text', text })).find(t => t.props.bold && t.text === text)?.props

describe('omat viestit', () => {
  test('kehyksessä otsikolla Sinä', async ($, on) => {
    engineBeneath(on)
    const ui = await mountPrompt($, 'terminal', '  korjaa kirjautuminen  ')
    const boxes = await ui.findAll({ type: 'Box' })
    expect(boxes.some(b => b.props.borderStyle === 'round' && b.props.borderColor === 'suggestion')).toBe(true)
    expect((await ui.find({ type: 'Text', text: 'Sinä' }))?.text).toBe(' Sinä ')
    expect(await ui.find(fromEngine)).toBeUndefined()
  })

  test('englanninkielinen otsikko asetuksella', { options: { language: 'en' } }, async ($, on) => {
    engineBeneath(on)
    const ui = await mountPrompt($, 'terminal', 'fix it')
    expect((await ui.find({ type: 'Text', text: 'You' }))?.text).toBe(' You ')
  })

  test('ilmoitukset ja muut pinnat jäävät ennalleen', async ($, on) => {
    engineBeneath(on)
    for (const ui of [
      await mountPrompt($, 'terminal', 'Build finished', { kind: 'task-notification' }),
      await mountPrompt($, 'desktop', 'korjaa'),
    ]) expect(await ui.find(fromEngine)).toBeDefined()
  })
})

describe('Clauden teksti', () => {
  test('vastaus kehyksessä markdownina', async ($, on) => {
    engineBeneath(on)
    const ui = await mountReply($, 'terminal', PLAIN)
    const boxes = await ui.findAll({ type: 'Box' })
    expect(boxes.some(b => b.props.borderColor === 'claude')).toBe(true)
    expect((await ui.find({ type: 'Markdown' }))?.text).toBe(PLAIN)
  })

  test('lyhyt huomio on himmeä sisennetty rivi', async ($, on) => {
    engineBeneath(on)
    const ui = await mountReply($, 'terminal', NOTE)
    expect((await ui.find({ type: 'Markdown' }))?.props).toMatchObject({ dimColor: true, text: NOTE })
    expect((await ui.findAll({ type: 'Box' })).some(b => b.props.borderStyle)).toBe(false)
  })

  test('kaikki-asetus kehystää myös huomiot', { options: { boxes: 'kaikki' } }, async ($, on) => {
    engineBeneath(on)
    const ui = await mountReply($, 'terminal', NOTE)
    expect((await ui.findAll({ type: 'Box' })).some(b => b.props.borderColor === 'claude')).toBe(true)
  })

  test('työpöytäpinta jää ennalleen', async ($, on) => {
    engineBeneath(on)
    expect(await (await mountReply($, 'desktop', ANSWER)).find(fromEngine)).toBeDefined()
  })
})

describe('lihavointi', () => {
  test('lihavoitu teksti piirretään turkoosina', async ($, on) => {
    engineBeneath(on)
    const ui = await mountReply($, 'terminal', ANSWER)
    expect((await boldText(ui, 'Build'))).toMatchObject({ bold: true, color: 'cyan' })
    // A paragraph without bold stays with the engine.
    expect((await ui.findAll({ type: 'Markdown' })).map(m => m.text)).toEqual(['Valmista tuli.'])
  })

  test('värin voi vaihtaa', { options: { bold: 'violetti' } }, async ($, on) => {
    engineBeneath(on)
    const ui = await mountReply($, 'terminal', ANSWER)
    expect((await boldText(ui, 'Build'))).toMatchObject({ color: 'magenta' })
  })

  test('pois jättää moottorin markdownin', { options: { bold: 'pois' } }, async ($, on) => {
    engineBeneath(on)
    const ui = await mountReply($, 'terminal', ANSWER)
    expect((await ui.find({ type: 'Markdown' }))?.text).toBe(ANSWER)
  })

  test('koodilohkot ja taulukot jäävät moottorille', async ($, on) => {
    engineBeneath(on)
    const text = '**Tulos:**\n\n```\n**ei lihavoitu**\n```\n\n| a | **b** |\n|---|---|\n| 1 | 2 |'
    const ui = await mountReply($, 'terminal', text)
    expect((await boldText(ui, 'Tulos:'))).toMatchObject({ color: 'cyan' })
    const md = await ui.findAll({ type: 'Markdown' })
    expect(md.map(m => m.text)).toEqual(['```\n**ei lihavoitu**\n```\n\n| a | **b** |\n|---|---|\n| 1 | 2 |'])
  })

  test('himmeä huomio säilyttää lihavoinnin värin', async ($, on) => {
    engineBeneath(on)
    const ui = await mountReply($, 'terminal', 'Ajan **testit** nyt')
    expect((await boldText(ui, 'testit'))).toMatchObject({ bold: true, color: 'cyan' })
  })
})

describe('vuoron loppu', () => {
  test('viiva kestoineen', async ($, on) => {
    engineBeneath(on)
    const ui = await $.ui.mount({ plugin: PLUGIN, surface: 'terminal', component: 'TurnDuration', props: { word: 'Baked', durationMs: 64000 } })
    expect((await ui.find({ type: 'Text', text: '1 min 4 s' }))?.text).toContain('──')
  })
})
