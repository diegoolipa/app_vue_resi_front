// import { APP_NAME, DEFAULT_TITLE } from '@/config/app.config'
import type { RouteLocationNormalized } from 'vue-router'
import { APP_NAME, DEFAULT_TITLE } from '../config/app.config'

export function handleTitle(to: RouteLocationNormalized): void {
    document.title = to.meta.title 
        ? `${to.meta.title} - ${APP_NAME}` 
        : DEFAULT_TITLE
}