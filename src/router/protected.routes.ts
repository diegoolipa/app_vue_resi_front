import personaRoutes from './person/persona.routes';
import perfilRoutes from './person/perfil.routes';
import AppLayout from '@/layout/AppLayout.vue';
import accesoRoutes from './setup/rol.routes';
import departamentoRoutes from './administration/departamento.routes';
import empresaRoutes from './administration/empresa.routes';
import entidadRoutes from './administration/entidad.routes';

export default {
    path: '/app',
    component: AppLayout,
    meta: { 
        requiresAuth: true,
        layout: 'app',
        title: 'App' 
    },
    children: [
        {
            path: 'setup',
            name: 'setup',
            meta: {
                requiresAuth: true,
                layout: 'setup',
                title: 'Setup'
            },
            children: [
                personaRoutes,
                perfilRoutes,
                accesoRoutes,
            ]
        },

        {
            path: 'administration',
            name: 'administration',
            meta: {
                requiresAuth: true,
                layout: 'administration',
                title: 'Administration'
            },
            children: [
                departamentoRoutes,
                empresaRoutes,
                entidadRoutes
            ]
        },
    ]
}