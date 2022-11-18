import { createApp } from 'vue'
import router from './routes/index'
import App from './App.vue'
import { Quasar } from 'quasar'






const app = createApp(App)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
app.use(router)
app.mount('#app')
