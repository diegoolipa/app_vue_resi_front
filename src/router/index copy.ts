// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { authGuard } from './guards';

// Importaciones de vistas
import Register from '../views/auth/Register.vue';
import Acerca from '../views/web/Acerca.vue';
import Inicio from '../views/web/Inicio.vue';
import Login from '../views/auth/Login.vue';
import Perfil from '../views/admin/perfil/Perfil.vue';

// Importaciones de rutas modulares
import holaMundoRoutes from './hola-mundo/hola-mundo.routes';
import AppLayout from '@/layout/AppLayout.vue';
import UsuarioRoutes from './person/usuario.routes';

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    component: Inicio,
    meta: {
      layout: 'default',
      title: 'Inicio'
    }
  },
  {
    path: '/auth',
    meta: { layout: 'auth' },
    children: [
      {
        path: 'acerca',
        component: Acerca,
        meta: { title: 'Acerca de' }
      },
      {
        path: 'register',
        component: Register,
        meta: { title: 'Registro' }
      },
      {
        path: 'login',
        component: Login,
        meta: { title: 'Iniciar Sesión' }
      }
    ]
  },
  {
    path: '/admin',
    component: AppLayout,
    meta: { 
      requiresAuth: true,
      layout: 'admin'
    },
    children: [
      {
        path: 'perfil',
        component: Perfil,
        meta: { 
          title: 'Mi Perfil'
        }
      },
      holaMundoRoutes,
      UsuarioRoutes,
    ]
  },
  // Módulo de rutas externo

  // Ruta para manejar 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Configurar guards
router.beforeEach(authGuard);

// Configurar título de la página
router.afterEach((to) => {
  document.title = to.meta.title 
    ? `${to.meta.title} - Resi` 
    : 'Resi';
});

export default router;