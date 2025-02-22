import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

// import { vuelidate } from '@vuelidate/core'

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app')
