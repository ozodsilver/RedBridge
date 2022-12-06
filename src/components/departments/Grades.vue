<template>
  <div>
    <Nav :grades="grades"></Nav>

    <h1 class="text-center mt-5" v-if="empty">The Grades section is empty</h1>
    <div 
        class="text-center d-flex justify-content-center align-items-center"
        style="height: 100vh" 
        v-if="loade"
      >
        <div class="spinner-border text-info" role="status"></div>
      </div>

     


    <div class="container" v-else-if="!loade">
     

      <h3 class="m-0 pt-5 text-secondary" v-if="!empty">Classes</h3>
      <div class="row">
        <div class="col-6" v-for="(info, index) in infos" :key="info.id">
          <div class="card mt-5 shadow-lg ">
            <div class="card-header bg-secondary bg-gradient">
              <span class="badge bg-secondary fs-6 shadow">Class</span> &nbsp;
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
      class="btn btn-success position-fixed"
      style="bottom: 20px; right: 20px; width: 200px; "
      >Add Grades <i class="fas fa-plus-circle"></i
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