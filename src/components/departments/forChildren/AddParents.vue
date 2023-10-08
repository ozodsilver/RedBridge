<template>
  <div>
    <div class="container px-5">
      <div class="row">
        <h1 class="text-secondary mt-5 text-2xl my-2">Add Parents</h1>

        <form @submit.prevent="createUser">
          <div class="row">
            <div class="col-6">
          <input
            type="text"
            class="form-control p-1"
            placeholder="username"
            v-model="userName"
            required
          />
        </div>

        <div class="col-6">
          <input
            type="password"
            class="form-control p-1"
            placeholder="password"
            v-model="password"
            required
          />
        </div>
          </div>
 


        <div class="d-flex justify-content-between mt-6 ">
      <button  class="btn btn-dark  m-0" @click="backOne">back <i class="fa fa-angle-left"></i> </button>
       <button type="submit" class="btn bg-slate-400 hover:bg-slate-600 glass  text-white m-0  float-end" @click="createUser">
        Create parent <i class="fa fa-add"></i>
      </button>
     </div> 

        </form>
  
      </div>
     
    </div>

    <Toast/>

<div style="position:absolute; top:40%; left:40%" v-show="loade">
  <i class="fas fa-check-double fa-3x text-success d-block m-auto text-center " ></i>
  <h2 class="text-success">Parent success added</h2>
</div>

  </div>

 
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import base from "../../../reusables/getInfos.js";
import {useRouter} from 'vue-router'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();


let userName = ref();
let password = ref();
let loade = ref(false)
let router = useRouter()

let createUser = () => {
  axios
    .post(
      `${base}Parents/addParent?userName=${userName.value}&password=${password.value}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
    .then((el) => {
      toast.add({   detail: 'Parent successfully added', life: 30000 });

     userName.value = ''
     password.value = ''

   
    })
    .catch((err) => {
      console.log(err);
    });
};

let backOne = ()=>{
  router.go(-1)
}
</script>

<style lang="scss" scoped></style>
