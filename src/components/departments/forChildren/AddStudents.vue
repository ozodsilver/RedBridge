<template>
    <transition name="fade">
      <div>
        <div class="container py-5">
          <h1 class="mt-5">Add Students</h1>
          <div class="row">
            <div class="col-12">
              <input
                type="text"
                class="form-control-lg w-100"
                placeholder="First Name"
                v-model="firstName"
              />

              <input
                type="text"
                class="form-control-lg w-100"
                placeholder="last Name"
                v-model="lastName"
              />


              <input
                type="text"
                class="form-control-lg w-100"
                placeholder="father Name"
                v-model="fatherName"
              />
            </div>
  
  
            <div class="col-12">
              <button
                class="
                  btn btn-dark
                  d-flex
                  align-items-center
                  gap-3
                  bg-gradient
                  w-25
                  float-start
                "
                @click="back"
              >
                <i class="fas fa-backspace fa-2x"></i> back
              </button>
              <button
                class="btn btn-success bg-gradient w-25 float-end"
                @click="PostStudent"
              >
                Add Student <i class="fas fa-plus"></i>
              </button>
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
        w-50
        p-4
      "
      v-if="loader"
    >
      <h2>Subjects Success addedd</h2>
      <i class="fas fa-check-double"></i>
    </div>
  </template>
        
        <script setup>
  import axios from "axios";
  import { ref, onMounted, } from "vue";
  import { useRouter } from "vue-router";
  import {useStore} from 'vuex'
 
  let students = ref([]);

  let firstName = ref('')
  let lastName = ref('')
  let fatherName = ref('')
 
  let router = useRouter();
  let isActive = ref(true);
  let loader = ref(false);
  let store = useStore()
  
  
  onMounted(async () => {
    let subject = await axios.get(`https://redbridge-school.herokuapp.com/api/Subjects/${store.state.id}`, 
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
      `https://redbridge-school.herokuapp.com/api/Students`,
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
      setTimeout(() => {
        loader.value = true;
      }, 10);
  
      setTimeout(() => {
        loader.value = false;
      }, 2000);
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