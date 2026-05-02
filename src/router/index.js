import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Puri Rasa Catering — Kehangatan Masakan Keluarga' },
  },
  {
    path: '/tentang',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Kisah Puri Rasa — Tentang Kami' },
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/MenuView.vue'),
    meta: { title: 'Menu Kami — Puri Rasa Catering' },
  },
  {
    path: '/layanan',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Layanan Kami — Puri Rasa Catering' },
  },
  {
    path: '/testimoni',
    name: 'testimonial',
    component: () => import('@/views/TestimonialView.vue'),
    meta: { title: 'Cerita & Momen — Puri Rasa Catering' },
  },
  {
    path: '/kontak',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Pusat Bantuan & Kontak — Puri Rasa' },
  },
  // 404 fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// Update title saat rute berubah
router.beforeEach((to) => {
  document.title = to.meta.title || 'Puri Rasa Catering'
})

export default router
