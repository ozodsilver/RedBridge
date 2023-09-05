<template>
  <div  style="min-height: 100%; width: 80%; margin: auto;">
    <div class="sidebar_header p-2 d-flex gap-2 align-items-center" :class="{'flex-column gap-3':store.state.showFullSidebar}">
      <img src="@/assets/logo.svg" alt="" class="w-50 d-block" :class="{'custom_width':store.state.showFullSidebar}" />
    
    </div>

    <div
      class="d-flex flex-column  justify-content-between  align-items-center"
      style="min-height: 80vh; width: 100%;"
    >
      <div :class="{'w-75 text-white':store.state.showFullSidebar, 'w-100':!store.state.showFullSidebar}">

        <n-tooltip trigger="hover" placement = 'right-start' v-if="store.state.showFullSidebar">
    <template #trigger>
      <router-link
          to="/classes"
          class="nav-link mt-4  d-flex  gap-3 align-items-center rounded-1"
          :class="{
            'mt-4 d-block justify-content-center': store.state.showFullSidebar,
          }"
          
          style="cursor: pointer; padding: 12px"
          id="link1"
        >
          <i class="far fa-address-card"></i>
          <span v-if="!store.state.showFullSidebar">Classes</span></router-link
        >
    </template>
  <div >
    Student performance
  </div>
  </n-tooltip>




        <!-- Teachers -->

        <n-tooltip trigger="hover" v-if="store.state.showFullSidebar" placement = 'right-start'>
    <template #trigger>
      <router-link
          to="/Dashboard/"
          class="nav-link px-3 mt-2 d-flex gap-3 align-items-center rounded-1"
          :class="{
            'mt-4 d-block justify-content-center': store.state.showFullSidebar,
          }"
          style="cursor: pointer; padding: 12px"
        >
          <i class="fas fa-users"></i>
          <span v-if="!store.state.showFullSidebar">Teachers</span></router-link>
    </template>
  Teachers
  </n-tooltip>

      
       


<!-- Grades -->

<n-tooltip trigger="hover" placement = 'right-start'  v-if="store.state.showFullSidebar">
    <template #trigger>
      <router-link
          to="/Grades"
          class="nav-link mt-2 d-flex gap-3 align-items-center rounded-1"
          :class="{'mt-4 d-block justify-content-center':store.state.showFullSidebar}"
          style="cursor: pointer; padding: 12px"
          ><i class="fas fa-chalkboard-user"></i>
          <span v-if="!store.state.showFullSidebar">Grades</span>
        </router-link>
    </template>
    Grades
  </n-tooltip>

      

        <!-- Parents -->

        <n-tooltip trigger="hover" placement = 'right-start'  v-if="store.state.showFullSidebar">
    <template #trigger>
     
      <router-link
          to="/Parents"
          class="nav-link mt-2 d-flex gap-3 align-items-center rounded-1"
          :class="{'mt-4 d-block justify-content-center':store.state.showFullSidebar}"
          style="cursor: pointer; padding: 12px"
          ><i class="fas fa-user-group"></i>
          <span v-if="!store.state.showFullSidebar">Parents</span></router-link
        >
    </template>
    Parents
  </n-tooltip>


        <n-tooltip trigger="hover" placement = 'right-start'  v-if="store.state.showFullSidebar">
    <template #trigger>
    
      <router-link
          to="/History"
          class="nav-link mt-2 d-flex gap-3 align-items-center rounded-1"
          :class="{'mt-4 d-block justify-content-center':store.state.showFullSidebar}"
          style="cursor: pointer; padding: 12px"
          ><i class="fas fa-clock-rotate-left"></i>
          <span v-if="!store.state.showFullSidebar">History</span></router-link
        >
    </template>
    History
  </n-tooltip>


      </div>

      <button
        class="justify-content-start d-flex text-white gap-3 align-items-center text-start bg-transparent text-black w-100 shadow-none px-2 "
        @click="logOut"
      :class="{'justify-content-center':store.state.showFullSidebar}"
      >
        <i
          class="fas fa-right-from-bracket"
          style="transform: rotate(180deg)"
          :class="{' d-block text-center justify-content-center':store.state.showFullSidebar}"
        ></i>
        <span v-if="!store.state.showFullSidebar"> Log out</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
let info = defineProps(["userlar", "users", "grades", "parents", "classess"]);



import store from "@/store/store.js";

let router = useRouter();
let logOut = () => {
  localStorage.clear();
  router.push({ name: "auth" });
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='3.3'%3E%3Cpath transform='translate(-140 32) rotate(20 1409 581) scale(1.08)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='1.1' transform='translate(-80 80) rotate(24 800 450) scale(1.04)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(72 -240) rotate(240 401 736) scale(1.04)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='1'%3E%3Cpath transform='translate(480 -32) rotate(8 150 345) scale(0.92)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='2.2' transform='translate(-320 -200) rotate(288 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-480 160) rotate(48 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  background-position: 200px;
}



.custom_width{
width: 90px !important;
display: block;
margin-left: 9px;

}
</style>

