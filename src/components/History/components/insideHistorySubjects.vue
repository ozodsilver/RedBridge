<template>
    <div>

      <div class="spinner spinner-border absolute left-2/4 top-2/4" v-if="isLoaded">

      </div>
  
        <n-table :bordered="false" :single-line="false" class="mt-4" v-if="!isLoaded">
    <thead>
      <tr class="text-center">
        <th>№</th>
        <th>Student name</th>
        <th>Attendance</th>
        <th>Home work</th>
        <th>Point</th>
        <th>discipline</th>
      </tr>

      
    </thead>
    <tbody>
      <tr v-for="(student, index) in students" :key="student.id" class="text-center">
        <td>{{ ++index }}</td>
        <td>
         
     {{ student.student.firstName }}
     {{ student.student.lastName }}
        
        </td>
        <td> 
<div class="flex gap-3 items-center justify-center">

  <span class="p-2 bg-primary bg-gradient rounded-lg text-white"  v-if="student?.attendance?.isHere" > 
            there is
          </span>
  <span class="p-2 bg-primary bg-gradient rounded-lg text-white"  v-if="student?.attendance?.isHere == false && student?.attendance?.reason == 0">
    Absend for unexcused reasons
          </span>
  <span class="p-2 bg-primary bg-gradient rounded-lg text-white"  v-if="student?.attendance?.isHere == false && student?.attendance?.reason == 1">
    present for valid reasons
          </span>
  <span class="p-2 bg-primary bg-gradient rounded-lg text-white"  v-if="student?.attendance == null">
   null
          </span>

<span class="p-2 px-4 bg-green-400 bg-gradient rounded-lg text-white">
  {{ student.attandceBro }} %
</span>
</div>
        
        </td>
        <td class="text-center">

          <span class="p-2 rounded-lg bg-green-400 text-white block text-center" v-if="student.homeWork">{{ student.homeWork }}</span>
          <span class="p-2 rounded-lg bg-red-300 text-white  text-center flex flex-col " v-else> <span class="fas fa-ban fa-2x text-white"></span>   </span>
        

        </td>
        <td>
        <div class="flex gap-2 items-center justify-center">
          <div>

<span class="p-2 px-4 bg-red-300 bg-gradient text-white rounded-lg"   v-if="student.dailyScore == null" v-tooltip.top="'Daily Score'"> <span class="fas fa-ban"></span></span>
<span class="p-2 px-4 bg-red-400 bg-gradient text-white rounded-lg" v-else-if="student.dailyScore <= 0" v-tooltip.top="'Daily Score'">{{ student.dailyScore }}</span>
<span class="p-2 px-4 bg-yellow-400 bg-gradient text-white rounded-lg" v-else-if="student.dailyScore == 0" v-tooltip.top="'Daily Score'">{{ student.dailyScore }}</span>
<span class="p-2 px-4 bg-green-400 bg-gradient text-white rounded-lg" v-else v-tooltip.top="'Daily Score'">{{ student.dailyScore }}</span>
</div>

<div>

  <span class="p-2 px-3 bg-red-400 bg-gradient rounded-lg text-white" v-if=" student.totalBalls?.score < 75"  v-tooltip="'Total Score'">
    {{ student?.totalBalls?.score }}
    <i class="fas fa-coins"></i>
  </span>

  <span class="p-2 px-3 bg-yellow-400 bg-gradient rounded-lg text-white" v-else-if=" student?.totalBalls?.score >= 75 &&  student?.totalBalls?.score < 95" >
    {{ student?.totalBalls?.score }}
    <i class="fas fa-coins"></i>
  </span>

  <span class="p-2 px-3 bg-green-400 bg-gradient rounded-lg text-white" v-else>
    {{ student?.totalBalls?.score }}
    <i class="fas fa-coins"></i>
  </span>

</div>
        </div>
         
        </td>
        <td>  
          <span class="p-2 text-white bg-red-400 bg-gradient rounded-lg" v-if="student.point < 75" v-tooltip.bottom="'the student is behavior is in the calculation of interest'">  {{ student.point }} %  </span> 
          <span class="p-2 text-white bg-yellow-400 bg-gradient rounded-lg" v-else-if="student.point >= 75 && student.point < 95"  v-tooltip.bottom="'the student is behavior is in the calculation of interest'">  {{ student.point }} %  </span> 
          <span class="p-2 text-white bg-green-400 bg-gradient rounded-lg" v-else  v-tooltip.bottom="'the student is behavior is in the calculation of interest'">  {{ student.point }} %  </span> 
        </td>
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

const isLoaded = ref(true)

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

    if(response.data){
      isLoaded.value = false
    }

    students.value = response.data.students;
    students.value.forEach((el,idx) =>{
    console.log(el.student.id);


    // dailyScore
    axios.get(`https://rb.algorithmic.uz/api/Discipline/${route.params.id}/${el.student.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(res =>{
    console.log(res.data);
    students.value[idx].point = res.data
    })

    // totalBalls
    axios.get(`https://rb.algorithmic.uz/api/Students/SubjectScore/${route.params.id}/${el.student.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(res =>{
    console.log(res.data);
    students.value[idx].totalBalls = res.data
    })



    // attendance
     // totalBalls
     axios.get(`https://rb.algorithmic.uz/api/Students/SubjectAttendance/${route.params.id}/${el.student.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(res =>{
    console.log(res.data);
    students.value[idx].attandceBro = res.data
    })
    
    })
  } catch (error) {
    console.error(error);
  }
});


</script>

<style lang="scss">

</style>