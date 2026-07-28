<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { author, bookTitle, collections, standalonePoems } from '@/data/catalog'
</script>

<template>
  <main class="page page--home">
    <header>
      <h1 class="brand">
        Poem<em>Book</em>
      </h1>
      <p class="lede">Сборник стихов — одиночные произведения и цикл «Зеркало Утерянной Души».</p>
      <span class="author">{{ author }}</span>
    </header>

    <section class="section" aria-labelledby="cycles-label">
      <h2 id="cycles-label" class="section-label">Циклы</h2>
      <RouterLink
        v-for="collection in collections"
        :key="collection.id"
        class="collection-link"
        :to="{ name: 'collection', params: { id: collection.id } }"
      >
        <span class="collection-link__meta">
          {{ collection.subtitle }} · {{ collection.poems.length }} частей
        </span>
        <span class="collection-link__title">{{ collection.title }}</span>
        <span v-if="collection.description" class="collection-link__desc">
          {{ collection.description }}
        </span>
      </RouterLink>
    </section>

    <section class="section" aria-labelledby="poems-label">
      <h2 id="poems-label" class="section-label">Стихотворения</h2>
      <ul class="poem-list">
        <li v-for="poem in standalonePoems" :key="poem.slug">
          <RouterLink class="poem-link" :to="{ name: 'poem', params: { slug: poem.slug } }">
            <span class="poem-link__title">{{ poem.title }}</span>
            <span v-if="poem.lang === 'be'" class="poem-link__lang">бел</span>
          </RouterLink>
        </li>
      </ul>
    </section>

    <span class="visually-hidden">{{ bookTitle }}</span>
  </main>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
