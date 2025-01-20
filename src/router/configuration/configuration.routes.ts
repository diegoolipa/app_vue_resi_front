// src/router/hola-mundo/hola-mundo.routes.ts
import { type RouteRecordRaw } from 'vue-router';

const configurationRoutes: RouteRecordRaw = {
  path: 'configuration',
//   component: () => import('../../components/hola-mundo/HelloWorld.vue'),
  meta: {
    requiresAuth: true,
    layout: 'admin',
    title: 'Hola Mundo',
  },
  children: [
    {
      path: 'hola-mundo-list',
      name: 'hola-mundo-list',
      component: () => import('../../components/hola-mundo/HelloWorld.vue'),
      meta: { title: 'Lista - Hola Mundo' },
    },
    // {
    //   path: 'crear',
    //   name: 'hola-mundo-create',
    //   component: () => import('@/views/hola-mundo/HolaMundoCreate.vue'),
    //   meta: { title: 'Crear - Hola Mundo' }
    // },
    // {
    //   path: 'editar/:id',
    //   name: 'hola-mundo-edit',
    //   component: () => import('@/views/hola-mundo/HolaMundoEdit.vue'),
    //   meta: { title: 'Editar - Hola Mundo' }
    // }
  ],
};

export default configurationRoutes;
