<template>
  <div>
    <!-- <h1>{{this.$route.params.id}}</h1> -->
    <div class="container p-4">
      <button
        class="btn btn-dark"
        style="width: 100px; height: 50px"
        @click="this.$router.push({ name: 'Grades' })"
      >
        <i class="fas fa-chevron-circle-left"></i>
      </button>
      <h2 class="my-4 text-secondary">Subjects</h2>
      <div class="row">
        <div
          class="col-6 mt-3"
          v-for="(subject, index) in subjects"
          :key="subject.id"
        >
          <div class="card">
            <div class="card-header">About Subjects</div>
            <div class="card-body">
              <p>
                <span class="badge bg-info">Subject:</span> {{ subject.name }}
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
                @click="deleteSubject(subject.id, index)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>

          <router-link
            :to="{ name: 'AddSubjects' }"
            class="btn btn-success position-fixed"
            style="bottom: 20px; right: 20px; width: 200px"
            >Add Subjects <i class="fas fa-plus-circle"></i
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

let route = useRoute();
let id = route.params.id;
let subjects = ref([]);
const store = useStore();

onMounted(async () => {
  let res = await axios.get(
    `https://redbridge-school.herokuapp.com/api/Subjects/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );

  res.data.forEach((el) => {
    subjects.value.push(el);
    store.state.id = id;
  });
});

let deleteSubject = async (id, index) => {
  let response = await axios.delete(
    `https://redbridge-school.herokuapp.com/api/Subjects?Id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  console.log(response);
  subjects.value.splice(index, 1);
};
</script>
<style lang="">
</style>