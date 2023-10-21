<template>
  <div>
    <nav class="mx-auto mt-8   flex justify-between align-items-center h-[100px]     px-5" style="width: 100%">
<div>
  <p class="text-teal-700">Pages / Teachers</p>
        <p- class="font-extrabold">Teachers</p->

</div>
     
  <div class="flex items-center">
    
    <div class="relative">
      <i class="fa fa-search text-gray-300 absolute right-4 top-3"></i>
      <input v-model="homeInput" placeholder="Search by Grade name" class="rounded-lg  border bg-white w-[300px] p-2 transition-all  outline-none  focus:scale-105   "   />
    </div>


  </div>


    </nav>
  
    <div class="container px-5 pb-4">
      <div class="row mt-8">
        <div class="col-4  bg-transparent" v-for="info in findInfo" :key="info.id">
          
          <routerLink
            :to="{ name: 'insideClasses', params: { id: info.id } }"
            class="btn  relative bg-white capitalize bg-transparent text-start text-base  w-3/4 pt-16 pb-4  transition-all hover:scale-110 mt-4 rounded text-dark shadow"
        
            >
            <div class="primary_gradient h-8 w-full  absolute left-0 top-0"     style="border-top-right-radius: 8px; border-top-left-radius: 8px;">

</div>
            Class : <span class="badge bg-[#9492EE] text-white">{{ info.name }}</span></routerLink
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


.primary_gradient{
  background: rgb(148,146,238);
background: linear-gradient(160deg, rgba(148,146,238,0.1) 0%, rgba(101,100,125,0.1225105042016807) 94%);
}

</style>
