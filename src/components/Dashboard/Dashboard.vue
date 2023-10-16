<template>
  <div class="row g-0 m-0 p-0" style="min-height: 100vh !important">
    <div class="p-0 overflow-hidden col-2 sidebar backdrop-blur-md" style="transition: all 0.1s">
      <Navigation></Navigation>
    </div>

    <div class="col-10 p-0  relative z-50 backdrop-blur-md" style="overflow: auto; max-height: 100vh">

      
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <!-- main content -->
            <component :is="Component"></component>

            <!-- loading state -->
            <template #fallback> Loading... </template>
          </Suspense>
        </template>
      </RouterView>

      
    </div>

    <div class="shape1 absolute -z-0 top-[70%] left-[13%] rounded-full"></div>
    <div class="shape2 absolute -z-0 right-[5%]  rounded-full"></div>
    <div class="shape3 absolute -z-0 top-[-5%] left-[20%]  rounded-full"></div>
  </div>
</template>
    
<script setup >
import store from "@/store/store.js";
</script>
    
<style lang="scss" scoped>
.sidebar {
  background: #F8F9FA !important;
  
}
</style>