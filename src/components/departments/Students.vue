<template>
    <div>
       <Nav :users = 'category'></Nav>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import Nav from '../MiniComponents/Navigation.vue'

let category = ref('Students')


</script>

<style lang="scss" scoped>

</style>