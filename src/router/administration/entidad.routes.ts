import { type RouteRecordRaw } from 'vue-router';

const entidadRoutes: RouteRecordRaw = {
  path: 'entidades',
  component: () => import('@/views/administration/entidad/Entidad.vue'),
  meta: {
    requiresAuth: true,
    layout: 'entidades',
    title: 'Entidades',
  },
  children: [
    {
      path: '', // ruta base para la lista
      name: 'list',
      component: () => import('@/views/administration/entidad/EntidadList.vue'),
      meta: { title: 'Lista' }
    }
  ]
};

export default entidadRoutes;
