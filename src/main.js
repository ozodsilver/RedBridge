import { createApp } from "vue";
import router from "./routes/index";
import App from "./App.vue";
import store from "./store/store.js";
import base from "./reusables/getInfos.js";
import naive from 'naive-ui'

import Navigation from "./components/MiniComponents/Navigation.vue";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



window.base = base;
const app = createApp(App);

import Tooltip from 'primevue/tooltip';

app.directive('tooltip', Tooltip);

app.component('VueDatePicker', VueDatePicker);
app.component('Navigation', Navigation)

app.use(router);
app.use(store);

app.use(naive)



app.mount("#app");
