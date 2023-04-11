<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Navbar brand -->
          <a class="navbar-brand mt-2 mt-lg-0" href="#">
            <img src="../../assets/logo.svg " height="60" alt="MDB Logo" loading="lazy" />
          </a>
          <!-- Left links -->
          <ul class="navbar-nav d-flex  me-auto w-100 gap-3 mb-2 mb-lg-0">
            <div class="w-100 d-flex align-items-center">
              <li class="nav-item">
                <router-link
                  to="/classes"
                  class="nav-link px-3 rounded-1"
                  style="cursor: pointer"
                  id="link1"
                  >Classes</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  to="/Home"
                  class="nav-link px-3 rounded-1"
                  style="cursor: pointer"
                  >Teachers</router-link
                >
              </li>

              <li class="nav-item">
                <router-link to="/Grades" class="nav-link rounded-1">Grades</router-link>
              </li>

              <li class="nav-item">
                <router-link to="/Parents" class="nav-link rounded-3"
                  >Parents</router-link
                >
              </li>
            </div>

            <button
              class="btn nav-item shadow-none bg-gradient"
              style="width:10%"
              @click="logOut"
            >
              <i class="fas fa-right-from-bracket" style="transform: rotate(180deg)"></i>
              log out
            </button>
          </ul>
        </div>
      </div>

      <div class="px-4 py-3 badge shadow-lg text-dark bg-gradient mx-3">
        {{ info.userlar }} {{ info.users }} {{ info.grades }} {{ info.parents }}
        {{ info.classess }}
      </div>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
let info = defineProps(["userlar", "users", "grades", "parents", "classess"]);

let router = useRouter()
let logOut = ()=>{
  router.push({name:'auth'})
}

</script>

<style lang="scss" scoped>
.navbar {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='3.3'%3E%3Cpath transform='translate(-140 32) rotate(20 1409 581) scale(1.08)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='1.1' transform='translate(-80 80) rotate(24 800 450) scale(1.04)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(72 -240) rotate(240 401 736) scale(1.04)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='1'%3E%3Cpath transform='translate(480 -32) rotate(8 150 345) scale(0.92)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='2.2' transform='translate(-320 -200) rotate(288 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-480 160) rotate(48 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  background-position: 200px;
}
</style>
