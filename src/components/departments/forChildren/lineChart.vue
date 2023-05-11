<template>
  <LineChart :chartData="testData" />

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import store from "../../../store/store.js";

Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  components: { LineChart },
  setup() {
    
    const testData = {
      labels:[2,3,2,3,4,5],
      datasets: [
        {
          data: [20, 40, 60, 70, 5],
          backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
        },
      ],
    };

    return { testData, store };
  },
});
</script>
