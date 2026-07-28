export type PoemFormat = 'verse' | 'prose'

export interface Poem {
  slug: string
  title: string
  format: PoemFormat
  stanzas: string[][]
  prose?: string
  lang?: 'ru' | 'be'
}

export interface Collection {
  id: string
  title: string
  subtitle?: string
  description?: string
  poems: Poem[]
}
