import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { authGuard } from './guards'
import { handleTitle } from './title.handler'
import protectedRoutes from './protected.routes'
import publicRoutes from './public.routes'
import authRoutes from './auth/auth.routes'

const routes = [
    ...publicRoutes,
    authRoutes,
    protectedRoutes  // Todas las rutas protegidas
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(authGuard)
router.afterEach(handleTitle)

export default router