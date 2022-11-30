<template>
  <div>
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div class="container p-4">
      <div class="my-4 text-secondary d-flex align-items-center  justify-content-start  w-25" > <button class="btn d-flex justify-content-center align-items-center btn-dark rounded-circle" style="width:50px; height: 50px;" @click="this.$router.go(-1)"><i class="fas fa-backspace fa-2x"></i></button> <h2 class="pt-3">Students</h2></div> 
      <div class="row">
        <div
          class="col-6 mt-4"
          v-for="(student, index) in students"
          :key="student.id"
        >
          <div class="card shadow">
            <div class="card-body">
              <p>
                <span class="badge bg-info">Student:</span> {{ student.firstName }}
              </p>

              <p>
                <span class="badge bg-info">LastName:</span> {{ student.lastName }}
              </p>

              <p>
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
                "
                style="width: 50px"
                @click="deleteStudents(student.id, index)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-link
      to="/AddSubjects"
      class="btn btn-success position-fixed"
      style="bottom: 20px; right: 20px; width: 200px"
      >Add Students <i class="fas fa-plus-circle"></i
    ></router-link>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

let route = useRoute();
let id = route.params.id;
let students = ref([]);

onMounted(async () => {
  let res = await axios.get(
    `https://redbridge-school.herokuapp.com/api/Students/${id}`,
  
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );


  console.log(res);
//   res.data.forEach((el) => {
//     console.log(el);
//     students.value.push(el);
//   });
});

let deleteStudents = async(id, index)=>{
let  response = await axios.delete(`https://redbridge-school.herokuapp.com/api/Students?guid=${id}`,
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
        z-index: 1111;
        color: white;
    }
}
.card:before{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 10px;
    background: rgba(0,0,0,0.2);
}
</style>