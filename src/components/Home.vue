<template>
  <div id="home">
    <Nav :userlar="users"></Nav>

    <div class="container py-5">
      <div class="row">
        <h1
          v-if="teachers.length == 0"
          class="
            text-center
            d-flex
            align-items-center
            justify-content-center
            gap-3
          "
        >
          Teachers empty
        </h1>


        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>


        <div
          class="col-6"
          v-for="(teacher, index) in teachers"
          :key="teacher.id"
        >
          <div class="card mt-4" v-if="teachers.length >= 1">
            <div class="card-header">About Teachers</div>
            <div class="card-body">
              <h6 class="card-title text-muted">
                First name:
                <span class="fs-6 text-dark">{{ teacher.firstName }}</span>
              </h6>
              <h6 class="card-title text-muted">
                Last name:<span class="fs-6 text-dark">{{
                  teacher.lastName
                }}</span>
              </h6>
              <h6 class="card-title text-muted">
                Father name:
                <span class="fs-6 text-dark">{{ teacher.fatherName }}</span>
              </h6>
              <div>
                <i class="fas fa-user text-danger"></i> Username:
                {{ teacher.userName }}
              </div>

              <button
                class="
                  btn btn-danger
                  d-flex
                  justify-content-center
                  align-items-center
                  float-end
                  bg-gradient
                "
                style="width: 50px"
              >
                <i
                  class="far fa-trash-alt"
                  @click="deleteTeacher(teacher.userName, index)"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-link
      to="/addTeachers"
      class="btn btn-success position-fixed"
      style="bottom: 20px; right: 20px; width: 200px;"
      >Add Teachers <i class="fas fa-plus-circle"></i
    ></router-link>
  </div>
</template>

<script >
import axios from "axios";
import Nav from "../components/MiniComponents/Navigation.vue";
import { ref, onMounted } from "vue";
export default {
  components: {
    Nav,
  },

  data() {
    return {};
  },

  setup() {
    let users = ref("Teachers");
    let teachers = ref([]);

    let deleteTeacher = async (userName, teacherId) => {
      let removedEl = teachers.value.findIndex((x, idx) => idx == teacherId);

      console.log(removedEl);

      teachers.value.splice(removedEl, 1);

      let res = await axios.delete(
        `https://redbridge-school.herokuapp.com/api/Teachers?userName=${userName}`,
        {
          headers: {
            "Content-Type": "application/json-patch+json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
    };

    onMounted(async () => {
      let teacher = await axios.get(
        "https://redbridge-school.herokuapp.com/api/Teachers"
      );
      teacher.data.forEach((el) => {
        teachers.value.push(el);
      });
    });

    return { users, deleteTeacher, teachers };
  },
};
</script>


<style lang="scss">
</style>