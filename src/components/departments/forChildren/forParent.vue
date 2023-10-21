<template>
  <div>
   
    <div class="container px-5" v-if="showContent">
      <div class="d-flex justify-content-between w-100 align-items-center">
        <button class="btn bg-[#9492EE] text-white hover:text-dark m-0" @click="backOneStep">
          back <i class="fa fa-angle-left"></i>
        </button>
        <h2 class="my-5 text-end">children belonging to this person</h2>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">FatherName</th>
                <th scope="col">GradeName</th>
                <th scope="col">totalScore</th>
                <th scope="col" class="text-danger text-center">
                  delete Student
                </th>
              </tr>
            </thead>
            <tbody>
              <div class="spinner spinner-border text-danger  position-absolute" style="left:50%; top: 50%;" v-show = 'load'>

              </div>
              <tr v-for="(student, index) in Student" :key="student.id">
                <th>{{ index + 1 }}</th>
                <td>{{ student.firstName }}</td>
                <td>{{ student.lastName }}</td>
                <td>{{ student.fatherName }}</td>
                <td>{{ student.grade }}</td>
                <td>{{ student.totalScore }}</td>
                <td>
                  <button
                    class="btn btn-danger p-2 w-25 d-block m-auto"
                    @click="deleteStudent(student.id, index)"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <n-result class="mt-[200px]" status="error" title="Error" description="This is list empty" v-else>
    <template #footer>
     
    </template>
  </n-result>

    <router-link
 
      to="/AddStudentForParent"
      class="btn bg-[#9492EE] hover:bg-[#9492EE] text-white position-fixed"
      style="bottom: 20px; right: 20px; width: 280px"
      >Add student for this parent <i class="fas fa-plus-circle"></i
    ></router-link>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import base from "../../../reusables/getInfos.js";
import { useStore } from "vuex";
import {useRouter} from 'vue-router'

let store = useStore();
let Student = reactive([]);
let load = ref(true)
let router = useRouter()
const showContent = ref(true)


onMounted(() => {
  axios
    .get(`${base}Parents/getStudents?userName=${store.state.userName}`)
    .then((el) => {
      console.log(el.data);
      if(el.data.length == 0){
      load.value = false
    }
      console.log(el.data);
      if(el.data.length == 0){
        showContent.value = false
      }else{
        showContent.value = true

      }

      el.data.forEach((res) => {
        Student.push(res);
        load.value = false
    
      });
    });
});

let deleteStudent = (sid, index) => {
 Student.splice(index,1)

  axios
    .patch(
      `${base}Parents/removeStudent?id=${store.state.parentId}&studentId=${sid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
    .then((el) => {
      console.log(el);
    });
};

let backOneStep = ()=>{
router.go(-1)
}
</script>

<style lang="scss" scoped></style>
