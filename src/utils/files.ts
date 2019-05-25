import * as fs from 'fs'
import { promisify } from 'util'

const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)

export const writeLocalCopy = async (
  documentation: Documentation
): Promise<void> => await write('docs', JSON.stringify(documentation))

export const checkLocalCopyExistence = async (): Promise<boolean> =>
  new Promise(resolve => fs.access('docs', fs.constants.F_OK, e => resolve(!e)))

export const readLocalCopy = async (): Promise<Documentation> => {
  process.stdout.write('Reading local copy of documentation...')
  const docs = await read('docs')
  return JSON.parse(docs.toString())
}
