<template>
  <div>
    <Navigation classess="classess"></Navigation>
    <div class="container">
      <div class="row mt-4">
        <div class="col-3" v-for="info in infos" :key="info.id">
          <routerLink
            :to="{ name: 'insideClasses', params: { id: info.id } }"
            class="btn btn-dark opacity-50 mt-4 rounded shadow"
            >{{ info.name }}</routerLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navigation from "../MiniComponents/Navigation.vue";
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import base from "../../reusables/getInfos.js";
import { useRouter, useRoute } from "vue-router";

let route = useRoute();
let infos = reactive([]);

onMounted(async () => {
  let result = await axios.get(`${base}Admin/Journal/Classes`);
  console.log(result.data);
  infos.push(...result.data);

  console.log(infos);
});
</script>

<style lang="scss" scoped>
$kulrang: #a5acb7;
button {
  background: $kulrang !important;
}
</style>
