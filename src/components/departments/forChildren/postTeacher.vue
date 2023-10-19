<template>
  <div class="px-5 relative " style="z-index: 11111111;">
    <button
            class="
               p-2 px-3 shadow
              d-flex
              align-items-center
              gap-3
              bg-gradient
              rounded-lg
              m-4
            "
            @click="backOneStep()"
          >
            <i class="fas fa-backspace text-lg text-slate-500"></i> back
          </button>
    <div class="container py-3 px-5 ">
    

      <h1 class="mt-6  text-2xl text-[#495076]">Add a teacher</h1>
      <form @submit.prevent="PostTeachers">
      <div class="row  mt-4">

  <div class="col-6">
          <input
          :autocomplete="off"
            type="text"
            class="form-control-lg border outline-none w-100 "
            placeholder="Firstname"
            v-model="firstName"
            required
   
          />
        </div>

        <div class="col-6">
          <input
          :autocomplete="off"
            type="text"
            class="form-control-lg border outline-none w-100"
            placeholder="Lastname"
            v-model="lastName"
            required
          />
        </div>

        <div class="col-6">
          <input
          autocomplete="off"
            type="text"
            class="form-control-lg border outline-none w-100 mt-4"
            placeholder="Fathername"
            v-model="fatherName"
            required
          />
        </div>

        <div class="col-6">
          <input
          autocomplete="off"
            type="text"
            class="form-control-lg border outline-none mt-4 w-100"
            placeholder="Username"
            v-model="userName"
            ref = 'user'
            required
          />
        </div>

        <div class="col-12">
          <input
          autocomplete="off"
            type="password"
            class="form-control-lg border outline-none mt-4 w-100"
            placeholder="password"
            v-model="password"
            required
          />
        </div>

        <div class="col-12 mt-6">
        
        <button
        type="submit"
          class="btn rounded-lg p-3 text-white bg-gradient w-25 float-end"
      
          ref="send"
        >
          Add teacher <i class="fas fa-plus"></i>
        </button>
      </div>

     
      </div>
    </form>
    </div>

    <Transition name="bounce">
      <div class="card w-50 m-auto bg-success p-3" v-if="show">
        <h3 class="text-center text-white">
          Teacher success added <i class="far fa-check-circle"></i>
        </h3>
      </div>
    </Transition>
  </div>


  <Toast></Toast>

  

</template>

<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

import base from "../../../reusables/getInfos";

let user = ref();
let show = ref(false);
let firstName = ref();
let lastName = ref();
let fatherName = ref();
let userName = ref();
let password = ref();
let send = ref();
let router = useRouter();
let backOneStep = () => {
  router.go(-1);
};

let PostTeachers = async () => {
  let response = await axios.post(
    `${base}Authentication/registrate`,
    {
      firstName: firstName.value,
      lastName: lastName.value,
      fatherName: fatherName.value,
      userName: userName.value,
      password: password.value,
    },
    {
      headers: {
        "Content-Type": "application/json-patch+json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );

  if (response.data) {

    firstName.value = "";
    lastName.value = "";
    fatherName.value = "";
    userName.value = "";
    password.value = "";

    toast.add({ severity: 'success', detail: 'Successfully added', life: 3000 });
  }

  console.log(response);
};
</script>

<style lang="scss" scoped>
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

.btn {
  transition: 0.1s;
  background: #6f7fdd;
}


</style>