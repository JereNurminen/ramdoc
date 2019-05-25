import { loadDocs } from './utils/doc'
import { formatEntry } from './utils/format'

const main = async (): Promise<void> => {
  const funcName = process.argv[2]
  const docs = await loadDocs()
  const foundFuncs = funcName
    ? docs.filter(({ name }) => name.includes(funcName))
    : docs
  foundFuncs
    .map(formatEntry)
    .flat()
    .map(a => process.stdout.write(`${a}\n`))
}

main()
