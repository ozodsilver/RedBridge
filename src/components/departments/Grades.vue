<template>
  <div>
    <div class=" g-0 p-0 m-0 sticky top-0 z-[11111111111] backdrop-blur-md" >
      <nav class="mx-auto mt-8 sticky top-0  flex justify-between align-items-center h-[100px]     px-5" style="width: 100%; z-index: 111111111111;">
<div class="flex gap-16 items-center">
 <div>
  <p class="text-teal-700">Pages / Grades</p>
        <p class="font-extrabold">Grades</p>
 </div>

 <router-link
      to="/addGrades"
      class=" bg-gradient d-flex align-items-center "
    style="bottom: 20px; right: 20px; width: 200px; "
      >
     <i class="fas fa-circle-plus text-[35px] text-[#9492EE] relative z-[4444444]"></i>
     <div class="w-[180px] hover:bg-[#9492EE] h-[28px] bg-white rounded-lg text-[12px] flex items-center justify-center relative left-[-20px] top-[1px] ">
      Add Grades
     </div>
    </router-link>

</div>
     
  <div class="flex items-center">
    
    <div class="relative">
      <i class="fa fa-search text-gray-300 absolute right-4 top-3"></i>
      <input v-model="homeInput" placeholder="Search by Gradename" class="rounded-lg  border bg-white w-[300px] p-2 transition-all  outline-none  focus:scale-105   "   />
    </div>


  </div>


    </nav>
    </div>
  

    <h1 class="text-center mt-5" v-if="empty">The Grades section is empty</h1>
    <div 
        class="text-center d-flex justify-content-center align-items-center"
        style="height: 100vh" 
        v-if="loade"
      >
        <div class="spinner-border text-info" role="status"></div>
      </div>


    <div class="container px-5 mb-2" v-else-if="!loade">
     
      <div class="row">
        <div class="col-6" v-for="(info, index) in findInfo" :key="info.id">
          <div class="card mt-5 shadow-lg ">
            <div class="card-header glass text-teal-700  ">
              <span class="badge  text-teal-700  fs-6 font-extrabold ">Class</span> &nbsp;
              <span class="fs-6 font-extralight"> {{ info.name }}  </span>
            </div>
            <div class="card-body py-5">
              <div class="d-flex align-items-center gap-1 w-100">
               <div class="w-100 d-flex gap-1">
                <router-link
                  :to="{ name: 'ForSubjects', params: { id: info.id } }"
                  class="btn w-50 flex items-center justify-center btn-outline-secondary hover:bg-[#9492EE] transition-all hover:text-white hover:scale-105"
                  >Subjects</router-link
                >


                <router-link
                  :to="{ name: 'ForStudents', params: { id: info.id } }"
                  class="btn w-50 flex items-center justify-center h-[40px] btn-outline-secondary hover:bg-[#9492EE] transition-all hover:text-white hover:scale-105"
                  >Students</router-link
                >
               </div>
                <btn
                  
                  class="
                    btn bg-red-400 text-white hover:bg-red-500 text-base
                    d-flex
                    bg-gradient
                    justify-content-center
                    align-items-center
                  "
                  @click="openModal(info.id, index)"
                  style="width: 40px; height: 40px"
                  ><i class="far fa-trash-alt"></i
                ></btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
  <Dialog v-model:visible="visible" modal header="Attention" :style="{ width: '50vw' }">
    <p>
      this class will be destroyed
    </p>

    <div class="flex items-center justify-end gap-3">

  

<button class="w-[140px] h-[48px] rounded-full bg-red-400 text-white mt-8" @click="visible = false">
No
</button>

<button class="w-[140px] h-[48px] rounded-full bg-[#82D616] text-white mt-8" @click="deleteGrades">
Yes
</button>

</div>
</Dialog>

<Toast>
  
</Toast>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
import Nav from "../MiniComponents/Navigation.vue";
import base from '../../reusables/getInfos'


let loade = ref(true);
let empty = ref(false)
let grades = ref("Grades");
let infos = ref([]);
const homeInput = ref('')
const visible = ref(false)

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

const gradeId = ref(null)
const idx = ref(null)
const openModal = (id, index)=>{
  visible.value = true
  gradeId.value = id
  idx.value = index
}

let deleteGrades = ()=>{
  axios.delete(`${base}Grades?id=${gradeId.value}`, 
  {
    headers:{
      'Content-type':'application.json',
      Authorization:`Bearer ${localStorage.getItem('jwt')}`
    }
  }).then(res =>{
if(res.status == 200){
  toast.add({ severity: 'success', summary: 'Success', detail: res.statusText, life: 3000 });
  infos.value.splice(idx.value,1)
  visible.value = false
}

  })



}


let findInfo = computed(() => {
      
      return infos.value.filter((list) => {
        return list.name.toUpperCase().includes(homeInput.value.toUpperCase());
      });
    });

</script>

<style lang="scss" scoped>
</style>