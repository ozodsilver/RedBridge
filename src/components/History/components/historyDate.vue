<template>
  <div>
    <div v-if="customers.length == 0">
      <n-result
    
        status="warning"
        title="Warning"
        description="No information found"
        class="absolute left-2/4 top-2/4"
      >
      </n-result>
    </div>

    <div v-if="customers.length !== 0">
      <h1 class="m-3 text-2xl">Date</h1>
      <DataTable
       :value="customers"
        tableStyle="min-width: 50rem"
      >
        <Column style="width: 100%">
          <template #body="slotProps">
            <router-link
              :to="{
                name: 'historySubjects',
                query: { id: slotProps.data.id },
              }"
              class="bg-slate-200 block w-full p-2 rounded-lg px-4"
            >
              {{ new Date(slotProps.data.date).toLocaleDateString() }}
              {{ new Date(slotProps.data.date).toLocaleTimeString() }}
            </router-link>
          </template>
        </Column>


        <template #footer>
       <div class="flex justify-end">
        <fwb-pagination v-model="first" :total-pages="totalPage" large></fwb-pagination>
       </div>
        </template>


      </DataTable>


    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, watchEffect } from "vue";
import { FwbPagination } from 'flowbite-vue'
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional

import { useRouter, useRoute } from "vue-router";

const customers = ref([]);
const route = useRoute();

const first = ref(1)
const totalPage = ref(null)

onMounted(() => {
 watchEffect(()=>{
  axios
    .get(
      `https://rb.algorithmic.uz/api/Admin/Journal/History?subjectId=${route.params.id}&size=10&page=${first.value}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data.toatalPages);
      customers.value = res.data.data;
      totalPage.value = res.data.toatalPages
    });
})
});
</script>

<style lang="scss" scoped>
:global(tr) {
  background: transparent !important;
}

:global(td) {
  background: transparent !important;
}

:global(.p-datatable .p-datatable-footer) {
    background: transparent !important;
}




:deep .dark\:hover\:text-white:hover {
    --tw-text-opacity: 1;
    color: black !important;
}
</style>