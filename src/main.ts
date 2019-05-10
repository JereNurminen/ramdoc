import fetch from 'node-fetch'
import { JSDOM } from 'jsdom' 

const getDocs = async (): Promise<string> => 
  await fetch('https://ramdajs.com/docs/')
    .then((res) => res.text())


const initDoc = async (): Promise<unknown> => {
  const dom = new JSDOM(await getDocs())
  const cards = Array.from(
    dom.window.document.querySelectorAll('section.card')
  )
  return cards.map((card) => ( {name: card.querySelector('a.name').innerHTML} ))
}

const main = async (): Promise<void> => {
  console.log("Hello!")
  console.log(await initDoc())
}

main()
