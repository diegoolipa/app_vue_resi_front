import AppLayout from '@/layout/AppLayout.vue';
import usuarioRoutes from './person/Usuario.routes';
import perfilRoutes from './person/perfil.routes';

export default {
    path: '/app',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
        // holaMundoRoutes,
        usuarioRoutes,
        perfilRoutes,
        // personaRoutes,
        // reservaRoutes,
        // configuracionRoutes,
        // Agrega más módulos aquí
    ]
}