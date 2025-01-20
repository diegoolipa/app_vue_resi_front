import Login from "../../views/auth/Login.vue";
import Register from "../../views/auth/Register.vue";
import Acerca from "../../views/web/Acerca.vue";

export default {
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
}