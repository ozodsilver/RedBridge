<template>
  <div style="max-height: 500px; width: 100%; margin: auto; overflow: auto; "  class="px-3 mt-2" >
    <div class="sidebar_header pt-2 d-flex gap-2 align-items-center">
      <img
        src="@/assets/logo.svg"
        alt=""
        class="w-3/4 mx-auto border-b  d-block "
        
      />
    </div>

    <div
      class="d-flex flex-column position-relative align-items-center "
      style="min-height: 75vh; width: 100%"
    >
    <router-link
            to="/classes"
            class=" mt-4 flex  text-start bg-transparent rounded-xl   w-full py-2  align-items-center exact "
            style="cursor: pointer"
            id="link1"
          >
            <div class=" flex gap-3 items-center px-2">
              <i class="far fa-address-card text-xs p-2.5  px-[12px] rounded-lg block_shadow inner  "></i>
            <span class="text-sm">Performance</span>
            </div>
            </router-link
          >

      <!-- Teachers -->

   
          <router-link
            to="/Dashboard/"
            class="mt-4 flex  text-start bg-transparent rounded-xl   w-full py-2  align-items-center exact"
          >

          <div class=" flex gap-3 items-center px-2">
              <i class="fas fa-users text-xs p-2.5 px-[12px] rounded-lg block_shadow inner  "></i>
            <span class="text-sm">Teachers</span>
            </div>

           </router-link
          >
      

      <!-- Grades -->

    
          <router-link
            to="/Grades"
            class="mt-4 flex  text-start bg-transparent rounded-xl   w-full py-2  align-items-center exact"
            >


            <div class=" flex gap-3 items-center px-2">
              <i class="fas fa-chalkboard-user text-xs p-2.5 px-[12px] rounded-lg block_shadow inner  "></i>
            <span class="text-sm">Grades</span>
            </div>
            
          </router-link>
     
      <!-- Parents -->

   
      <router-link
            to="/Parents"
            class="mt-4 flex  text-start bg-transparent rounded-xl   w-full py-2  align-items-center exact"
            >
            <div class=" flex gap-3 items-center px-2">
              <i class="fas fa-user-group text-xs p-2.5 px-[12px] rounded-lg block_shadow inner  "></i>
            <span class="text-sm">Parents</span>
            </div>
            
          </router-link>

          <router-link
            to="/history"
            class="mt-4 flex  text-start bg-transparent rounded-xl   w-full py-2  align-items-center exact"
            >
            <div class=" flex gap-3 items-center px-2">
              <i class="fas fa-user-group text-xs p-2.5 px-[12px] rounded-lg block_shadow inner  "></i>
            <span class="text-sm">History</span>
            </div>
            
          </router-link>
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
.custom_width {
  width: 90px !important;
  display: block;
  margin-left: 9px;
}

.block_shadow{
  box-shadow: 0 3px 10px rgb(238, 234, 234);
}



</style>
