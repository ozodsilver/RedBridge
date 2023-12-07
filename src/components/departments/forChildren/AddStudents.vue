<template>
    <transition name="fade">
      <div>
        <div class="container px-5">
          <h1 class="mt-5 text-2xl">Add Students</h1>
          <div class="row mt-6">
            <div class="col-12">
          <form @submit.prevent="PostStudent">

            <input
                type="text"
                class="form-control-lg w-100 outline-none"
                placeholder="First Name"
                v-model="firstName"
                required
              />

              <input
                type="text"
                class="form-control-lg w-100 mt-4 outline-none"
                placeholder="last Name"
                v-model="lastName"
                required
              />

            <input
                type="text"
                class="form-control-lg w-100 mt-4 outline-none"
                placeholder="father Name"
                v-model="fatherName"
                
              />


              <div class="col-12 mt-4">
          
             
            </div>

              <button
                class="btn bg-[#9492EE] text-white mt-4 hover:bg-[#9492EE] w-25 float-end"
              
              >
                Add Student <i class="fas fa-plus"></i>
              </button>

          </form>
            </div>
  
  
         
          </div>
        </div>
      </div>
    </transition>
  
    <div
      class="
        badge
        bg-success
        d-flex
        gap-3
        justify-content-center
        align-items-center
        m-auto
        p-4
      "
      v-if="loader"
    >
      <h2>Subjects Success addedd</h2>
      <i class="fas fa-check-double"></i>
    </div>

    <Toast>

    </Toast>
  </template>
        
        <script setup>
  import axios from "axios";
  import { ref, onMounted, } from "vue";
  import { useRouter } from "vue-router";
  
import Toast from 'primevue/toast';

import { useToast } from 'primevue/usetoast';

const toast = useToast();


  import {useStore} from 'vuex'
 import base from '../../../reusables/getInfos'
  let students = ref([]);

  let firstName = ref('')
  let lastName = ref('')
  let fatherName = ref('')
 
  let router = useRouter();
  let isActive = ref(true);
  let loader = ref(false);
  let store = useStore()
  
  
  onMounted(async () => {
    let subject = await axios.get(`${base}Subjects/${store.state.id}`, 
   {
    headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${localStorage.getItem('jwt')}`
      }
   }
    );
    // subject.data.forEach((el) => {
    //   subjects.value.push(el);
    // });
  

  
    console.log(store.state.id);
  
  });
  
  let PostStudent = async () => {
    let response = await axios.post(
      `${base}Students`,
      {
        firstName: firstName.value,
        lastName:lastName.value,
        fatherName:fatherName.value,
        grade:store.state.id
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
  
    firstName.value = "";
    lastName.value = ''
    fatherName.value = ''
  
    if (response.status == 200) {
      toast.add({ severity: 'success', detail: response.statusText, life: 3000 });
    }else{
      toast.add({ severity: 'error', summary: 'Error', detail: response.statusText, life: 3000 });

    }
  
    console.log(response);
  };
  
  let back = () => {
    router.go(-1);
  };
  </script>
        
        <style lang="scss" scoped>
  .active {
    background: rgb(112, 176, 255);
  }
  
  ::-webkit-scrollbar {
    display: none;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>