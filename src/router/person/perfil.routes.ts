// src/router/hola-mundo/hola-mundo.routes.ts
import { type RouteRecordRaw } from 'vue-router';
import Perfil from '../../views/admin/perfil/Perfil.vue';

const perfilRoutes: RouteRecordRaw = {
  path: 'perfil',
  component: () => Perfil,
  meta: {
    requiresAuth: true,
    layout: 'person',
    title: 'Perfil',
  },
  children: [
    // {
    //   path: 'usuarios',
    //   name: 'usuarios',
    //   component: () => import('../../views/person/usuario/Usuario.vue'),
    //   meta: { title: 'Lista - Usuarios' },
    // },
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

export default perfilRoutes;
