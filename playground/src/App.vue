<script setup lang="ts">
import {  RouterView } from 'vue-router'
import Sidebar from "@/components/layouts/sidebar/Sidebar.vue"
import { provide } from 'vue';
import { createFatree } from './app';
import { useAppStore } from './stores/app';

const app = useAppStore()


</script>

<template>
  <div id="page-wrapper">
    <aside>
      <sidebar/>
    </aside>
  
    <router-view />
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/layouts/main";
</style>