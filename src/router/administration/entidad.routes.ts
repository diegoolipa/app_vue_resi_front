// src/router/hola-mundo/hola-mundo.routes.ts
import { type RouteRecordRaw } from 'vue-router';

const entidadRoutes: RouteRecordRaw = {
  path: 'entidades',
  component: () => import('@/views/person/persona/Persona.vue'),
  meta: {
    requiresAuth: true,
    layout: 'entidades',
    title: 'Entidades',
  },
  children: [
    {
      path: '', // ruta base para la lista
      name: 'list',
      component: () => import('@/views/person/persona/PersonaList.vue'),
      meta: { title: 'Entidades lista' }
    }
  ]
};

export default entidadRoutes;
