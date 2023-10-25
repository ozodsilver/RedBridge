<template>
    <div class="w-full h-screen pt-2 flex items-center justify-center overflow-auto">

<div class="w-[80%]  h-full border flex flex-col-reverse overflow-auto gap-2 flex-start"  ref="listEl">
 

    <div class=" h-[400px] border flex items-end justify-center rounded-xl gap-1 " v-for="(user, index) in userList" :key="index">
   <!-- teacher avatar -->
   <div class="w-[50px] h-[50px]">
<img src="@/assets/teachers/avatar.png" alt="" class="w-full ">
</div>

<!-- main container -->
<div class="w-[400px] h-[400px] relative bg-slate-200">
<div class="card-header flex items-center w-full h-[50px] border-b">
<h1 class="text-lg pl-3">Teacher {{user}}</h1>
</div>

<div class="flex items-center  w-full justify-between">

    <div class="w-[100px] h-[50px] border flex items-center justify-center">
        class
    </div>
    <div class="w-[100px] h-[50px] border flex items-center justify-center">
        Journal
    </div>
    <div class="w-[100px] h-[50px] border flex items-center justify-center">
        Grade
    </div>

</div>

<div class="w-[80%]  mx-auto mt-4 ">
<span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas fugiat deleniti rem impedit, quia esse est? Explicabo non eos ratione! Ullam dignissimos mollitia numquam facere tenetur. Cumque sed voluptatem in.</span>

</div>

<div class="flex justify-end px-3 absolute right-4 bottom-5">
    <span class="text-slate-400">12:30</span>
</div>


</div>


    </div>

</div>

    </div>
</template>

<script setup>

import base from '../../reusables/getInfos';
import axios from 'axios';
import {ref, onMounted} from 'vue';
import { useInfiniteScroll } from '@vueuse/core'

const infos = ref([])
const listEl = ref(null)

const pageCount = ref(0)

// onMounted(()=>{

//     axios.get(`${base}Admin/Complaint?page=${pageCount.value}`, 
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//     }).then(res =>{
//     console.log(res)
//     infos.value = res.data.smSes
//     })

// })



const getUsers = async (skip)=>{
const users =  await axios.get(`${base}Admin/Complaint?page=${skip}`, {
    
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
});

return users.data.smSes
}

const userList = ref(await getUsers(0))

const getUsersOnScroll = async ()=>{
const newUsers = await getUsers(( Math.ceil(userList.value.length/20 - 1)))

userList.value.push(...newUsers)

}

useInfiniteScroll(listEl, async ()=> {  await getUsersOnScroll()}, {distance:10})

</script>

<style lang="scss" scoped>

</style>