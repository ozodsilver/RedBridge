<template>

<Toast />

<div v-if="students.length == 0">
  <n-result
    status="warning"
    title="Warning"
    description="No found information"
    class="absolute left-2/4 top-2/4"
  >
   
  </n-result>
</div>


  <div v-else>
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div class="container p-4">
      <h2 class="pt-3 text-2xl text-teal-700 mt-4">Students</h2>
      <div class="row">
        <div class="col-12 mt-4">
          <table
            class="table align-middle bg-dark table-dark   rounded bg-gradient mb-0 "
          >
            <thead class="bg-light rounded">
              <tr class="rounded border-0 ">
                <th class="rounded-5">First Name</th>
                <th class="rounded-5">Last Name</th>
                <th class="rounded-5">Father Name</th>
                <th class="rounded-5">Status</th>
                <th class="rounded-5 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-0  " v-for="(student, index) in students" :key="student.id">
                <td class="rounded-5 transition-all  hover:scale-105">
                  <div class="d-flex align-items-center">
                    <i class="fas fa-user-circle fa-2x text-secondary"></i>
                    <div class="ms-3">
                      <p class="fw-bold mb-1">Name: {{ student.firstName }}</p>
                    </div>
                  </div>
                </td>
                <td class="rounded-5 transition-all  hover:scale-105">
                  <p class="fw-normal mb-1">{{ student.lastName }}</p>
                </td>

                <td class="rounded-5 transition-all  hover:scale-105">
                  <p class="fw-normal mb-1">{{ student.fatherName }}</p>
                </td>

                <td class="rounded-5 transition-all">
                  <div class="d-flex position-relative">
                    <div
                      class="badge position-absolute h-25 bg-secondary"
                      style="top: 10px"
                    >
                    
                    </div>
                    <VueDatePicker v-model="student.activeDate" placeholder="Start Typing ..." text-input auto-apply  format = 'MM.dd.YYY' :enable-time-picker="false" />
                    <button @click="updateTime(student.id, student.activeDate)" class=" bg-[#9492EE] rounded-lg ml-1  w-25">
                      send
                    </button>
                  </div>
                  
                </td>

                <td class="rounded-5 text-center transition-all  hover:scale-105">
                  <i
                    class="fas fa-trash-alt p-2 bg-light text-danger rounded-2 shadow"
                    style="cursor: pointer"
                    @click="openModal(student.id, index)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


    <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }">
            <p>
           delete this student
            </p>

            <div class="flex items-center justify-end gap-3">
<button class="w-[140px] h-[42px] rounded-full bg-red-400 text-white" @click="visible = false">Cancel</button>
<button class="w-[140px] h-[42px] rounded-full bg-teal-500 text-white" @click="deleteStudents">Delete</button>
            </div>

        </Dialog>


  </div>

  <router-link
    :to="{name:'AddStudents'}"
    class="btn bg-[#9492EE] text-white hover:bg-[#9492EE] position-fixed"
    @click="store.state.id = id"
    style="bottom: 20px; right: 20px; width: 200px"
    >Add Students <i class="fas fa-plus-circle"></i
  ></router-link>


<Toast>

</Toast>

</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import base from "../../../reusables/getInfos.js";

const visible = ref(false);

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

const studentId = ref(null)
const idx = ref(null)

const openModal = (id, index)=>{
  visible.value = true
studentId.value = id;
idx.value = index

}

let deleteStudents = async () => {

  students.value.splice(idx, 1);

 axios.delete(`${base}Students?guid=${studentId.value}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(res =>{
    visible.value = false
    toast.add({ severity: 'success', summary: 'Success', detail: res.statusText, life: 3000 });
  }).catch(err =>{
    toast.add({ severity: 'error', summary: 'error', detail: err, life: 3000 });
  })

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
        toast.add({ severity: 'success', detail: res.statusText, life: 3000 });
      }).finally((e)=>{

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


:deep(.dp__input){
  position: relative;
  z-index: 0;
}
</style>
