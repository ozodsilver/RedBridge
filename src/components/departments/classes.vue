<template>
  <div>
    <nav class="m-auto   align-items-center shadow p-2 px-5" style="width: 100%;  justify-content: space-between; display: flex;">
      <input type="text" class="bg-white shadow  form-control border-0 outline-none p-3 w-50 m-0 " placeholder="search by class name">
         <p class="lead mt-2 p-2 badge bg-secondary"> {{ props.name }} {{ $route.name == 'classes' ? 'Student performance': ''}}</p>
    </nav>
  
    <div class="container">
      <div class="row mt-4">
        <div class="col-3" v-for="info in infos" :key="info.id">
          <routerLink
            :to="{ name: 'insideClasses', params: { id: info.id } }"
            class="btn  mt-4 rounded text-white shadow"
            style="background-color:#9EA3AE ;"
            >{{ info.name }}</routerLink
          >
        </div>
      </div>
    </div>
<div style="position: absolute; left: 50%; top:50%; transform: translate(-50%,-50%);" v-if="loading">
  <span class="spinner spinner-border" ></span>
</div>
   

  </div>
</template>

<script setup>

import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import base from "../../reusables/getInfos.js";
import { useRouter, useRoute } from "vue-router";


const props = defineProps(
  {
    name:String
  }
)


let route = useRoute();
let infos = reactive([]);
const loading = ref(true)

onMounted(async () => {
  let result = await axios.get(`${base}Admin/Journal/Classes`);
  console.log(result.data);
  infos.push(...result.data);
  loading.value = false
});
</script>

<style lang="scss" scoped>

button {
  background: #a5acb7 !important;
}
</style>
