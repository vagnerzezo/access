import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware para verificar autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;