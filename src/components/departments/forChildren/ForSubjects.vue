<template>
  <div>
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div class="container px-5 mb-2 pt-0" v-if="emptyBlock">
   <div class="flex items-center justify-between">
    <div>
      <i
        class="fas fa-chevron-circle-left text-2xl text-slate-500 mt-5"
        @click="router.push({ name: 'Grades' })"
        style="cursor:pointer"
      ></i>

      <h2 class="my-4 text-secondary">Subjects</h2>
    </div>

      <router-link
      :to="{ name: 'AddSubjects' }"
      class="btn bg-[#9492EE] text-white h-[40px]  hover:bg-[#9492EE]"
      style=" width: 200px"
      @click="addId"
      >Add Subjects <i class="fas fa-plus-circle"></i
    ></router-link> 
   </div>


      <div class="row">
        <div
          class="col-6 mt-3"
          v-for="(subject, index) in subjects"
          :key="subject.id"
        >
          <div class="card">
            <div class="card-header glass text-teal-700">About Subjects</div>
            <div class="card-body">
              <p>
                <span class="badge bg-[#9492EE]">Subject:</span> {{ subject.name }}
              </p>
              <button
                class="
                  btn btn-danger
                  bg-gradient
                  d-flex
                  justify-content-center
                  align-items-center
                  float-end
                "
                style="width: 40px; height: 40px;"
                @click="deleteSubject(subject.id, index)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

<div v-else  class="w-full h-screen flex items-center justify-center">
  <n-result status="error" title="Error" description="No Students" >
    <template #footer>
      <router-link to="/Grades">
Back to Grades
      </router-link>
    </template>
  </n-result>
</div>
  

    <div
      class="spinner-border text-primary position-absolute"
      style="top: 50%; left: 50%"
      role="status"
      v-if="loade"
    ></div>
  </div>

  <Toast>

  </Toast>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import base from '../../../reusables/getInfos'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

let router = useRouter();
let route = useRoute();
let id = route.params.id;
let subjects = ref([]);
const store = useStore();
const emptyBlock = ref(true)

let addId = ()=>{
 store.state.id = id
}

let loade = ref(true);
onMounted(async () => {
  let res = await axios.get(
    `${base}Subjects/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );

  res.data.forEach((el) => {
    subjects.value.push(el);
    loade.value = false;
    store.state.id = id;
  });

if(subjects.value.length == 0){
  loade.value = false
  emptyBlock.value = false
}

});

let deleteSubject =  (id, index) => {
  axios.delete(
    `${base}Subjects?Id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  ).then(res =>{
  if(res.status !== 200){
    toast.add({ severity: 'success', summary: 'Success', detail: res.statusText, life: 3000 });
  }
  }).catch(err =>{
    toast.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
  });


  subjects.value.splice(index, 1);
};
</script>
<style lang="">
</style>