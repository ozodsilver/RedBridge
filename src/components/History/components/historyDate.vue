<template>
    <div>
      
        <DataTable :value="customers" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          
            <Column  style="width: 100%">
            <template #body = 'slotProps'>
<router-link :to="{name:'historySubjects', params:{id:slotProps.data.id}}">
  
    {{  new Date(slotProps.data.date).toLocaleDateString() }}
</router-link>
            </template>
            </Column>
         
        </DataTable>
    
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

<style lang="scss">

</style>