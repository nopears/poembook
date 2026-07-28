<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getCollection } from '@/data/catalog'

const props = defineProps<{ id: string }>()
const router = useRouter()

const collection = computed(() => getCollection(props.id))

if (!collection.value) {
  router.replace({ name: 'home' })
}
</script>

<template>
  <main v-if="collection" class="page">
    <div class="topbar">
      <RouterLink class="back-link" :to="{ name: 'home' }">← К сборнику</RouterLink>
      <RouterLink class="topbar__brand" :to="{ name: 'home' }">PoemBook</RouterLink>
    </div>

    <header class="page-heading">
      <p class="page-heading__eyebrow">{{ collection.subtitle }}</p>
      <h1 class="page-heading__title">{{ collection.title }}</h1>
      <p v-if="collection.description" class="page-heading__desc">
        {{ collection.description }}
      </p>
    </header>

    <ol class="poem-list">
      <li v-for="(poem, index) in collection.poems" :key="poem.slug">
        <RouterLink
          class="poem-link"
          :to="{ name: 'collection-poem', params: { id: collection.id, slug: poem.slug } }"
        >
          <span class="poem-link__title">
            <span class="index">{{ String(index + 1).padStart(2, '0') }}</span>
            {{ poem.title }}
          </span>
          <span v-if="poem.format === 'prose'" class="poem-link__lang">послесловие</span>
        </RouterLink>
      </li>
    </ol>
  </main>
</template>

<style scoped>
.index {
  display: inline-block;
  min-width: 1.8rem;
  margin-right: 0.55rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: var(--mist-dim);
  font-family: var(--font-ui);
  font-style: normal;
}
</style>
