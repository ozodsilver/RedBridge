<template>
  <div>
    <div class="container px-5">
      <h2 class="my-5 text-2xl">Grades</h2>
      <div class="row mt-5">
        <div class="col-4 mt-3" v-for="student in Students" :key="student.id">
          <div class="card">
            <div class="card-header text-lg uppercase">grade name: <span class="badge bg-success float-end">{{ student.name }}</span></div>
            <div class="card-body">
             
            <router-link :to="{name:'SelectStudent', params:{id:student.id}}"  @click="GradeId(student.id)">students belonging to this class</router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center" v-if="loade">
        <div class=" spinner-border text-dark absolute top-[50%]">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import base from "../../../reusables/getInfos.js";
import {useStore} from 'vuex'
let Students = reactive([]);
let store = useStore()
let loade = ref(true)



onMounted(() => {
  axios
    .get(`${base}Grades`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    .then((el) => {
      console.log(el);
      el.data.forEach((res) => {
        Students.push(res);
        loade.value = false
      });
    });
});


let GradeId = (gradeId)=>{
store.state.gradeId = gradeId
}
</script>

<style lang="scss" scoped></style>
