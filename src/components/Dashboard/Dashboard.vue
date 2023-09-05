<template>
        
    <div class="row" style="min-height: 100vh !important;">
<div class=" p-0 " style="transition:all 0.1s; border-right: 2px solid rgba(51, 51, 90, 0.4);" :class="{'col-1':store.state.showFullSidebar, }">
    <Navigation></Navigation>
</div>

<div class="col-10 p-0 "  style="overflow: auto; max-height: 100vh;" :class="{'col-11':store.state.showFullSidebar}">
 
    <RouterView v-slot="{ Component }">
  <template v-if="Component">
  
    
        <Suspense>
          <!-- main content -->
          <component :is="Component" ></component>

          <!-- loading state -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
    
    
  </template>
</RouterView>

</div>
    </div>
      
</template>
    
<script setup >
 import store from '@/store/store.js';

 
</script>
    
<style lang="scss" scoped>
    
    

</style>