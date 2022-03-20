<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from "@/components/layouts/sidebar/Sidebar.vue"
</script>

<template>
  
  <header>
    <Sidebar/>
  </header>

  <RouterView />
</template>
