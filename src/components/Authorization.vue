<template>
  <div id="Auth">


    <div id="login" >
      <div class="main backdrop-blur-md">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div class="signup"></div>

        <div class="login">
          <form>
            <label for="chk" aria-hidden="true" class="pt-3">Login</label>
            <input
              type="text"
              placeholder="Login"
              required=""
              v-model="email"
            />
            <input
              type="password"
              placeholder="Password"
              required=""
              v-model="password"
            />
            <button
              @click.prevent="Request"
              class="d-flex justify-content-center align-items-center"
            >
              <span v-if="!loade">Login</span>
              <div
                class="spinner-border fw-lighter py-1"
                style="font-sizde: 10px"
                v-if="loade"
              ></div>
            </button>
          </form>

          <img alt="" class="w-25 m-auto d-block" />
          <h4 class="text-center mt-3 animation" @click="info">
            <span id="dilkhush">Red Bridge</span> Admin Panel
          </h4>

        
         
        </div>
      </div>

      <div class="shape1 top-[57%] opacity-60 left-[33%] rounded-full absolute  z-50"></div>
      <div class="shape2 top-[22%] opacity-50 right-[34%] rounded-full absolute  z-50"></div>
    </div>
  </div>

  <Toast></Toast>
</template>

<script setup>
import Axios from "axios";
import { ref, onMounted } from "vue";
import Toast from 'primevue/toast';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useToast } from 'primevue/usetoast';
const toast = useToast();

import base from "../reusables/getInfos.js";
let store = useStore();
let router = useRouter();
let email = ref("");
let password = ref("");
let loade = ref(false);

onMounted(() => {});

let Request = () => {
  loade.value = true;
  Axios.post(
    `${base}Authentication`,
    {
      userName: email.value,
      password: password.value,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((el) => {
      console.log(el);

      if (el.data) {
        store.state.isAuthenticated = true;
        localStorage.setItem("jwt", el.data);
        router.push('/Dashboard/');
      } else if(el.status == 204){
        toast.add({ severity: 'error', summary: 'Info', detail: 'Incorrect login or password', life: 4000 });

      }

    })
    .catch((err) => {
      console.log(err);
      loade.value = false;
      toast.add({ severity: 'info', summary: 'Info', detail: err, life: 3000 });
    })
    .finally(() => {
      loade.value = false;
    });
};
</script>
<style lang="scss" scoped>
#Auth {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23EBE7FF'/%3E%3Cstop offset='1' stop-color='%23FFFFFF'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23f5f3ff'/%3E%3Cstop offset='1' stop-color='%23FFFFFF'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg %3E%3Cg transform=''%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(-36 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

#form {
  backdrop-filter: blur(10px) saturate(152%);
  -webkit-backdrop-filter: blur(10px) saturate(152%);
  background-color: rgba(255, 255, 255, 0.58);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}

#login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Jost", sans-serif;
  background-position: center;
  background-size: contain;
}
#login:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}
.main {
  width: 450px;
  height: 500px;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 0px 45px rgba(150, 156, 155, 0.246);
  position: relative;
  z-index: 22222222;
}
#chk {
  display: none;
}
.signup {
  position: relative;
  width: 100%;
  height: 100%;
}
label {
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
input {
  width: 70%;
  height: 20px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 20px;
  border: none;
  outline: none;
  border-radius: 5px;
}
button {
  width: 70%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  background: #6d44b8;
}
.login {
  height: 500px;
  background: rgb(255, 255, 255);

  border-radius: 60% / 10%;
  transform: translateY(-150px);
  box-shadow: 0 0 4px rgba(184, 212, 209, 0.493);
  transition: 0.3s ease-in-out;
}
.login label {
  color: #573b8a;
  transform: scale(0.6);
}
#chk:checked ~ .login {
  transform: translateY(-500px);
}
#chk:checked ~ .login label {
  transform: scale(1);
}
#chk:checked ~ .signup label {
  transform: scale(0.6);
}

.animation {
  background: rgb(37, 33, 173);
  background: linear-gradient(
    153deg,
    rgba(37, 33, 173, 1) 29%,
    rgba(166, 11, 108, 0.9278420840992647) 96%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#dilkhush {
  font-family: "Quicksand", sans-serif;
  font-weight: bold;
}

.main {
  background-image: url("../assets/logo.svg");
  background-size: 80%;

  background-repeat: no-repeat;
  background-position: center 15px;
}

.glass{
backdrop-filter: 20px;
}

@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");
</style>
