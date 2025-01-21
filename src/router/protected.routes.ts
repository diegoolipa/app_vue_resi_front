import personaRoutes from './person/persona.routes';
import perfilRoutes from './person/perfil.routes';
import AppLayout from '@/layout/AppLayout.vue';

export default {
    path: '/app',
    component: AppLayout,
    meta: { 
        requiresAuth: true,
        layout: 'app',
        title: 'App' 
    },
    children: [
        perfilRoutes,
        // holaMundoRoutes,
        personaRoutes,
        // personaRoutes,
        // reservaRoutes,
        // configuracionRoutes,
        // Agrega más módulos aquí
    ]
}