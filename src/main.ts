import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

interface Entry {
  name: string
  signature: string
  description: string
  snippet: string
}

const getProp = (
  card: HTMLElement,
  selector: string,
  index: number = 0
): string => {
  const value = card.querySelector<HTMLElement>(selector)
  return (value && value.textContent) || ''
}

const getDocs = async (): Promise<string> =>
  await fetch('https://ramdajs.com/docs/').then(res => res.text())

const initDoc = async (): Promise<ReadonlyArray<Entry>> => {
  const dom = new JSDOM(await getDocs())
  const cards = Array.from(
    dom.window.document.querySelectorAll<HTMLElement>('section.card')
  )
  return cards.map(card => ({
    name: getProp(card, 'a.name'),
    description: getProp(card, 'div.description'),
    signature: getProp(card, 'code:nth-child(1)'),
    snippet: getProp(card, 'code:nth-child(2)')
  }))
}

const main = async (): Promise<void> => {
  const funcName = process.argv[2]
  const documentation = await initDoc()
  const foundFuncs = documentation.filter(({ name }) => name.includes(funcName))
  console.log(foundFuncs.length ? foundFuncs : documentation)
}

main()
