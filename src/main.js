import { createApp } from "vue";
import router from "./routes/index";
import App from "./App.vue";

import axios from "axios";
import store from "./store/store.js";
import base from "./reusables/getInfos.js";
import naive from 'naive-ui'

const app = createApp(App);

app.use(router, axios);
app.use(store);
app.use(base);
app.use(naive)
app.mount("#app");
