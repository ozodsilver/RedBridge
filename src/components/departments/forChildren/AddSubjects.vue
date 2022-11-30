<template>
  <transition name="fade">
    <div>
      <div class="container py-5">
        <h1 class="mt-5">Add Subjects</h1>
        <div class="row">
          <div class="col-12">
            <input
              type="text"
              class="form-control-lg w-100"
              placeholder="Subject Name"
              v-model="subjectName"
            />
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
              @click="PostSubject"
            >
              Add Grade <i class="fas fa-plus"></i>
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
import { ref, onMounted, } from "vue";
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
import ForSubjects from "./ForSubjects.vue";
let subjects = ref([]);
let picked = ref();
let subjectName = ref("");
let router = useRouter();
let isActive = ref(true);
let loader = ref(false);
let store = useStore()


onMounted(async () => {
  let subject = await axios.get(`https://redbridge-school.herokuapp.com/api/Subjects/${store.state.id}`, 
 {
  headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${localStorage.getItem('jwt')}`
    }
 }
  );
  // subject.data.forEach((el) => {
  //   subjects.value.push(el);
  // });

  console.log(subject);

  console.log(store.state.id);

});

let PostSubject = async () => {
  let response = await axios.post(
    `https://redbridge-school.herokuapp.com/api/Subjects`,
    {
      name: subjectName.value,
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
  router.push({ path:`/ForSubjects/${store.state.id}` });
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