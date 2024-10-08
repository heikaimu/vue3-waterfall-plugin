import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/page-a',
    },
    {
      path: '/page-a',
      name: 'PageA',
      component: () => import('./components/PageA.vue'),
    },
    {
      path: '/page-b',
      name: 'PageB',
      component: () => import('./components/PageB.vue'),
    },
    {
      path: '/page-c',
      name: 'PageC',
      component: () => import('./components/PageC.vue'),
    },
    {
      path: '/page-d',
      name: 'PageD',
      component: () => import('./components/PageD.vue'),
    },
    {
      path: '/page-e',
      name: 'PageE',
      component: () => import('./components/PageE.vue'),
    },
  ],
})

export default router
