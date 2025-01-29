// src/router/hola-mundo/hola-mundo.routes.ts
import { type RouteRecordRaw } from 'vue-router';

const empresaRoutes: RouteRecordRaw = {
  path: 'empresas',
  component: () => import('@/views/person/persona/Persona.vue'),
  meta: {
    requiresAuth: true,
    layout: 'empresas',
    title: 'Empresas',
  },
  children: [
    {
      path: '', // ruta base para la lista
      name: 'list',
      component: () => import('@/views/person/persona/PersonaList.vue'),
      meta: { title: 'Empresas lista' }
    }
  ]
};

export default empresaRoutes;
