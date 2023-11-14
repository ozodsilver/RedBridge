<script setup>
import Authorization from "./components/Authorization.vue";

import { ref, onMounted, onUpdated } from "vue";
</script>
<template>
  <div id="App">
    <router-view v-slot="{ Component }">
   
        <component :is="Component" />

    </router-view>
  </div>

  <div style="height: 100vh" class="d-flex align-items-center" id="text">
    <h1 class="text-center">
      The application cannot be accessed from a device of this size
    </h1>
  </div>
</template>

<style lang="scss">
body {
  font-family: "Quicksand", sans-serif;

  background: #F8F9FA;
}

*{
  box-sizing: border-box !important ;
}


.fade-enter-active {
  transition: all 0.5s linear;

  transform: scale(1);
  filter: blur(0px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(3px);
}

.router-link-exact-active {
  background: #ffffff !important;
  box-shadow: -7px 7px 7px rgb(245, 242, 242);
  border-radius: 12px;
  color: #9492EE !important;
  position: relative;
  text-align: center;
  font-weight: bold;

  overflow: hidden !important;

}

.router-link-exact-active .inner{
background-color: #9492EE;
color: white;
font-size: 12px;
}


@media (max-width: 800px) {
  #App {
    display: none !important ;
  }

  #text {
    display: block !important;
  }
}

@media (min-width: 900px) {
  #text {
    display: none !important;
  }
}



.glass {
  background: rgb(231,232,232);
background: linear-gradient(185deg, rgba(231,232,232,1) 0%, rgba(255,255,255,1) 100%);
}

.p-toast{
background-color: rgba(57, 168, 107, 0.651) !important;
 border-radius: 8px;
 color: white;
 
}


.p-toast-message-content {
    display: flex;
   justify-content: space-around;
    align-items: center; 
    gap: 20px;
    padding: 10px;
}

.p-toast-icon-close {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    right: 20px;
}


/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
</style>
