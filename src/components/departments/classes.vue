<template>
  <div>
    <Navigation classess="classess"></Navigation>
    <div class="container">
      <div class="row mt-4">
        <div class="col-3" v-for="info in infos" :key="info.id">
          <button  class="btn rounded-pill text-white" style="background: rgb(165,172,183) !important;
background: linear-gradient(90deg, rgba(165,172,183,1) 0%, rgba(251,255,254,0.9192051820728291) 74%); !important">{{ info.name }}</button>


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
import {useRouter, useRoute} from 'vue-router';


let route = useRoute()
let infos = reactive([]);

onMounted(async () => {
  let result = await axios.get(`${base}Admin/Journal/Classes`);
  console.log(result.data);
  infos.push(...result.data);

  console.log(infos);


});
</script>

<style lang="scss" scoped>
$kulrang: #A5ACB7;
button {
  background: $kulrang !important;
}
</style>
