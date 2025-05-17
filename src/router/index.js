import { createRouter, createWebHistory } from 'vue-router'
import PracticeOneView from '@/views/PracticeOneView.vue'
import AboutView from '@/views/AboutView.vue'
import PrivacyView from '@/views/PrivacyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'practiceOne', component: PracticeOneView },
    { path: '/privacy', name: 'privacy-policy', component: PrivacyView },
    { path: '/about', name: 'about', component: AboutView },
  ],
})

export default router
