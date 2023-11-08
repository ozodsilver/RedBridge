import { createApp } from "vue";
import router from "./routes/index";
import App from "./App.vue";
import store from "./store/store.js";
import base from "./reusables/getInfos.js";
import naive from 'naive-ui'
import '@/assets/style.css'
import '@/styles/main.scss';
import Navigation from "./components/MiniComponents/Navigation.vue";

// tooltip
import Tooltip from 'primevue/tooltip';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// primeVue component library
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';

// prime toats component library
import ToastService from 'primevue/toastservice';
import "primevue/resources/themes/lara-light-indigo/theme.css";
window.base = base;
const app = createApp(App);



app.directive('tooltip', Tooltip);

app.component('VueDatePicker', VueDatePicker);
app.component('Navigation', Navigation)
app.directive('tooltip', Tooltip);
app.use(router);
app.use(store);

app.use(naive)

app.use(PrimeVue);

app.use(ToastService);

app.mount("#app");
