// src/router/guards.ts
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const token = localStorage.getItem('access_token_pinia');
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !token) {
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    });
    return;
  }

  if (to.path === '/auth/login' && token) {
    next('/admin/perfil');
    return;
  }

  next();
};