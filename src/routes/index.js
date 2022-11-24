import { createRouter, createWebHashHistory } from "vue-router";
import Authorization from '../components/Authorization.vue'
import Home from '../components/Home.vue'

import Students from '../components/departments/Students.vue'
import Grades from '../components/departments/Grades.vue'
import Subjects from '../components/departments/Subjects.vue'
import addTeachers from '../components/departments/forChildren/postTeacher.vue'
const routes = [
    {
        path:'/',
        name:'auth',
        component:Authorization
    },
    {
        path:'/Home',
        name:'home',
        component:Home,
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
    },
    {
        path:'/Subjects',
        name:'Subjects',
        component:Subjects  
    },
    {
        path:'/addTeachers',
        name:'addTeachers',
        component:addTeachers  
    }

    
]



const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router;