<template>
  <div style="min-height: 100%; width: 80%; margin: auto" >
    <div class="sidebar_header pt-2 d-flex gap-2 align-items-center">
      <img
        src="@/assets/logo.svg"
        alt=""
        class="w-100 mx-1  d-block "
        
      />
    </div>

    <div
      class="d-flex flex-column ms-1 position-relative align-items-center "
      style="min-height: 75vh; width: 100%"
    >
      <n-tooltip trigger="hover" placement="right-start">
        <template #trigger>
          <router-link
            to="/classes"
            class="nav-link mt-4 d-flex gap-3 align-items-center rounded-1"
            style="cursor: pointer"
            id="link1"
          >
            <i class="far fa-address-card"></i>
            <span v-if="!store.state.showFullSidebar"
              >Classes</span
            ></router-link
          >
        </template>
        <div>Student performance</div>
      </n-tooltip>

      <!-- Teachers -->

      <n-tooltip trigger="hover" placement="right-start">
        <template #trigger>
          <router-link
            to="/Dashboard/"
            class="nav-link mt-2 d-flex gap-3 align-items-center rounded-1"
          >
            <i class="fas fa-users"></i>
            <span v-if="!store.state.showFullSidebar"
              >Teachers</span
            ></router-link
          >
        </template>
        Teachers
      </n-tooltip>

      <!-- Grades -->

      <n-tooltip trigger="hover" placement="right-start">
        <template #trigger>
          <router-link
            to="/Grades"
            class="nav-link mt-2 d-flex gap-3 align-items-center rounded-1"
            ><i class="fas fa-chalkboard-user"></i>
            <span v-if="!store.state.showFullSidebar">Grades</span>
          </router-link>
        </template>
        Grades
      </n-tooltip>

      <!-- Parents -->

      <n-tooltip trigger="hover" placement="right-start">
        <template #trigger>
          <router-link
            to="/Parents"
            class="nav-link mt-4 d-flex gap-3 align-items-center rounded-1"
            ><i class="fas fa-user-group"></i>
            <span v-if="!store.state.showFullSidebar"
              >Parents</span
            ></router-link
          >
        </template>
        Parents
      </n-tooltip>

      <n-tooltip trigger="hover" placement="right-start">
        <template #trigger>
          <router-link
            to="/History"
            class="nav-link mt-2 d-flex gap-3 align-items-center rounded-1"
            ><i class="fas fa-clock-rotate-left"></i>
            <span v-if="!store.state.showFullSidebar"
              >History</span
            ></router-link
          >
        </template>
        History
      </n-tooltip>
    </div>

    <button
      class="justify-content-center d-flex text-white gap-3 align-items-center text-start bg-transparent text-black w-100 shadow-none px-2"
      @click="logOut"
    >
      <i
        class="fas fa-right-from-bracket"
        style="transform: rotate(180deg)"
      ></i>
      <span v-if="!store.state.showFullSidebar"> Log out</span>
    </button>
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

a {
  color: rgb(255, 255, 255);
  display: block !important;
  margin-top: 40px !important;
  outline: none !important;
  overflow: hidden !important;

  &:hover {
    color: rgb(190, 178, 178) !important;
  }
}
</style>
