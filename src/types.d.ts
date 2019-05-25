interface Entry {
  name: string
  signature: string
  description: string
  snippet: string
  related: ReadonlyArray<string>
}

type Documentation = ReadonlyArray<Entry>

interface Settings { searchTerm: string }
