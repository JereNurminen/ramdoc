import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import { writeLocalCopy, readLocalCopy, checkLocalCopyExistence } from './files'

const getProp = (
  card: HTMLElement,
  selector: string,
  index: number = 0
): string => {
  const value = card.querySelector<HTMLElement>(selector)
  return (value && value.textContent) || ''
}

const getListProp = (
  card: HTMLElement,
  selector: string
): ReadonlyArray<string> => {
  const values = Array.from(card.querySelectorAll<HTMLElement>(selector))
  return values ? values.map(val => val.textContent || '') : ['']
}

const getDocs = async (): Promise<string> =>
  await fetch('https://ramdajs.com/docs/').then(res => res.text())

const initDoc = async (): Promise<Documentation> => {
  const dom = new JSDOM(await getDocs())
  const cards = Array.from(
    dom.window.document.querySelectorAll<HTMLElement>('section.card')
  )
  const entries = cards.map(card => ({
    name: getProp(card, 'a.name'),
    description: getProp(card, 'div.description'),
    signature: getProp(card, 'code:nth-child(1)'),
    snippet: getProp(card, 'code:nth-child(2)'),
    related: getListProp(card, 'div.see>a')
  }))
  writeLocalCopy(entries)
  return entries
}

export const loadDocs = async (): Promise<Documentation> => {
  const hasLocalCopy = await checkLocalCopyExistence()
  const docs = hasLocalCopy ? await readLocalCopy() : await initDoc()
  if (!hasLocalCopy) {
    await writeLocalCopy(docs)
  }
  return docs
}
