<template>
  <div class="mt-4">
  
    <div class="flex justify-between px-4 items-end">
      <h1 class="text-2xl mt-4 ml-6 text-teal-700">Parents</h1>

      <router-link
      to="/addParents"
      class=" bg-gradient d-flex align-items-center "
    style="bottom: 20px; right: 20px; width: 200px; "
      >
     <i class="fas fa-circle-plus text-[35px] text-[#9492EE] relative z-[4444444]"></i>
     <div class="w-[180px]  h-[28px] bg-white rounded-lg text-[12px] flex items-center justify-center relative left-[-20px] top-[1px] ">
      Add Parents
     </div>
    </router-link>

    </div>

    <div v-show="show">
      <div class="spinner spinner-border text-danger m-auto d-block mt-5"></div>
    </div>

    <div class="row g-0">


<div class="col-12" v-show="!show">
  <div class="container px-5">
    <div class="flex justify-end items-end">
      <input
          type="text"
          class="form-control rounded-tr-none rounded-br-none p-2 w-[200px]  mt-5 border-0"
          id="search"
          data-key="search"
          placeholder="Search by name"
          v-model="input"
          @input="publishedBooksMessage"
        />
        <button class="p-[7px] px-3 bg-[#9492EE] rounded-tr rounded-br text-white">
          <i class="fas fa-magnifying-glass text-lg"></i>
        </button>
    </div>

      <div class="row">
   
        <div class="col-4 mt-3" v-for="(info,  index) in findInfo" :key="index">

          <n-result
    
    :title="info.userName"
    description="care for the child, care for the future."
    class="border rounded px-1"
  >

  <template #icon>
  
      <img src="@/assets/parents/pngwing.com.png" alt="" class="w-2/4 opacity-60">
    
  </template>
    <template #footer>
    <div class="items-center flex justify-center gap-2 mb-4 mt-3">
      <router-link
            :to="{ name: 'forParent', params: { id: info.id } }"
            class="btn bg-[#9492EE] shadow-3 w-75 hover:bg-[#9492EE]   text-white "
           
            data-mdb-ripple-color="secondary"
            @click="addUserName(info.userName, info.id)"
            >{{ info.userName }}</router-link

       
          >

          <button class="w-[40px] rounded h-[35px] bg-[#ff8d8d]" @click="openModal(info.id, index)">
<i class="fa fa-trash text-white"></i>
          </button>
    </div>
    </template>
  </n-result>


        
        </div>
      </div>
    </div>
</div>
    </div>

    

  
  </div>


  <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
            <p>
               Delete this parent
            </p>

            <div class="flex items-center justify-end gap-3 mt-6">
<button class="w-[140px] h-[40px] rounded-full bg-red-400 text-white" @click="visible = false">
No
</button>

<button class="w-[140px] h-[40px] rounded-full bg-teal-500 text-white" @click="deleteParent">
yes
</button>
            </div>
        </Dialog>

        <Toast>

        </Toast>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive, computed } from "vue";
import Dialog from 'primevue/dialog';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
import base from "../../src/reusables/getInfos";
import navigation from "../components/MiniComponents/Navigation.vue";
import { useStore } from "vuex";

let parents = ref("parents");
let show = ref(true);
let infos = reactive([]);
let store = useStore();
let input = ref("");
const visible = ref(false)

onMounted(async () => {
  let request = await axios.get(`${base}Parents/getParents`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  request.data.sort((a, b) => {
    if (a.userName < b.userName) {
      return -1;
    }

    if (a.userName > b.userName) {
      return 1;
    }
    return 0;
  });
  if (request.data.length == 0) {
    show.value = false;
  }

  request.data.forEach((res) => {
    infos.push(res);
    show.value = false;
  });
});

// setTimeout(() => {
//   function filteredList(){
//   return infos.filter((list)=>{
//     list.toLowerCase().includes(input.value.toLowerCase())
//   })
// }
// }, 1000);

let findInfo = computed(() => {
  return infos.filter((list) => {
    return list.userName.toUpperCase().includes(input.value.toUpperCase());
  });
});

let addUserName = (name, pid) => {
  store.state.userName = name;
  store.state.parentId = pid;
};

const parentId = ref(null);
const idx = ref(null)
const openModal = (id, index)=>{
  visible.value = true
  parentId.value = id
  idx.value = index

}


const deleteParent = (id)=>{

  axios.delete(`${base}Parents?id=${parentId.value}`).then(res =>{
    console.log(res);
    if(res.status == 200){
      infos.splice(idx.value,1)
      visible.value = false
      toast.add({ severity: 'success', summary: 'deleted', detail: res.statusText, life: 3000 });
    }
  })
  
}
</script>

<style lang="scss" scoped>
a {
  text-transform: capitalize !important;
  transition: 0.4s;

}
</style>
