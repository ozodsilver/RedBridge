<template>
  <div>
    <nav class="m-auto glass  align-items-center py-2  px-5" style="width: 100%;  justify-content: space-between; display: flex;">
      <div class="flex items-center shadow relative top-4">
       
        <span class="p-input-icon-left absolute ">
   
    <input v-model="homeInput" placeholder="Search by username" class="rounded w-[250px] p-2 transition-all shadow outline-none  focus:scale-105  "   />
</span>
      </div>
 <p class="lead text-dark p-2 text-[12px] badge bg-white  ">Teachers</p>
         <!-- <p class="lead  p-2 badge m-0"> {{ props.name }} {{ $route.name == 'classes' ? 'Student performance': ''}}</p> -->
    </nav>
  

    <h1 class="text-center mt-5" v-if="empty">The Grades section is empty</h1>
    <div 
        class="text-center d-flex justify-content-center align-items-center"
        style="height: 100vh" 
        v-if="loade"
      >
        <div class="spinner-border text-info" role="status"></div>
      </div>

     


    <div class="container" v-else-if="!loade">
     
      <div class="row">
        <div class="col-6" v-for="(info, index) in infos" :key="info.id">
          <div class="card mt-5 shadow-lg ">
            <div class="card-header glass ">
              <span class="badge bg-white text-dark fs-6 shadow">Class</span> &nbsp;
              <span class="fs-6 text-white"> {{ info.name }}  </span>
            </div>
            <div class="card-body py-5">
              <div class="d-flex align-items-center gap-1 w-100">
               <div class="w-100 d-flex gap-1">
                <router-link
                  :to="{ name: 'ForSubjects', params: { id: info.id } }"
                  class="btn w-50 btn-outline-secondary"
                  >Subjects</router-link
                >


                <router-link
                  :to="{ name: 'ForStudents', params: { id: info.id } }"
                  class="btn w-50 btn-outline-secondary"
                  >Students</router-link
                >
               </div>
                <btn
                  
                  class="
                    btn btn-danger
                    d-flex
                    bg-gradient
                    justify-content-center
                    align-items-center
                  "
                  @click="deleteGrades(info.id, index)"
                  style="width: 50px; height: 35px"
                  ><i class="far fa-trash-alt"></i
                ></btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-link
      to="/addGrades"
      class="btn glass  text-white position-fixed"
      style="bottom: 20px; right: 20px; width: 200px; border-top: 2px dotted #DE576E;  border-left: 2px dotted #DE576E; border-right: 2px dotted #DE576E;"
      >Add Grades <i class="fas fa-plus-circle text-white text-[25px] absolute top-[5px] transition-all right-6 "></i
    ></router-link>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Nav from "../MiniComponents/Navigation.vue";
import base from '../../reusables/getInfos'


let loade = ref(true);
let empty = ref(false)
let grades = ref("Grades");
let infos = ref([]);

onMounted(async () => {
  await axios
    .get(
      `${base}Grades`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
    .then((res) => {
      console.log(res);

res.data.sort((a,b)=>{
    if(a.name < b.name){
return -1
    }

    if(a.name > b.name){
      return 1
    }
    return 0
  })

      res.data.forEach((el) => {
        infos.value.push(el);
        loade.value = false;
      });
    });

   if(infos.value.length == 0){
    loade.value = false
    empty.value = true
   }
});

let deleteGrades = (id, index)=>{
  axios.delete(`${base}Grades?id=${id}`, 
  {
    headers:{
      'Content-type':'application.json',
      Authorization:`Bearer ${localStorage.getItem('jwt')}`
    }
  })

  infos.value.splice(index,1)

}
</script>

<style lang="scss" scoped>
</style>