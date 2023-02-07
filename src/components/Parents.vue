<template>
  <div>
    <navigation :parents="parents"></navigation>

<div v-show="show" >
  <div class="spinner spinner-border text-danger m-auto d-block mt-5">

</div>

</div>

    <div class="container">
      <div class="row">
      
        <input type="text" class="form-control p-4 mt-5 border-0" id="search" placeholder="Search by name" v-model="input" @input="publishedBooksMessage">
        <div class="col-4" v-for="info in findInfo" :key="info.id">

         
          <router-link
            :to="{ name: 'forParent', params: { id: info.id } }"
            class="btn btn shadow-3 w-100 text-white mt-5"
            style="background: #a5acb7"
            data-mdb-ripple-color="secondary"
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
import { ref, onMounted, reactive, computed } from "vue";
import base from '../../src/reusables/getInfos'
import navigation from "../components/MiniComponents/Navigation.vue";
import { useStore } from "vuex";

let parents = ref("parents");
let show = ref(true)
let infos = reactive([])
let store = useStore()
let input = ref('')


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


// setTimeout(() => {
//   function filteredList(){
//   return infos.filter((list)=>{
//     list.toLowerCase().includes(input.value.toLowerCase())
//   })
// }
// }, 1000);

let findInfo = computed(()=>{

  return infos.filter((list)=>{
    return list.userName.toUpperCase().includes(input.value.toUpperCase())
  })


})


let addUserName = (name,pid)=>{
store.state.userName = name
store.state.parentId = pid
}

</script>


<style lang="scss" scoped></style>
