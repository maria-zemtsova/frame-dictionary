import HomePage from '@/views/HomePage.vue'
import FramePage from '@/views/FramePage.vue'
import NotFound from '@/views/NotFound.vue'
import SourcesComponent from '@/components/SourcesComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/frames/:frameSlug',
      name: 'frame',
      component: FramePage,
      props: true,
    },
    {
      path: '/frames/:frameSlug/:subframeSlug',
      name: 'subframe',
      component: FramePage,
      props: true,
    },
    // Общий fallback для 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/sources',
      name: 'sources',
      component: SourcesComponent,
    },
  ],
})

export default router
