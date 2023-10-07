<template>
  <div id="home" > 
    <nav class="m-auto glass  align-items-center py-2  px-5" style="width: 100%;  justify-content: space-between; display: flex;">
      <div class="flex items-center shadow relative top-4">
       
        <span class="p-input-icon-left absolute ">
   
    <input v-model="homeInput" placeholder="Search by username" class="rounded w-[250px] p-2 transition-all shadow outline-none  focus:scale-105  "   />
</span>
      </div>
 <p class="lead text-dark p-2 text-[12px] badge bg-white  ">Teachers</p>
         <!-- <p class="lead  p-2 badge m-0"> {{ props.name }} {{ $route.name == 'classes' ? 'Student performance': ''}}</p> -->
    </nav>
  
    <div class="row mt-6" v-if="!contentLoaded" >


<div class="col-12" >
  <div class="container px-5" >
  

 
      <div class="row">
        <div class="col-6" v-for="(teacher, index) in findInfo" :key="teacher.id">
          <div
            class="card mt-4 border border-top-0 border-light"
            v-if="teachers.length >= 1"
          >
            <div class="card-header glass text-white ">
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
                  colors="primary:#495076,secondary:#495076"
                  style="width: 30px; height: 30px"
                >
                </lord-icon>
                Username:
                {{ teacher.userName }}
              </div>

              <lord-icon
                src="https://cdn.lordicon.com/tntmaygd.json"
                trigger="hover"
                style="width: 30px; height: 30px; cursor: pointer"
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
</div>



    </div>

    <div role="status" class="absolute left-[50%] top-[50%] translate-x-[-50%]" v-if="contentLoaded">
    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

    <router-link
      to="/addTeachers"
      class="position-fixed bg-gradient d-flex align-items-center gap-3 "
    style="bottom: 20px; right: 20px; width: 200px; z-index: 111111111111;"
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

    const contentLoaded = ref(true)

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

      if(teacher.data){
        contentLoaded.value = false
      }

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

    return { users, deleteTeacher, teachers, store, findInfo, homeInput, contentLoaded };
  },
};
</script>

<style lang="scss">
.card {
  transition: 0.1s linear;
  border-left: 4px solid #495076 !important;
  border-right: 4px solid #495076 !important;
  border-bottom: 1px solid #495076 !important;
  .card-header {
    border-top-left-radius: 4px !important;
    border-top-right-radius: 4px !important;
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


::placeholder
{
font-size: 14px;
}
</style>
