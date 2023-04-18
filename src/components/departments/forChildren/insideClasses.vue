<template>
  <div class="container-fluid">
    <button class="btn btn-success rounded-pill w-25" @click="this.$router.go(-1)">
      <i class="far fa-circle-left"></i> back
    </button>
    <!-- {{ this.$route.params }} -->

    <div class="row">
   <div class="col-3 border" >
   <div class="row">
   <div class="col-12" v-for = 'student in students' :key="student.id">
   
   <h4 class="border">{{ student.firstName }}</h4>
   </div>
   </div>
   </div>


   <div class="col-9">
   <div class="row">
   <div class="col" v-for = 'subject in subjects' :key="subject.id">
   <p class="border"> {{ subject.name }}</p>
   </div>
   </div>

   <div class="row">
   <div class="col">
   {{  scores[0]}}
   </div>
   </div>
   </div>

 
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
let students = ref([]);
let subjects = ref([]);
let scores = ref([])
const route = useRoute();

onMounted(() => {
  axios
    .get(`${import.meta.env.VITE_BASE_URL}Admin/Journal/ClassInfo?id=${route.params.id}`)
    .then((el) => {
        console.log(el);
      el.data.students.forEach((res) => {
        students.value.push(res);
      });
    });


    axios
    .get(`${import.meta.env.VITE_BASE_URL}Admin/Journal/ClassInfo?id=${route.params.id}`)
    .then((el) => {
        console.log(el);
      el.data.subjects.forEach((res) => {
        subjects.value.push(res);
      });
    });


    axios
    .get(`${import.meta.env.VITE_BASE_URL}Admin/Journal/GetScore?studentId=da131882-f419-438b-921b-e1047853beb1&subjectId=a2dcc54e-033a-41ff-8aa7-c9d41295310a&start=2023-04-16T08%3A49%3A32.184345Z&end=2023-05-16T08%3A49%3A32.184345Z`)
    .then((el) => {
        console.log(el);
      el.data.charts.forEach((res) => {
        scores.value.push(res);
      });
    });


});
</script>

<style lang="scss" scoped></style>
