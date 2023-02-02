<template>
  <div>
    <div class="container">
      <div class="row">
        <h1 class="text-secondary mt-5">Add Parents</h1>
        <div class="col-6">
          <input
            type="text"
            class="form-control p-3"
            placeholder="username"
            v-model="userName"
          />
        </div>

        <div class="col-6">
          <input
            type="password"
            class="form-control p-3"
            placeholder="password"
            v-model="password"
          />
        </div>
      </div>
     <div class="d-flex justify-content-between ">
      <button class="btn btn-dark w-25 m-0" @click="backOne">back <i class="fa fa-angle-left"></i> </button>
       <button class="btn btn-success bg-gradient m-0 w-25 float-end" @click="createUser">
        Create <i class="fa fa-add"></i>
      </button>
     </div>
    </div>

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
      console.log(el);
     setTimeout(() => {
       
        loade.value = true
      
     }, 10);

     setTimeout(() => {
      loade.value = false
     }, 2000);
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
