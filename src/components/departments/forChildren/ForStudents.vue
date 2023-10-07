<template>

<Toast />

  <div>
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div class="container p-4">
      <h2 class="pt-3 text-2xl text-dark">Students</h2>
      <div class="row">
        <div class="col-12 mt-4">
          <table
            class="table align-middle table-striped table-hover table-dark rounded bg-gradient mb-0 bg-white"
          >
            <thead class="bg-light rounded">
              <tr class="rounded border-0">
                <th class="rounded-5">First Name</th>
                <th class="rounded-5">Last Name</th>
                <th class="rounded-5">Father Name</th>
                <th class="rounded-5">Status</th>
                <th class="rounded-5 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-0 " v-for="(student, index) in students" :key="student.id">
                <td class="rounded-5">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-user-circle fa-2x text-secondary"></i>
                    <div class="ms-3">
                      <p class="fw-bold mb-1">Name: {{ student.firstName }}</p>
                    </div>
                  </div>
                </td>
                <td class="rounded-5">
                  <p class="fw-normal mb-1">{{ student.lastName }}</p>
                </td>

                <td class="rounded-5">
                  <p class="fw-normal mb-1">{{ student.fatherName }}</p>
                </td>

                <td class="rounded-5">
                  <div class="d-flex position-relative">
                    <div
                      class="badge position-absolute h-25 bg-secondary"
                      style="top: 10px"
                    >
                    
                    </div>
                    <VueDatePicker v-model="student.activeDate" placeholder="Start Typing ..." text-input auto-apply  format = 'MM.dd.YYY' :enable-time-picker="false" />
                    <button @click="updateTime(student.id, student.activeDate)" class=" glass rounded-lg ml-1  w-25">
                      send
                    </button>
                  </div>
                  
                </td>

                <td class="rounded-5 text-center">
                  <i
                    class="fas fa-trash-alt p-2 bg-light text-danger rounded-2 shadow"
                    style="cursor: pointer"
                    @click="deleteStudents(student.id, index)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <router-link
    :to="{name:'AddStudents'}"
    class="btn btn-success position-fixed"
    @click="store.state.id = id"
    style="bottom: 20px; right: 20px; width: 200px"
    >Add Students <i class="fas fa-plus-circle"></i
  ></router-link>




</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import Toast from 'primevue/toast';

import base from "../../../reusables/getInfos.js";


import { useToast } from 'primevue/usetoast';

const toast = useToast();




let store = useStore();
let router = useRouter();
let route = useRoute();
let id = route.params.id;
let students = ref([]);
let Time = ref("");
onMounted(async () => {
  let res = await axios.get(
    `${base}Students/ByGrade/${id}`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );

  console.log(res);
  res.data.forEach((el) => {
    console.log(el);
    students.value.push(el);
  });
});

let deleteStudents = async (id, index) => {
  students.value.splice(index, 1);

  let response = await axios.delete(`${base}Students?guid=${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  console.log(response);
};

let backOneStep = ()=>{
  router.push('/Home')
}

let updateTime = async (studentId,activeDate) => {

  try {
    axios
      .patch(`${base}Students?studentId=${studentId}&date=${new Date(activeDate).toJSON()}`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 30000 });
      }).finally((e)=>{
console.log('e');
      });
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.card {
  background: url("../../../assets/pngegg (1).png");
  background-size: cover;
  p,
  span {
    position: relative;
    z-index: 11112;
    color: white;
  }
}
.card:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
}


:global(.p-toast){
background: red !important;
}

</style>
