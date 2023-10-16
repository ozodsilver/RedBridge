<template>
  <div class="row g-0 m-0 p-0" style="min-height: 100vh !important">
    <div class="p-0 overflow-hidden col-2 sidebar" style="transition: all 0.1s">
      <Navigation></Navigation>
    </div>

    <div class="col-10 p-0" style="overflow: auto; max-height: 100vh">
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