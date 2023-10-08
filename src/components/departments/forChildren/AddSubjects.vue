<template>


<button
              class="
                btn btn-dark
                d-flex
                align-items-center
                gap-3
               glass
           m-4
              "
          @click="back"
            >
              <i class="fas fa-backspace "></i> back
            </button>

  <transition name="fade">
    <div>
      <div class="container px-5 py-2">
        <h1 class="mt-1 mb-3 text-2xl">Add Subjects</h1>
        <div class="row">
          <div class="col-12">
            <input
              type="text"
              class="form-control-lg w-100 outline-none"
              placeholder="Subject Name"
              v-model="subjectName"
            />
          </div>


          <div class="col-12 overflow-auto">
          <div v-for="subject in subjects" :key="subject.id" class="mx-0 mt-3">
            <input
              type="radio"
              class="btn-check d-block"
              name="options"
              :id="subject.id"
              autocomplete="off"
              :value="subject.id"
              v-model="picked"
            />
            <label
              class="
                btn
                w-100
                btn-dark
                text-white
                border
                shadow
                bg-gradient
                m-0
              "
              :class="{ active: isActive }"
              v-bind:for="subject.id"
              >{{ subject.firstName }} {{ subject.lastName }}
              {{ subject.fatherName }}</label
            >
          </div>
        </div>


          <div class="col-12">
  
            <button
              class="btn glass text-white mt-2 w-25 float-end"
              @click="PostSubject"
              :disabled="disabled"
            >
          
              Add subject <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <div
    class="
      badge
      bg-success
      d-flex
      gap-3
      justify-content-center
      align-items-center
      m-auto
      w-50
      p-4
    "
    v-if="loader"
  >
    <h2>Subjects Success addedd</h2>
    <i class="fas fa-check-double"></i>
  </div>
</template>
      
      <script setup>
import axios from "axios";
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
import base from '../../../reusables/getInfos.js'

let subjects = ref([]);
let picked = ref(null);
let subjectName = ref("");
let router = useRouter();
let isActive = ref(true);
let loader = ref(false);
let store = useStore()

const disabled = ref(true)

onMounted(async () => {
  let subject = await axios.get(
    `${base}Teachers`
  );
  subject.data.forEach((el) => {
    subjects.value.push(el);
  });

});

let PostSubject = async () => {
  let response = await axios.post(
    `${base}Subjects`,
    {
      name: subjectName.value,
      teacher:picked.value,
      grade: store.state.id
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );

  subjectName.value = "";

  if (response.status == 200) {
    setTimeout(() => {
      loader.value = true;
    }, 10);

    setTimeout(() => {
      loader.value = false;
    }, 2000);
  }

  console.log(response);
};

let back = () => {
  router.go(-1);
};


watchEffect(()=>{

if(subjectName.value == '' || picked.value == null ){
  disabled.value = true
}else{
disabled.value = false
}

})

</script>
      
      <style lang="scss" scoped>
.active {
  background: rgb(61, 95, 136);
}

::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>