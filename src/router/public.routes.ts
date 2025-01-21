import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';

export default [
    {
        path: '/',
        component: () => import('@/views/web/inicio.vue'),
        meta: { 
            layout: 'public',
            title: 'Inicio' 
        }
    },
    {
        path: '/nosotros',
        component: () => import('@/views/web/Acerca.vue'),
        meta: { 
            layout: 'public',
            title: 'Nosotros' 
        }
    },
    {
        path: '/contacto',
        component: () => import('@/views/web/Contacto.vue'),
        meta: { 
            layout: 'public',
            title: 'Contacto' 
        }
    },
    {
    path: '/registro',
    component: Register,
    meta: { 
        layout: 'public',
        title: 'Registro' 
        }
    },
    {
    path: '/login',
    component: Login,
    meta: { 
        layout: 'public',
        title: 'Iniciar Sesión' 
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]
