<template>
    <div>
       

        <div class="row g-0 mt-5">
<div class="col-4"  v-for="info in infos " :key="info.id">

  <button class="mt-10 p-3 bg-primary d-flex justify-content-center align-items-center">
       
       {{ info.name }} 
         <!-- <router-link :to="{ name: 'ForSubjects', params: { id: info.id } }"
                 class="btn w-50 btn-outline-secondary">Subjects</router-link> -->
       </button>
</div>
        </div>

       
    </div>
</template>

<script setup>
import Navigation from '../../MiniComponents/Navigation.vue';
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {useRoute,useRouter} from 'vue-router'

const infos = ref([])

const selectedDate = ref(null);

const route = useRoute()
const router = useRouter()

const id = route.params.id

onMounted(async () => {
  await axios
    .get(
      `${base}Subjects/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
    .then((res) => {
       console.log(res.data);
       infos.value.push(...res.data)
    });


});




const handleDate = (modelData) => {
  selectedDate.value = modelData;
  // do something else with the data
  router.push({'name':'historyTable', params:{id:id}, query:{value:new Date(selectedDate.value).toJSON( )}})
}


</script>

<style lang="scss" scoped></style>