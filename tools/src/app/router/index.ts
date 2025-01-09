import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/app/home/HomeView.vue'
import { useMapMaker } from '../mapmaker/pages'

const mapMaker = useMapMaker()

const router = createRouter({
  history: { ...createWebHistory('/'),  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...mapMaker.routes
  ],
})

export default router
