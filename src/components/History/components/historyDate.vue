<template>
    <div>


      <div v-if="customers.length == 0">
        <n-result
    status="warning"
    title="Warning"
    description="No information found"
    class="absolute left-2/4 top-2/4 "
  >

  </n-result>
      </div>



      <div  v-if="customers.length !== 0">
        <h1 class="m-3 text-2xl">Date</h1>
        <DataTable :value="customers" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          
          <Column  style="width: 100%">
          <template #body = 'slotProps'>
<router-link :to="{name:'historySubjects', query:{id:route.params.id, date:slotProps.data.date}}" class="bg-slate-200 block w-full p-2 rounded-lg px-4">

  {{  new Date(slotProps.data.date).toLocaleDateString() }}
</router-link>
          </template>
          </Column>
       
      </DataTable>
      </div>
     
    
    </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional



import {useRouter, useRoute} from 'vue-router'

const customers = ref([]);
const route = useRoute()

onMounted(()=>{

    axios.get(`https://rb.algorithmic.uz/api/Admin/Journal/History?subjectId=${route.params.id}&size=20&page=1`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(res =>{

        console.log(res.data.data);
        customers.value = res.data.data
      })

})

</script>

<style lang="scss" scoped>
:global(tr){
background: transparent !important;
}

:global(td){
background: transparent !important;
}
</style>