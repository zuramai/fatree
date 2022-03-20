<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from "@/components/layouts/sidebar/Sidebar.vue"
</script>

<template>
  <div id="page-wrapper">
    <aside>
      <Sidebar/>
    </aside>
  
    <RouterView />
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/layouts/main";
</style>