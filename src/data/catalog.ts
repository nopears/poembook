import type { Collection, Poem } from './types'
import { standalonePoems } from './standalone'
import { zerkaloPoems } from './zerkalo'

export { standalonePoems, zerkaloPoems }

export const author = 'Вальдемар Громов'
export const bookTitle = 'PoemBook'

export const zerkaloCollection: Collection = {
  id: 'zerkalo',
  title: 'Зеркало Утерянной Души',
  subtitle: 'Цикл',
  description: 'Одиннадцать частей и послесловие — путь сквозь зеркало.',
  poems: zerkaloPoems,
}

export const collections: Collection[] = [zerkaloCollection]

export const poems: Poem[] = [...zerkaloPoems, ...standalonePoems]

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id)
}

export function getPoemInCollection(
  collectionId: string,
  slug: string,
): { poem: Poem; index: number; prev?: Poem; next?: Poem } | undefined {
  const collection = getCollection(collectionId)
  if (!collection) return undefined
  const index = collection.poems.findIndex((p) => p.slug === slug)
  if (index === -1) return undefined
  return {
    poem: collection.poems[index],
    index,
    prev: collection.poems[index - 1],
    next: collection.poems[index + 1],
  }
}

export function getStandalonePoem(slug: string): Poem | undefined {
  return standalonePoems.find((p) => p.slug === slug)
}
