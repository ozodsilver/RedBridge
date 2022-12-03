<template>
  <div>
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div class="container p-4">
      <div class="my-4 text-dark d-flex align-items-center gap-5 justify-content-start  w-25" > <i class="fas fa-chevron-circle-left fa-3x" @click="router.go(-1)" style="cursor:pointer"></i><h2 class="pt-3"> Students</h2></div> 
      <div class="row">
        <div
          class="col-12 mt-4"
          v-for="(student, index) in students"
          :key="student.id"
        >
          <!-- <div class="card shadow">
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
          </div> -->

          <table class="table align-middle mb-0 bg-white">
  <thead class="bg-light">
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Father Name</th>
      <th>Position</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style="width: 45px; height: 45px"
              class="rounded-circle"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">John Doe</p>
            <p class="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">Software engineer</p>
        <p class="text-muted mb-0">IT department</p>
      </td>
      <td>
        <span class="badge badge-success rounded-pill d-inline">Active</span>
      </td>
      <td>Senior</td>
      <td>
        <button type="button" class="btn btn-link btn-sm btn-rounded">
          Edit
        </button>
      </td>
    </tr>
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/6.jpg"
              class="rounded-circle"
              alt=""
              style="width: 45px; height: 45px"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">Alex Ray</p>
            <p class="text-muted mb-0">alex.ray@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">Consultant</p>
        <p class="text-muted mb-0">Finance</p>
      </td>
      <td>
        <span class="badge badge-primary rounded-pill d-inline"
              >Onboarding</span
          >
      </td>
      <td>Junior</td>
      <td>
        <button
                type="button"
                class="btn btn-link btn-rounded btn-sm fw-bold"
                data-mdb-ripple-color="dark"
                >
          Edit
        </button>
      </td>
    </tr>
    <tr>
      <td>
        <div class="d-flex align-items-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/7.jpg"
              class="rounded-circle"
              alt=""
              style="width: 45px; height: 45px"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">Kate Hunington</p>
            <p class="text-muted mb-0">kate.hunington@gmail.com</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">Designer</p>
        <p class="text-muted mb-0">UI/UX</p>
      </td>
      <td>
        <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
      </td>
      <td>Senior</td>
      <td>
        <button
                type="button"
                class="btn btn-link btn-rounded btn-sm fw-bold"
                data-mdb-ripple-color="dark"
                >
          Edit
        </button>
      </td>
    </tr>
  </tbody>
</table>
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