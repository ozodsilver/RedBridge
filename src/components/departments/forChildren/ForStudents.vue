<template>
  <div>
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div class="container p-4">
      <div class="my-4 text-dark d-flex align-items-center gap-5 justify-content-start  w-25" > <i class="fas fa-chevron-circle-left fa-3x" @click="router.go(-1)" style="cursor:pointer"></i><h2 class="pt-3"> Students</h2></div> 
      <div class="row">
        <div
          class="col-6 mt-4"
          v-for="(student, index) in students"
          :key="student.id"
        >
          <div class="card shadow">
            <div class="card-body">
              <p class="text-dark">
                <span class="badge bg-info">Student:</span> {{ student.firstName }}
              </p>

              <p class="text-dark">
                <span class="badge bg-info">LastName:</span> {{ student.lastName }}
              </p>

              <p class="text-dark">
                <span class="badge bg-info">FatherName:</span> {{ student.fatherName }}
              </p>
            
              <button
                class="
                  btn btn-danger
                  bg-gradient
                  d-flex
                  justify-content-center
                  align-items-center
                  float-end
                  position-relative
                "
                style="width: 50px; z-index:9999"
                @click="deleteStudents(student.id, index)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

 
  </div>

  <router-link
      to="/AddStudents"
      class="btn btn-success position-fixed"
      @click="(store.state.id = id)"
      style="bottom: 20px; right: 20px; width: 200px"
      >Add Students <i class="fas fa-plus-circle"></i
    ></router-link>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useStore} from 'vuex'

let store = useStore()
let router = useRouter()
let route = useRoute();
let id = route.params.id;
let students = ref([]);

onMounted(async () => {
  let res = await axios.get(
    `https://redbridge.algorithmic.uz/api/Students/ByGrade/${id}`,
  
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

let deleteStudents = async(id, index)=>{
let  response = await axios.delete(`https://redbridge.algorithmic.uz/api/Students?guid=${id}`,
{
    headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${localStorage.getItem('jwt')}`
    }
})
console.log(response);
students.value.splice(index,1)

}
</script>
<style lang="scss" scoped>
.card{
    background: url('../../../assets/pngegg (1).png');
    background-size: cover;
    p, span{
        position: relative;
        z-index: 11112;
        color: white;
    }
}
.card:before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 10px;
    background: rgba(0,0,0,0);
}
</style>