import { createRouter, createWebHashHistory } from "vue-router";
import Authorization from '../components/Authorization.vue'
import Home from '../components/Home.vue'
const routes = [
    {
        path:'/',
        name:'auth',
        component:Authorization
    },
    {
        path:'/Home',
        name:'home',
        component:Home  
    }
]



const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router;