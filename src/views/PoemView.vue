<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getCollection, getPoemInCollection, getStandalonePoem } from '@/data/catalog'

const props = defineProps<{
  slug: string
  id?: string
}>()

const router = useRouter()

const context = computed(() => {
  if (props.id) {
    const found = getPoemInCollection(props.id, props.slug)
    if (!found) return null
    return {
      poem: found.poem,
      index: found.index,
      prev: found.prev,
      next: found.next,
      collectionId: props.id,
      total: getCollection(props.id)?.poems.length ?? 0,
      backTo: { name: 'collection' as const, params: { id: props.id } },
      backLabel: 'К циклу',
    }
  }

  const poem = getStandalonePoem(props.slug)
  if (!poem) return null
  return {
    poem,
    index: undefined as number | undefined,
    prev: undefined,
    next: undefined,
    collectionId: undefined as string | undefined,
    total: 0,
    backTo: { name: 'home' as const },
    backLabel: 'К сборнику',
  }
})

if (!context.value) {
  router.replace({ name: 'home' })
}
</script>

<template>
  <main v-if="context" class="page">
    <div class="topbar">
      <RouterLink class="back-link" :to="context.backTo">← {{ context.backLabel }}</RouterLink>
      <RouterLink class="topbar__brand" :to="{ name: 'home' }">PoemBook</RouterLink>
    </div>

    <article class="poem-shell">
      <h1 class="poem-title">{{ context.poem.title }}</h1>

      <div v-if="context.poem.format === 'prose'" class="prose">
        {{ context.poem.prose }}
      </div>

      <div v-else class="poem-body">
        <p v-for="(stanza, sIndex) in context.poem.stanzas" :key="sIndex" class="stanza">
          <span v-for="(line, lIndex) in stanza" :key="lIndex" class="line">{{ line }}</span>
        </p>
      </div>
    </article>

    <nav v-if="context.collectionId && context.index !== undefined" class="cycle-nav">
      <RouterLink
        v-if="context.prev"
        class="cycle-nav__btn"
        :to="{
          name: 'collection-poem',
          params: { id: context.collectionId, slug: context.prev.slug },
        }"
      >
        ← {{ context.prev.title }}
      </RouterLink>
      <span v-else class="cycle-nav__btn" aria-disabled="true">←</span>

      <span class="cycle-nav__count">{{ context.index + 1 }} / {{ context.total }}</span>

      <RouterLink
        v-if="context.next"
        class="cycle-nav__btn cycle-nav__btn--next"
        :to="{
          name: 'collection-poem',
          params: { id: context.collectionId, slug: context.next.slug },
        }"
      >
        {{ context.next.title }} →
      </RouterLink>
      <span v-else class="cycle-nav__btn cycle-nav__btn--next" aria-disabled="true">→</span>
    </nav>
  </main>
</template>
