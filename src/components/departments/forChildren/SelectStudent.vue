<template>
  <div>
    <div class="container px-5">
      <div class="row">
        <h2 class="my-5 text-xl">Students</h2>
        <div class="container" v-if="!noInfos">
          <div class="row">
            <div class="col-12 overflow-auto">
              <div v-for="user in users" :key="user.id" class="mx-0 mt-3">
                <input
                  type="radio"
                  class="btn-check  d-block"
                  name="options"
                  :id="user.id"
                  autocomplete="off"
                  :value="user.id"
                  v-model="picked"
                  @click="getUserId(user.id)"
                />
                <label
                  class="btn w-100 btn-dark text-white border shadow bg-gradient m-0"
                  :class="{ active: isActive }"
                  v-bind:for="user.id"
                  >{{ user.firstName }} {{ user.lastName }}
                  {{ user.fatherName }}
                </label>

                <!-- Modal -->
           
              </div>
            </div>
          </div>


          <div class="d-flex justify-content-center" v-if="loading">
            <div class="spinner spinner-border text-dark">

            </div>
          </div>

          <button
            class="btn bg-[#9492EE] hover:bg-[#9492EE]  w-25 mt-6  text-dark  float-end"
            @click="addStudent()"
            disabled
            ref="butn"
            data-mdb-toggle="modal"
            data-mdb-target="#exampleModal"
          >
            Add student<i class="fa fa-add"></i>
          </button>
        </div>

        <n-result status="error" title="Attention"  v-else>
    <template #footer>
      <n-button type = 'error' class="text-dark">no data found !</n-button>
    </template>
  </n-result>

      </div>
    </div>

<div style="height:100vh; top:0; left:48%" class="d-flex text-success align-items-center position-fixed justify-content-center" v-if="sedeCheck">
<i class="fa fa-check " style="font-size:100px"></i>
</div>

  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import base from "../../../reusables/getInfos.js";
let store = useStore();
let users = ref([]);
let picked = ref();
let isActive = ref(true);
let showModal = ref(false);
let fill = ref(false);
let butn = ref();
let sedeCheck = ref(false)
const noInfos = ref(false)
const route = useRoute()


onMounted(() => {
  axios
    .get(
      `${base}Students/ByGrade/${store.state.gradeId}`,

      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
    .then((el) => {
      if(el.data.length == 0){
noInfos.value = true
      }else{
        noInfos.value = false
      }
     
      el.data.forEach((res) => {
        users.value.push(res);
      });

    })
    .catch((error) => {
      console.log(error);
    });
});

watch(picked, (newQuestion, oldQuestion) => {
  console.log(newQuestion, butn.value);
  if (newQuestion) {
    butn.value.removeAttribute("disabled", "");
  }


  console.log(picked.value);
});

const uid = ref(null)
const getUserId = (userId)=>{
  uid.value = userId
}

let addStudent = () => {
  axios
    .patch(
      `${base}Parents/addStudent?id=${picked.value}&studentId=${route.params.id}`,
      {},
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
    .then((el) => {
      console.log(el);
       setTimeout(() => {
         sedeCheck.value = true
       }, 10);

       setTimeout(() => {
         sedeCheck.value = false
       }, 2000);
    })
    .catch((errMsg) => {
      console.log(errMsg);
    });
};
</script>

<style lang="scss" scoped>
.active {
  background: rgb(112, 176, 255);
}
</style>
