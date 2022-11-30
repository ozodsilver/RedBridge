import { createApp } from 'vue'
import router from './routes/index'
import App from './App.vue'

import axios from 'axios'
import store from './store/store.js'



const app = createApp(App)

app.use(router, axios)
app.use(store)



app.mount('#app')
