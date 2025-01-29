// src/router/hola-mundo/hola-mundo.routes.ts
import { type RouteRecordRaw } from 'vue-router';

const personaRoutes: RouteRecordRaw = {
  path: 'usuarios',
  component: () => import('@/views/person/persona/Persona.vue'),
  meta: {
    requiresAuth: true,
    layout: 'usuario',
    title: 'Usuario',
  },
  children: [
    {
      path: '', // ruta base para la lista
      name: 'usuarios-list',
      component: () => import('@/views/person/persona/PersonaList.vue'),
      meta: { title: 'Usuarios listaaaa' }
    },
    {
      path: 'persona-detalle/:userId/:personaId',
      name: 'persona-detail',
      component: () => import('@/views/person/persona/PersonaDetail.vue'),
      meta: { title: 'Detalle Persona' }
    }
  ]
};

export default personaRoutes;
