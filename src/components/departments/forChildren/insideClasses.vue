<template>

  <div class="px-[30px]" v-if="!noContent">
    <button class="btn  text-dark gap-3 flex shadow-none items-center justify-center p-2.5 px-5 rounded-lg  my-4" @click="this.$router.go(-1)">
      <i class="far fa-circle-left text-lg"></i> back
    </button>

    <div class="table-responsive">
      <table class="table table-striped table-hover mt-4 ">
      <tr class="fw-bolder">
        <th scope="col">#</th>
        <th scope="col" v-for="subject in subjects" :key="subject.id" class="text-dark pl-6 capitalize">
          {{ subject.name }}
        </th>
      </tr>

      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td class="capitalize">
            {{ student.firstName }}
          </td>

          <td v-for="subject in subjects" :key="subject.id">
            <button :disabled="scores.length == 0" @click="toggleModal(scores.find(
              (el) => el.subjectId == subject.id && el.studentId == student.id
            ))" class="w-[50px] h-[50px] rounded position-relative text-white" :class="{
  'bg-danger':
    scores.find(
      (el) => el.subjectId == subject.id && el.studentId == student.id
    )?.procentage <= 75
      ? true
      : false,
  'bg-warning':
    scores.find(
      (el) => el.subjectId == subject.id && el.studentId == student.id
    )?.procentage >= 76 &&
      scores.find(
        (el) => el.subjectId == subject.id && el.studentId == student.id
      )?.procentage < 80
      ? true
      : false,
  'bg-success':
    scores.find(
      (el) => el.subjectId == subject.id && el.studentId == student.id
    )?.procentage >= 80 &&
      scores.find(
        (el) => el.subjectId == subject.id && el.studentId == student.id
      )?.procentage <= 100
      ? true
      : false,
}">
              {{
                scores.find(
                  (el) => el.subjectId == subject.id && el.studentId == student.id
                )?.totalScore
              }}

              <button class="badge bg-info position-absolute" style="top: 0" >
                {{
                  scores.find(
                    (el) => el.subjectId == subject.id && el.studentId == student.id
                  )?.procentage + "%"
                }}
              </button>
            </button>

     
          </td>
        </tr>
      </tbody>
    </table>
    </div>




  </div>

  <div v-else>
    <n-result status="error" title="Warning" description="data for this class is not available" class="absolute left-[50%] top-[40%] translate-x-[-50%]">
    <template #footer>
  
    </template>
  </n-result>
</div>

  <div role="status" class="absolute left-[50%] top-[50%] translate-x-[-50%]" v-if="contentLoaded">
    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>


<n-modal v-model:show="showModal" @hide = 'closeModal' preset="card"  >
              <n-card style="width: 99vw; height: 90vh;" title="Information"  role="dialog"
                aria-modal="true">
         

                <Chart type="line" :data="chartData" :options="chartOptions"  />


              </n-card>

         
            </n-modal>

</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import store from "../../../store/store.js";
import base from "../../../reusables/getInfos.js";
import Chart from 'primevue/chart';


let students = ref([]);
let subjects = ref([]);
let scores = ref([]);
const route = useRoute();
const showModal = ref(false);
// loader
const contentLoaded = ref(true)
// no content
const noContent = ref(false)

const data = ref()
const compiedData = ref([])

const dates = ref([])
const dataset1 = ref([])
const dataset2 = ref([])

let toggleModal = (scores) => {
  showModal.value = true;

  store.state.info = scores
  console.log(scores.charts);
  data.value = scores.charts

  
  scores.charts.forEach(el =>{
  dates.value.push(((new Date(el.date)).toLocaleDateString() + ' ' +  (new Date(el.date)).toLocaleTimeString() ) )
  })


  scores.charts.forEach(el =>{
    dataset1.value.push(el.score)
  })

  scores.charts.forEach(el =>{
    dataset2.value.push(el.homeWork)
  })



}



onMounted(() => {
watchEffect(()=>{
  chartData.value = setChartData();
    chartOptions.value = setChartOptions();
})
});

const chartData = ref();
const chartOptions = ref();
        
const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: dates.value,
        datasets: [
            {
                label: 'Score',
                data: dataset1.value,
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.5
            },
            {
                label: 'Homework',
                data:dataset2.value,
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.5
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}








onMounted(async () => {
  let student = await axios.get(
    `${base}Admin/Journal/ClassInfo?id=${route.params.id}`,  {
    
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
});
  console.log(student.data.students.length);
  if(student.data.students.length == 0){
      noContent.value = true
    }

  student.data.students.forEach((stud) => {
    students.value.push(stud);
   
  });

  console.log(student);
  contentLoaded.value = false

  let sub = await axios.get(
    `${base}Admin/Journal/ClassInfo?id=${route.params.id}`, {
    
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
});
  console.log(sub.data);

  sub.data.subjects.forEach((subj) => {
    subjects.value.push(subj);
  });
  console.log(subjects.value);

  students.value.forEach(async (x) => {
    subjects.value.forEach(async (p) => {
      let score = await axios.get(
        `${base}Admin/Journal/GetScore?studentId=${x.id
        }&subjectId=${p.id}`,  {
    
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
});

      scores.value.push(score.data);
    });
  });
});

const closeModal = (event)=>{
if(event == false)
dates.value = []
dataset1.value = []
dataset2.value = []
}


</script>

<style lang="scss" scoped>

:deep .p-chart {
width: 300vw;
height: 700px;
overflow: auto !important;
}

canvas{
overflow: auto !important;
}

:global(.n-card > .n-card__content) {
    overflow: auto !important;
}

</style>
