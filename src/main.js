import { createApp } from 'vue'
import router from './routes/index'
import App from './App.vue'
import { Quasar } from 'quasar'
import Axios from 'axios'
import { WebSocketServer } from "ws";



const app = createApp(App)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
app.use(router, Axios, WebSocketServer)



app.mount('#app')
