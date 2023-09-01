<template>
    <div>
        {{ route.params }} {{ route.query }}
    </div>
</template>

<script setup>
import {useRoute} from 'vue-router'


const route = useRoute()
</script>

<style lang="scss" scoped>


</style>