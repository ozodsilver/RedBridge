<template>
  <div id="home">
    <Nav :userlar="users"></Nav>

    <div class="container py-5">
      <input
        type="text"
        class="form-control p-4 border-0 shadow-sm"
        placeholder="Search byName Teacher"
        data-key="search"
        v-model="homeInput"
      />
      <div class="row">
        <div class="col-6" v-for="(teacher, index) in findInfo" :key="teacher.id">
          <div
            class="card mt-4 border border-top-0 border-light"
            v-if="teachers.length >= 1"
          >
            <div class="card-header bg-secondary text-white bg-gradient">
              About Teacher
            </div>
            <div class="card-body">
              <h6 class="card-title text-muted">
                First name:
                <span class="fs-6 text-dark">{{ teacher.firstName }}</span>
              </h6>
              <h6 class="card-title text-muted">
                Last name:<span class="fs-6 text-dark">{{ teacher.lastName }} </span>
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
                  style="width: 30px; height: 30px"
                >
                </lord-icon>
                Username:
                {{ teacher.userName }}
              </div>

              <lord-icon
                src="https://cdn.lordicon.com/tntmaygd.json"
                trigger="hover"
                style="width: 40px; height: 40px; cursor: pointer"
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
      class="position-fixed bg-gradient d-flex align-items-center gap-3"
      style="bottom: 20px; right: 20px; width: 200px"
      >Add Teachers
      <lord-icon
        src="https://cdn.lordicon.com/xzksbhzh.json"
        trigger="hover"
        style="width: 50px; height: 50px"
      >
      </lord-icon>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "../components/MiniComponents/Navigation.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import base from "../reusables/getInfos";
export default {
  components: {
    Nav,
  },

  data() {
    return {};
  },

  setup() {
    let store = useStore();
    let users = ref("Teachers");
    let teachers = ref([]);
    let infos = ref([]);
    let homeInput = ref("");

    let deleteTeacher = async (userName, teacherId) => {
      let removedEl = teachers.value.findIndex((x, idx) => idx == teacherId);

      console.log(removedEl);

      teachers.value.splice(removedEl, 1);

      let res = await axios.delete(`${base}Teachers?userName=${userName}`, {
        headers: {
          "Content-Type": "application/json-patch+json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
    };

    onMounted(async () => {
      let teacher = await axios.get(`${base}Teachers`);

      teacher.data.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }

        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });

      teacher.data.forEach((el) => {
        teachers.value.push(el);
      });

      console.log(store.state);
    });

    let findInfo = computed(() => {
      console.log(teachers.value);
      return teachers.value.filter((list) => {
        return list.userName.toUpperCase().includes(homeInput.value.toUpperCase());
      });
    });

    return { users, deleteTeacher, teachers, store, findInfo, homeInput };
  },
};
</script>

<style lang="scss">
.card {
  transition: 0.1s linear;
  border-left: 4px solid #aab0ba !important;
  border-right: 4px solid #aab0ba !important;
  .card-header {
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
  }

  &:hover {
    transform: scale(1.01) translateX(-8px) translateY(4px);
    position: relative;
    z-index: 333;
    box-shadow: 10px -10px 5px rgb(204, 206, 205);
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
