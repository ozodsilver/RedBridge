import { createRouter, createMemoryHistory, createWebHistory } from "vue-router";
import Authorization from "../components/Authorization.vue";
import Home from "../components/Home.vue";

import Students from "../components/departments/Students.vue";
import Grades from "../components/departments/Grades.vue";
import Parents from "../components/Parents.vue";


import Subjects from "../components/departments/Subjects.vue";
import addTeachers from "../components/departments/forChildren/postTeacher.vue";
import AddGrades from "../components/departments/forChildren/AddGrades.vue";
import ForSubjects from "../components/departments/forChildren/ForSubjects.vue";
import AddSubjects from "../components/departments/forChildren/AddSubjects.vue";
import ForStudents from "../components/departments/forChildren/ForStudents.vue";
import AddStudents from "../components/departments/forChildren/AddStudents.vue";
import AddParents from "../components/departments/forChildren/AddParents.vue";
import forParent from "../components/departments/forChildren/forParent.vue";
import AddStudentForParent from "../components/departments/forChildren/AddStudentForParent.vue";
import SelectStudent from "../components/departments/forChildren/SelectStudent.vue";
import classes from "../components/departments/classes.vue";
import insideClass from "../components/departments/forChildren/insideClasses.vue"
import insideHistory from "../components/History/components/insideHistory.vue"
import historyTable from '../components/History/components/historyTable.vue'



import store from "../store/store";
const routes = [
  {
    path: "/",
    name: "auth",
    component: ()=> import('../components/Authorization.vue'),
   
  },
  {
    path: "/Dashboard",
    name: "dashboard",
    component: ()=>import('../components/Dashboard/Dashboard.vue'),
    children:[
      {
        path: "/classes",
        name: "classes",
        component: classes,
      },
      {
        path: "/insideClasses/:id",
        name: "insideClasses",
       component:insideClass
      },
      {
        path: "",
        name: "home",
        component: Home,
      },
    
      {
        path: "/Parents",
        name: "parents",
        component: Parents,
      },
    
    
      {
        path: "/History",
        name: "history",
        component: ()=> import('../components/History/History.vue'),
      },

      {
        path: "/Complaints",
        name: "complaints",
        component: ()=> import('../components/departments/Complaints.vue'),
      },


    
      {
        path: "/History/:id",
        name: "insideHistory",
        component: insideHistory,
      },
    
      {
        path: "/History/:id/table",
        name: "historyTable",
        component: historyTable,
      },

      {
        path: "/subjectsHistory/:id",
        name: "historySubjects",
        component:  ()=> import('../components/History/components/insideHistorySubjects.vue'),
      },

      {
        path: "/historyDate/:id",
        name: "historyDate",
        component:  ()=> import('../components/History/components/historyDate.vue'),
      },


    
    
      {
        path: "/Students",
        name: "Students",
        component: Students,
      },
      {
        path: "/Grades",
        name: "Grades",
        component: Grades
      
      },
      {
        path: "/Subjects",
        name: "Subjects",
        component: Subjects,
      },
      {
        path: "/addTeachers",
        name: "addTeachers",
        component: addTeachers,
      },
    
      {
        path: "/addGrades",
        name: "addGrades",
        component: AddGrades,
      },
    
      {
        path: "/AddSubjects",
        name: "AddSubjects",
        component: AddSubjects,
      },
    
      {
        path: "/AddStudents",
        name: "AddStudents",
        component: AddStudents,
      },
    
      {
        path: "/AddParents",
        name: "AddParents",
        component: AddParents,
      },
    
      {
        path: "/ForSubjects/:id",
        name: "ForSubjects",
        component: ForSubjects,
    
      },
    
      {
        path: "/ForStudents/:id",
        name: "ForStudents",
        component: ForStudents,
      
      },
    
      {
        path: "/forParent/:id",
        name: "forParent",
        component: forParent,
    
      },
    
      {
        path: "/AddStudentForParent/:id",
        name: "AddStudentForParent",
        component: AddStudentForParent,
      },
      {
        path: "/SelectStudent/:id",
        name: "SelectStudent",
        component: SelectStudent,
     
      },
    ]
   
  },

  
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// router.beforeEach(async (to, from) => {
//   if (to.name !== "auth" && store.state.isAuthenticated == false) {
//     return { name: "auth" };
//   }
// });

export default router;
