<template>
    <div class="w-full pb-3 h-screen pt-2 flex items-center justify-center overflow-auto">

<div class="w-[80%]  h-full  flex flex-col overflow-auto gap-2  flex-start"  ref="listEl">
 

    <div class=" py-4  relative  flex items-end justify-center rounded-xl gap-1 " v-for="(user, index) in userList" :key="index" >
   <!-- teacher avatar -->
   <div>
<img :src='`https://rb.algorithmic.uz/api/Files/${user.teacherImageId}`' alt="" class="w-full w-[80px] h-[80px]  rounded-full p-2 bg-purple-50 border ">
</div>
<!-- {{ user }} -->
<!-- main container -->
<div class="w-[600px] h-[500px] relative bg-  shadow-sm rounded-xl p-4 ">
<div class="card-header flex items-center w-full h-[50px] border-b">
<h1 class="text-lg pl-3">Teacher <span class="p-1 px-3 bg-purple-500 text-white text-base rounded bg-gradient-to-t">{{user.teacherFirstName}}</span></h1>
</div>

<div class="flex items-center mt-4  w-full justify-around text-sm ">

    <div class=" h-[50px] text-black font-semibold   rounded-lg flex text-xs text-dark items-center justify-center ">
       <span class="block"> student  : &nbsp; </span> <span class="bg-purple-500 p-1 text-white rounded">{{ user.studentFirstName }} </span>
    </div>
    <div class=" h-[50px]  flex rounded-lg  text-dark items-center justify-center">
        <span class="block text-xs font-semibold"> grade : &nbsp; </span> <span class="bg-purple-500 p-1 text-xs text-white rounded">{{ user.grade }} </span>  
    </div>
    <div class="w-[100px] h-[50px]  flex rounded-lg  text-dark items-center justify-center">
        <span class="block text-xs font-semibold"> subject : &nbsp; </span> <span class="bg-purple-500 p-1 text-xs text-white rounded">{{ user.subject }} </span>    
    </div>

</div>

<img src="@/assets/teachers/sms.png" alt="" class="w-[40px] absolute right-10 rotate-[20deg]">

<div class="w-[80%] max-h-[200px] overflow-auto mx-auto mt-4 path bg-green-500 bg-gradient text-white   p-4 ">
    
<span>{{ user.message }}</span>
</div>


<div class="flex justify-end px-3 absolute right-4 bottom-5">
    <span class="text-slate-400">{{ new Date(user.date).toLocaleDateString() }} &nbsp;  |  &nbsp;  <span class="far fa-clock text-purple-700"> </span>      {{ new Date(user.date).toLocaleTimeString() }}</span>
</div>

<img src="@/assets/teachers/smss.png" alt="" class="w-[100px] absolute bottom-[-50px] left-3">
</div>

    </div>

</div>

    </div>
</template>

<script setup>

import base from '../../reusables/getInfos';
import axios from 'axios';
import {ref, onMounted, watchEffect} from 'vue';
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

const bool = ref(true)


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
    console.log("infinity scorll begin");
if(!bool.value) return;
const newUsers = await getUsers(( Math.round(userList.value.length / 20 )))

userList.value.push(...newUsers)

bool.value = newUsers.length == 20

console.log(userList.value);

}


useInfiniteScroll(listEl, async ()=> {  await getUsersOnScroll()}, {distance:10})

</script>

<style lang="scss" scoped>


.path{
    clip-path: polygon(0 10%, 95% 10%, 100% 0, 100% 8%, 100% 100%, 0 100%);
    border-radius: 2px;
}

</style>