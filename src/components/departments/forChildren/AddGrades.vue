<template>

<button
            class="
              btn glass
              d-flex
              align-items-center
              gap-2
           text-white
            m-4
       
            "
   
            @click="back"
          >
            <i class="fas fa-backspace "></i>
             back
          </button>
<transition name="fade">
  <div>
    <div class="container px-24">
      <h1 class="mt-5 text-2xl text-dark">Add Grades</h1>
      <div class="row mt-4">
        <div class="col-12">
          <div class="relative">
    <input type="text" v-model="gradeName" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm  text-dark  rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Grade Name</label>
</div>
        </div>

        <div class="col-12 overflow-auto">
          <div v-for="teacher in teachers" :key="teacher.id" class="mx-0 mt-3">
            <input
              type="radio"
              class="btn-check d-block"
              name="options"
              :id="teacher.id"
              autocomplete="off"
              :value="teacher.id"
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
              v-bind:for="teacher.id"
              >{{ teacher.firstName }} {{ teacher.lastName }}
              {{ teacher.fatherName }}</label
            >
          </div>
        </div>

        <div class="col-12 mt-6">
       
          <button
            class="btn btn-success bg-gradient w-25 float-end"
            :disabled = 'disabled'
            @click="PostGrade"
          >
            Add Grade <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</transition>
 

  <div class="badge bg-success d-flex gap-3 justify-content-center align-items-center m-auto w-50 p-4" v-if="loader">
    <h2>Grades Success addedd</h2>
    <i class="fas fa-check-double"></i>
  </div>

</template>
  
  <script setup>
import axios from "axios";
import { ref, onMounted, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import base from '../../../reusables/getInfos'
let teachers = ref([]);
let picked = ref(null);
let gradeName = ref("");
let router = useRouter();
let isActive = ref(true);
let loader = ref(false)
onMounted(async () => {
  let teacher = await axios.get(
    `${base}Teachers`
  );
  teacher.data.forEach((el) => {
    teachers.value.push(el);
  });
});

let PostGrade = async () => {
  let response = await axios.post(
    `${base}Grades`,
    {
      name: gradeName.value,
      curator: picked.value,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );

  gradeName.value = ''

  if(response.data){
setTimeout(() => {
  loader.value = true
}, 10);

setTimeout(() => {
  loader.value = false
}, 2000);
  }

  console.log(response);

};

let back = () => {
  router.push({ name: "Grades" });
};

const disabled = ref(false)
watchEffect(()=>{
if(gradeName.value == "" || picked.value == null){
  disabled.value = true
}else{
disabled.value = false
}
})
</script>
  
  <style lang="scss" scoped>
.active {
  background: rgb(70, 107, 151);
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