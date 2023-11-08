<template>
    <div>
  
        <n-table :bordered="false" :single-line="false" class="mt-4">
    <thead>
      <tr>
        <th>№</th>
        <th>Student name</th>
        <th>Attendance</th>
        <th>D/Z</th>
        <th>Point</th>
        <th>discipline</th>
      </tr>

      
    </thead>
    <tbody>
      <tr v-for="(student, index) in students" :key="student.id">
        <td>{{ index }}</td>
        <td>
         
     {{ student.student.firstName }}
     {{ student.student.lastName }}
        
        </td>
        <td> 
        
        
        </td>
        <td class="text-center">

          <span class="p-2 rounded-lg bg-green-500 text-white block text-center" v-if="student.homeWork">{{ student.homeWork }}</span>
          <span class="p-2 rounded-lg bg-red-300 text-white  text-center flex flex-col " v-else> <span class="fas fa-ban fa-2x text-white"></span>   <span  class="text-xs">no grade</span> </span>
        

        </td>
        <td>Damn it! I can't remember those words.</td>
        <td>  <span class="p-2 text-white bg-green-400 rounded-lg">{{ student.point }} %</span> </td>
      </tr>
     
      
    </tbody>
  </n-table>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import {ref, onMounted, computed} from 'vue'
import axios from 'axios';

import {useRoute} from 'vue-router';
import { get } from '@vueuse/core';
const route = useRoute()

const students = ref([])
const subjects = ref([])

const result = ref([])


onMounted(async () => {
  try {
    const response = await axios.get(`https://rb.algorithmic.uz/api/DailyProccess/${route.query.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    students.value = response.data.students;
    students.value.forEach((el,idx) =>{
    console.log(el.student.id);

    axios.get(`https://rb.algorithmic.uz/api/Discipline/${route.params.id}/${el.student.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(res =>{
    console.log(res.data);
    students.value[idx].point = res.data
    })
    
    })
  } catch (error) {
    console.error(error);
  }
});


</script>

<style lang="scss">

</style>