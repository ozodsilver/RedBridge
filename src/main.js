import { createApp } from 'vue'
import router from './routes/index'
import App from './App.vue'

import axios from 'axios'




const app = createApp(App)

app.use(router, axios)



app.mount('#app')
