import { type RouteRecordRaw } from 'vue-router';

const departamentoRoutes: RouteRecordRaw = {
  path: 'departamentos',
  component: () => import('@/views/administration/departamento/Departamento.vue'),
  meta: {
    requiresAuth: true,
    layout: 'departamento',
    title: 'Departamentos',
  },
  children: [
    {
      path: '', // ruta base para la lista
      name: 'Dlist',
      component: () => import('@/views/administration/departamento/DepartamentoList.vue'),
      meta: { title: 'Lista' }
    }
  ]
};

export default departamentoRoutes;
