import { createRouter, createWebHistory } from 'vue-router'

const HomeView = ()=>import('@/views/home/HomeView.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/echats',
      name:'echats',
      component:()=>import('@/views/echats/index.vue'),
      children:[
        {
          path: '/echats/weather',
          name:'weather',
          component: ()=>import('@/views/echats/views/weather/index.vue')
        },
      ]
    }
  ]
})

export default router
