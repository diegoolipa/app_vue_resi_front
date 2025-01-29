// src/router/hola-mundo/hola-mundo.routes.ts
import { type RouteRecordRaw } from 'vue-router';

const departamentoRoutes: RouteRecordRaw = {
  path: 'departamentos',
  component: () => import('@/views/person/persona/Persona.vue'),
  meta: {
    requiresAuth: true,
    layout: 'departamento',
    title: 'Departamentos',
  },
  children: [
    {
      path: '', // ruta base para la lista
      name: 'list',
      component: () => import('@/views/person/persona/PersonaList.vue'),
      meta: { title: 'Departamentos lista' }
    }
  ]
};

export default departamentoRoutes;
