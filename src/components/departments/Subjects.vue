<template>
    <div>
       <Nav :Subjects = 'category'></Nav>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import Nav from '../MiniComponents/Navigation.vue'

let category = ref('Subjects')


</script>

<style lang="scss" scoped>

</style>