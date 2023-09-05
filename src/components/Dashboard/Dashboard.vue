<template>
        
    <div class="row" style="min-height: 100vh !important;">
<div class=" p-0 overflow-hidden col-1 sidebar " style="transition:all 0.1s;" >
    <Navigation ></Navigation>
</div>

<div class="col-11 p-0 "  style="overflow: auto; max-height: 100vh;" >
 
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
    
    .sidebar{

      background: rgb(75,83,120);
background: radial-gradient(circle, rgba(75,83,120,1) 0%, rgba(50,55,83,0.9556197478991597) 100%);

  
    }

</style>