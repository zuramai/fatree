<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from "@/components/Sidebar.vue"
</script>

<template>
  
  <header>
    <Sidebar/>
  </header>

  <RouterView />
</template>
