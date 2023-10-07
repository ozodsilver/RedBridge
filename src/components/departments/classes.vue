<template>
  <div>
    <nav class="m-auto glass  align-items-center py-2  px-5" style="width: 100%;  justify-content: space-between; display: flex;">
      <div class="flex items-center shadow relative top-4">
       
        <span class="p-input-icon-left absolute ">
 
    <input v-model="homeInput" placeholder="Search by name" class="rounded w-[250px] p-2 transition-all shadow outline-none  focus:scale-105  "   />
</span>
      </div>
         <p class="lead  p-2 badge m-0 badge bg-white text-dark"> {{ props.name }} {{ $route.name == 'classes' ? 'Student performance': ''}}</p>
    </nav>
  
    <div class="container">
      <div class="row mt-8">
        <div class="col-4" v-for="info in findInfo" :key="info.id">
          <routerLink
            :to="{ name: 'insideClasses', params: { id: info.id } }"
            class="btn bg-white capitalize text-start text-base w-3/4 py-4  transition-all hover:scale-110 mt-4 rounded text-dark shadow"
           style="border-top: 10px solid #6B7290; border-left: 1px dashed #6B7290; border-right: 1px dashed #6B7290; border-bottom: 1px dashed #6B7290;"
            >Class : <span class="badge bg-[#495074] text-white">{{ info.name }}</span></routerLink
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
import InputText from 'primevue/inputtext';
import axios from "axios";
import { ref, reactive, onMounted, computed } from "vue";
import base from "../../reusables/getInfos.js";
import { useRouter, useRoute } from "vue-router";


const props = defineProps(
  {
    name:String
  }
)


let route = useRoute();
let infos = ref([]);
const homeInput = ref('')
const loading = ref(true)

onMounted(async () => {
  let result = await axios.get(`${base}Admin/Journal/Classes`);
  console.log(result.data);
  infos.value.push(...result.data);
  loading.value = false

});

let findInfo = computed(() => {

return infos.value.filter((list) => {
  return list.name.toUpperCase().includes(homeInput.value.toUpperCase());
});
});

</script>

<style lang="scss" scoped>

button {
  background: #a5acb7 !important;
}

::placeholder
{
font-size: 14px;
}

</style>
