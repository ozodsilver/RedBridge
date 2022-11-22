<template>
    <div id="home">
 <Nav :userlar = 'users'></Nav>


<div class="container">
 
</div>


    </div>
</template>

<script >
import Nav from '../components/MiniComponents/Navigation.vue'
import { ref } from 'vue'
export default {
  
components:{
Nav
},

  setup(){
  
    let users = ref('Teachers')

    return{users}
  }
}
</script>


<style lang="scss">
    
</style>