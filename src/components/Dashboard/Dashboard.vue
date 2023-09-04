<template>
        
    <div class="row" style="min-height: 100vh !important;">
<div class=" shadow  glass p-0 " style="transition:all 0.1s" :class="{'col-1':store.state.showFullSidebar, 'col-2':!store.state.showFullSidebar}">
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
    
    .glass{
        backdrop-filter: blur(19px) saturate(180%);
    -webkit-backdrop-filter: blur(19px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.36);
   

    }

</style>