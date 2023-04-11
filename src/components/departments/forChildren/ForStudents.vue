<template>
  <div>
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div class="container p-4">
      <div
        class="my-4 text-dark d-flex align-items-center gap-5 justify-content-start w-25"
      >
        <i
          class="fas fa-chevron-circle-left fa-3x"
          @click="router.go(-1)"
          style="cursor: pointer"
        ></i>
        <h2 class="pt-3">Students</h2>
      </div>
      <div class="row">
        <div class="col-12 mt-4">
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
              <tr class="border-0" v-for="(student, index) in students" :key="student.id">
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
                      {{ new Date(student.activeDate).toDateString() }}
                    </div>
                    <input type="date" v-model="Time" />
                    <button @click="updateTime(student.id)" class="btn-success w-25">
                      send
                    </button>
                  </div>
                  f
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
    to="/AddStudents"
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
import base from "../../../reusables/getInfos";

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

let updateTime = async (studentId) => {

  try {
    axios
      .patch(`${base}Students?studentId=${studentId}&date=${new Date(Time.value).toISOString()}`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert('time changed')
        Time.value = ''
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
</style>
