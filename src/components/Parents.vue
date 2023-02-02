<template>
  <div>
    <navigation :parents="parents"></navigation>

<div v-show="show" >
  <div class="spinner spinner-border text-danger m-auto d-block mt-5">

</div>

</div>

    <div class="container">
      <div class="row">
        <label for="search">Search</label>
        <input type="text" class="form-control p-4 mt-3" id="search" placeholder="Search by name">
        <div class="col-4" v-for="info in infos" :key="info.id">
          <router-link
            :to="{ name: 'forParent', params: { id: info.id } }"
            class="btn btn shadow-3 w-100 text-white mt-5"
            style="background: #a5acb7"
            @click="addUserName(info.userName, info.id)"
            >{{ info.userName }}</router-link
          >
        </div>
      </div>
    </div>

    <router-link
      to="/AddParents"
      class="btn btn-success position-fixed"
      style="bottom: 20px; right: 20px; width: 200px"
      >Add parent <i class="fas fa-plus-circle"></i
    ></router-link>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from "vue";
import base from '../../src/reusables/getInfos'
import navigation from "../components/MiniComponents/Navigation.vue";
import { useStore } from "vuex";

let parents = ref("parents");
let show = ref(true)
let infos = reactive([])
let store = useStore()


onMounted(async() => {
  let request = await axios.get(`${base}Parents/getParents`, {
    headers:{
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  })

  console.log(request.data);
  if(request.data.length == 0){
    show.value = false
  }
  request.data.forEach((res)=>{
infos.push(res)
show.value = false
  })
})


let addUserName = (name,pid)=>{
store.state.userName = name
store.state.parentId = pid
}

</script>

<style lang="scss" scoped></style>
