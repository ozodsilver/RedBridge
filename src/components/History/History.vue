<template>
  <div>


    <h1 class="text-center mt-5" v-if="empty">The Grades section is empty</h1>
    <div class="text-center d-flex justify-content-center align-items-center" style="height: 100vh" v-if="loade">
      <div class="spinner-border text-info" role="status"></div>
    </div>




    <div class="container px-5" v-else-if="!loade">


      <h3 class="m-0 pt-5 text-secondary text-2xl" v-if="!empty">Classes</h3>
      <div class="row">
        <div class="col-4" v-for="(info, index) in infos" :key="info.id">
          <router-link :to="{ name: 'insideHistory', params: { id: info.id } }" class="card mt-5 shadow-lg ">
            <div class="card-header bg-secondary bg-gradient">
              <span class="badge bg-secondary fs-6 shadow">Class</span> &nbsp;
              <span class="fs-6 text-white"> {{ info.name }} </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>


  </div>
</template>
  
<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";




let loade = ref(true);
let empty = ref(false)
let grades = ref("Grades");
let infos = ref([]);

onMounted(async () => {
  let response = await axios
    .get(
      `${base}Grades`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
   

    response.data.forEach((el) => {
        infos.value.push(el);
        loade.value = false;
      });



  if (infos.value.length == 0) {
    loade.value = false
    empty.value = true
  }
});


</script>
  
<style lang="scss" scoped></style>