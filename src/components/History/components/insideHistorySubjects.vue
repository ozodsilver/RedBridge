<template>
    <div>
  
<DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import {ref, onMounted} from 'vue'
import axios from 'axios';

import {useRoute} from 'vue-router';
const route = useRoute()

const subjects = ref([])

onMounted(()=>{

    axios.get(`https://rb.algorithmic.uz/api/DailyProccess/history/${route.query.id}?date=${route.query.date}&zoneInfo=UTC%2B5`,  {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(res =>{
console.log(res.data);
})

})

</script>

<style lang="scss">

</style>