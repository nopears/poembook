import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CollectionView from '../views/CollectionView.vue'
import PoemView from '../views/PoemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/collection/:id',
      name: 'collection',
      component: CollectionView,
      props: true,
    },
    {
      path: '/collection/:id/:slug',
      name: 'collection-poem',
      component: PoemView,
      props: true,
    },
    {
      path: '/poem/:slug',
      name: 'poem',
      component: PoemView,
      props: true,
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
