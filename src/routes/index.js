import { createRouter, createWebHashHistory } from "vue-router";
import Authorization from '../components/Authorization.vue'
import Home from '../components/Home.vue'

import Students from '../components/departments/Students.vue'
import Grades from '../components/departments/Grades.vue'
import Subjects from '../components/departments/Subjects.vue'
import addTeachers from '../components/departments/forChildren/postTeacher.vue'
import AddGrades from '../components/departments/forChildren/AddGrades.vue'
import ForSubjects from '../components/departments/forChildren/ForSubjects.vue'
import AddSubjects from '../components/departments/forChildren/AddSubjects.vue'
import ForStudents from '../components/departments/forChildren/ForStudents.vue'
import AddStudents from '../components/departments/forChildren/AddStudents.vue'

import store from '../store/store'
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
        component:Grades,
        meta: { transition: 'bounce' },
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
    },

    {
        path:'/addGrades',
        name:'addGrades',
        component:AddGrades  
    },

    
    {
        path:'/AddSubjects',
        name:'AddSubjects',
        component:AddSubjects  
    },


    {
        path:'/AddStudents',
        name:'AddStudents',
        component:AddStudents  
    },




    {
        path:'/ForSubjects/:id',
        name:'ForSubjects',
        component:ForSubjects,
        props:true  
    },

    {
        path:'/ForStudents/:id',
        name:'ForStudents',
        component:ForStudents,
        props:true  
    }
 
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

router.beforeEach(async (to, from )=>{

if((to.name !== 'auth') && store.state.isAuthenticated == false){
    return {name:'auth'}
}

})

export default router;