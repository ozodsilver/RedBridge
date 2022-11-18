import { createRouter, createWebHashHistory } from "vue-router";
import Authorization from '../components/Authorization.vue'
const routes = [
    {
        path:'/',
        name:'auth',
        component:Authorization
    }
]



const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router;