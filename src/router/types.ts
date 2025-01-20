export interface RouteMeta {
    title?: string
    layout?: 'default' | 'auth' | 'admin'
    requiresAuth?: boolean
}

declare module 'vue-router' {
    interface RouteMeta extends RouteMeta {}
}