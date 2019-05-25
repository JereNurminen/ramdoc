import { loadDocs } from './utils/doc'
import { formatEntry } from './utils/format'

const main = async (): Promise<void> => {
  const searchQuery = process.argv[2]
  const docs = await loadDocs()
  const foundFuncs = searchQuery
    ? docs.filter(
      ({ name }) => name.search(new RegExp(searchQuery, 'i')) >= 0)
    : docs
  foundFuncs
    .map(formatEntry)
    .flat()
    .map(a => process.stdout.write(`${a}\n`))
}

main()
