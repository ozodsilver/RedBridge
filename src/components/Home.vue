<template>
  <div id="home" class="relative " > 
    <div class=" g-0 p-0 m-0 sticky top-0 z-[11111111] backdrop-blur-md backdrop-brightness-95" >
      <nav class="mx-auto mt-8   flex justify-between align-items-center h-[100px]     px-5" style="width: 100%">
<div class="flex items-center gap-16">
<div>

  <p class="text-teal-700">Pages / Teachers</p>
        <p class="font-extrabold">Teachers</p>
</div>

<router-link
      to="/addTeachers"
      class=" bg-gradient d-flex align-items-center gap-3 "
    style="bottom: 20px; right: 20px; width: 200px; "
      >
     <i class="fas fa-circle-plus fa-2x text-[#9492EE]"></i>
     Add Teachers
    </router-link>

    


</div>
     
  <div class="flex items-center">
    
    <div class="relative">
      <i class="fa fa-search text-gray-300 absolute right-4 top-3"></i>
      <input v-model="homeInput" placeholder="Search by username" class="rounded-lg  border bg-white w-[300px] p-2 transition-all  outline-none  focus:scale-105   "   />
    </div>


  </div>


    </nav>
    </div>
  

<div class="col-12 mb-6" >
  <div class="container px-5" >

 
      <div class="row">

        <div class="col-6" v-for="(teacher, index) in findInfo" :key="index" >
          <div v-if="!contentLoaded">
            <div
            class="card mt-4 border border-top-0 shadow-sm border-light"
            v-if="teachers.length >= 1"
          >
          <Skeleton width="100%" height="30px">
            <div class="card-header glass text-teal-700 ">
              About Teacher
            </div>
          </Skeleton>
            <div class="card-body">
              <Skeleton width="30%" height="30px">
              <h6 class="card-title text-muted">
                First name:
                <span class="fs-6 text-dark">{{ teacher.firstName }}</span>
              </h6>
              </Skeleton> 

              <Skeleton width="30%" height="30px" class="mt-2">
              <h6 class="card-title text-muted">
                Last name:<span class="fs-6 text-dark">{{ teacher.lastName }} </span>
              </h6>
              </Skeleton>
              <Skeleton width="30%" height="30px" class="mt-2">
              <h6 class="card-title text-muted">
                Father name:
                <span class="fs-6 text-dark">{{ teacher.fatherName }}</span>
              </h6>
              </Skeleton> 

              <Skeleton width="100%" height="30px" class="mt-2">
              <div class="d-flex align-items-center  gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/ajkxzzfb.json"
                  trigger="hover"
                  colors="primary:#495076,secondary:#495076"
                  style="width: 30px; height: 30px"
                >
                </lord-icon>
                Username:
               <span class="font-extrabold"> {{ teacher.userName }} </span>


            
              <i class="far fa-trash-can text-lg text-red-400 cursor-pointer absolute bottom-5 right-5"  @click="openModal(teacher.userName, index)"></i>
              </div>
              </Skeleton> 

            </div>
          </div>
          </div>
         
        </div>



        <div class="col-6" v-for="(teacher, index) in findInfo" :key="teacher.id" >
          <div v-if="contentLoaded">
            <div
            class="card mt-4 border border-top-0 shadow-sm border-light"
            v-if="teachers.length >= 1"
          >
      
            <div class="card-header glass text-teal-700 ">
              About Teacher
            </div>
   
            <div class="card-body">
            
              <h6 class="card-title text-muted">
                First name:
                <span class="fs-6 text-dark">{{ teacher.firstName }}</span>
              </h6>
          

             
              <h6 class="card-title text-muted">
                Last name:<span class="fs-6 text-dark">{{ teacher.lastName }} </span>
              </h6>
          
          
              <h6 class="card-title text-muted">
                Father name:
                <span class="fs-6 text-dark">{{ teacher.fatherName }}</span>
              </h6>
        

            
              <div class="d-flex align-items-center  gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/ajkxzzfb.json"
                  trigger="hover"
                  colors="primary:#495076,secondary:#495076"
                  style="width: 30px; height: 30px"
                >
                </lord-icon>
                Username:
               <span class="font-extrabold"> {{ teacher.userName }} </span>


            <div class="w-[40px] h-[40px] rounded cursor-pointer  flex items-center justify-center  bg-red-400 bg-gradient absolute bottom-5 right-5" @click="openModal(teacher.userName, index)">

              <i class="far fa-trash-can text-lg text-white cursor-pointer "  ></i>
            </div>
              </div>
       

            </div>
          </div>
          </div> 
      
        </div>




      </div>
    </div>
</div>






 

    <Dialog v-model:visible="visible" modal header="Caution" :style="{ width: '50vw' }">
    <p>
      do you really want to delete this teacher?

      
    </p>
<div class="flex items-center justify-end gap-3">

  

    <button class="w-[140px] h-[48px] rounded-full bg-red-400 text-white mt-8" @click="visible = false">
No
    </button>

    <button class="w-[140px] h-[48px] rounded-full bg-[#82D616] text-white mt-8" @click="deleteTeacher()">
Yes
    </button>

</div>

</Dialog>

  </div>

  <Toast></Toast>


</template>

<script>
import axios from "axios";
import Nav from "../components/MiniComponents/Navigation.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Skeleton from 'primevue/skeleton';

import { useToast } from 'primevue/usetoast';


import base from "../reusables/getInfos";
export default {
  components: {
    Nav,
    Dialog,
    Button,
    Toast,
    Skeleton
  },

  data() {
    return {};
  },

  setup() {
    let store = useStore();
    let users = ref("Teachers");
    let teachers = ref([]);
    let infos = ref([]);
    let homeInput = ref("");
const visible = ref(false)
    const contentLoaded = ref(false)

    const toast = useToast();

    const userName = ref()
    const index = ref()
    function openModal(username, idx){

visible.value =  true
userName.value = username
index.value = idx

}


    let deleteTeacher =  () => {

      teachers.value.splice(index.value, 1);

       axios.delete(`${base}Teachers?userName=${userName.value}`, {
        headers: {
          "Content-Type": "application/json-patch+json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(res =>{
      toast.add({ severity: 'success',  detail: userName.value +  ' has been deleted', life: 4000 });
      visible.value = false

   
      })
    };



    onMounted( () => {
axios.get(`${base}Teachers`).then(res =>{
  console.log(res.data.length !== 0);
  if(res.data.length){
   setTimeout(() => {
    contentLoaded.value = true
   }, 1000);
   


      res.data.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }

        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });


      res.data.forEach((el) => {
        teachers.value.push(el);
      });

    }else{
    contentLoaded.value = false
    }
})

  
      console.log(store.state);
    });



    let findInfo = computed(() => {
 
      return teachers.value.filter((list) => {
        return list.userName.toUpperCase().includes(homeInput.value.toUpperCase());
      });
    });

    return { users, deleteTeacher, teachers, store, findInfo, homeInput, contentLoaded,visible,openModal, };
  },
};
</script>

<style lang="scss">


.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}


::placeholder
{
font-size: 14px;
}
</style>
