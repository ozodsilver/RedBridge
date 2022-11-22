<template>
    <div>
       <Nav :grades = 'grades'></Nav>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import Nav from '../MiniComponents/Navigation.vue'

let grades = ref('Grades')


</script>

<style lang="scss" scoped>

</style>