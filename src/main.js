import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

// Importa solo los estilos básicos necesarios
// Cambio en el codigo

import 'primeicons/primeicons.css'; // Iconos

const app = createApp(App);

app.use(PrimeVue);

app.mount('#app');
