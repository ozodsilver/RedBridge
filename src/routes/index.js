import { createRouter, createWebHashHistory } from "vue-router";
import Authorization from '../components/Authorization.vue'
import Home from '../components/Home.vue'

import Students from '../components/departments/Students.vue'
import Grades from '../components/departments/Grades.vue'
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
    },

    
 

    {
        path:'/Students',
        name:'Students',
        component:Students  
    },
    {
        path:'/Grades',
        name:'Grades',
        component:Grades  
    }
]



const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router;