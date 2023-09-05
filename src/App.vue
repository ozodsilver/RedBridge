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
  color: white !important;

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
background-color: rgb(255, 255, 255);

right: -40%;
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

input[data-key="search"] {
  background: white
    url("https://cdn0.iconfinder.com/data/icons/ikonate/48/search-256.png");
  background-size: contain;
  background-position: 98%;
  background-size: 31px 31px;
  background-repeat: no-repeat;
  border-radius: 5px;
  transition: 0.5s;
}

input[data-key="search"]:focus {
  transform: translateY(-10px);
  box-shadow: 10px 15px 10px #c5c5c6 !important;
  outline: 1px rgba(98, 34, 202, 0.348) solid;
}

.glass {
  background: rgb(75, 83, 120);
  background: radial-gradient(
    circle,
    rgba(75, 83, 120, 1) 0%,
    rgba(50, 55, 83, 0.9556197478991597) 100%
  );
  border-right: 1px solid rgb(67, 67, 82);
}

@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap");
</style>
