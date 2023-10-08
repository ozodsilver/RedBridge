<script setup>
import Authorization from "./components/Authorization.vue";

import { ref, onMounted, onUpdated } from "vue";
</script>
<template>
  <div id="App">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
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
  cursor: url("./assets/double-click.png") 4 12, auto;
  background: rgba(9, 89, 109, 0.048);
}

*{
  box-sizing: border-box !important ;
}

::-webkit-scrollbar {
  display: none;
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
  background: #495076;
  border-radius: 15px !important;
  color: rgb(34, 163, 135) !important;

  text-align: center;
  // overflow: hidden;
  // box-shadow: inset 0 0 30px #454c5aa2, inset 10px 5px #495076;
  // border: inset 1px #61636e62;
transition: all 1s !important;
  &:before{
    content: '';
position: absolute;
transition: all 1s !important;
width: 35px;
height: 25px;
background-color: #F3F7F8;
right: -35px;
transform: rotate(40deg);

  }
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
  background: rgba(75, 83, 120,0.4);
  background: radial-gradient(
    circle,
    rgba(75, 83, 120, 0.8) 0%,
    rgba(50, 55, 83, 0.9556197478991597) 100%
  );

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

@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
</style>
