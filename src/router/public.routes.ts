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
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]
