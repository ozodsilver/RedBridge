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
            position-relative
           
          "
       style="margin-top:50%"
        >
        Loading...
        </h1>

        <div
          class="col-6"
          v-for="(teacher, index) in teachers"
          :key="teacher.id"
        >
          <div class="card mt-4 border border-top-0 border-light" v-if="teachers.length >= 1">
            <div class="card-header bg-secondary text-white bg-gradient">
              About Teachers
            </div>
            <div class="card-body">
              <h6 class="card-title text-muted">
                First name:
                <span class="fs-6 text-dark">{{ teacher.firstName }}</span>
              </h6>
              <h6 class="card-title text-muted">
                Last name:<span class="fs-6 text-dark"
                  >{{ teacher.lastName }}
                </span>
              </h6>
              <h6 class="card-title text-muted">
                Father name:
                <span class="fs-6 text-dark">{{ teacher.fatherName }}</span>
              </h6>
              <div class="d-flex align-items-center gap-2">
                <lord-icon
    src="https://cdn.lordicon.com/ajkxzzfb.json"
    trigger="hover"
    colors="primary:#30e8bd,secondary:#30e8bd"
    style="width:30px;height:30px">
</lord-icon> Username:
                {{ teacher.userName }}
              </div>

            
                <lord-icon
                src="https://cdn.lordicon.com/tntmaygd.json"
                  trigger="hover"
                  style="width: 40px; height: 40px; cursor:pointer"
                  class="float-end"
                  colors="primary:#e83a30,secondary:#16c79e"
                  @click="deleteTeacher(teacher.userName, index)"
                >
                </lord-icon>
            
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-link
      to="/addTeachers"
      class=" position-fixed bg-gradient d-flex align-items-center gap-3"
      style="bottom: 20px; right: 20px; width: 200px"
      >Add Teachers 
      <lord-icon
    src="https://cdn.lordicon.com/xzksbhzh.json"
    trigger="hover"
    style="width:50px;height:50px">
</lord-icon>
    </router-link>
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
.card{
  transition: 0.1s linear;
&:hover{
  transform: scale(1.01) translateX(-8px) translateY(4px);
  position: relative;
  z-index: 333;
  box-shadow: 10px -10px 5px rgb(206, 204, 204);
}
}



.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>