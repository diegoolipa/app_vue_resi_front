// src/router/hola-mundo/hola-mundo.routes.ts
import { type RouteRecordRaw } from 'vue-router';

const accesoRoutes: RouteRecordRaw = {
  path: 'rol',
  component: () => import('@/views/setup/rol/Rol.vue'),
  meta: {
    requiresAuth: true,
    layout: 'rol',
    title: 'Rol',
  },
  children: [
    {
      path: '', // ruta base para la lista
      name: 'rol-lista',
      component: () => import('@/views/setup/rol/RolLista.vue'),
      meta: { title: 'Rol lista' }
    }
  ]
};

export default accesoRoutes;
