<template>


<transition name="fade">
  <div>
    <div class="container py-5">
      <h1 class="mt-5">Add Grades</h1>
      <div class="row">
        <div class="col-12">
          <input
            type="text"
            class="form-control-lg w-100"
            placeholder="Grade Name"
            v-model="gradeName"
          />
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

        <div class="col-12">
          <button
            class="
              btn btn-dark
              d-flex
              align-items-center
              gap-3
              bg-gradient
              w-25
              float-start
            "
            @click="back"
          >
            <i class="fas fa-backspace fa-2x"></i> back
          </button>
          <button
            class="btn btn-success bg-gradient w-25 float-end"
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

let teachers = ref([]);
let picked = ref();
let gradeName = ref("");
let router = useRouter();
let isActive = ref(true);
let loader = ref(false)
onMounted(async () => {
  let teacher = await axios.get(
    "https://rb.algorithmic.uz/api/Teachers"
  );
  teacher.data.forEach((el) => {
    teachers.value.push(el);
  });
});

let PostGrade = async () => {
  let response = await axios.post(
    "https://rb.algorithmic.uz/api/Grades",
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
</script>
  
  <style lang="scss" scoped>
.active {
  background: rgb(112, 176, 255);
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