<template>
  <div>
    <nav class="m-auto glass  align-items-center   px-5" style="width: 100%;  justify-content: space-between; display: flex;">
      <div class="flex items-center shadow relative top-4">
        <i class="fa fa-search text-slate-400 absolute top-3 left-2 z-20"></i>
        <input type="text" class="shadow  form-control position-relative border-0 outline-none p-[20px] ps-5   m-0 " placeholder="search by class name" >
      </div>
         <p class="lead mt-2 p-2 badge "> {{ props.name }} {{ $route.name == 'classes' ? 'Student performance': ''}}</p>
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

.glass{
        backdrop-filter: blur(19px) saturate(180%);
    -webkit-backdrop-filter: blur(19px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.36);
   

    }
</style>
