<script setup lang="ts">
import {  RouterView } from 'vue-router'
import Sidebar from "@/components/layouts/sidebar/Sidebar.vue"
import { getCurrentInstance, provide } from 'vue';
import { createFatree } from './app';
import { useAppStore } from './stores/app';
import { render } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';

const app = useAppStore().fatree
const c = getCurrentInstance()
let $toast = c?.appContext.config.globalProperties.$toast

const pageWrapper = ref<HTMLDivElement | null>(null)

// onMounted(() => {
//   pageWrapper.value?.addEventListener('click', () => {
//     let toast = $toast({text:"anjir", bg: 'white', textAlign: 'center'})
//   })
// })
</script>

<template>
  <div id="page-wrapper" ref="pageWrapper">
    <aside>
      <sidebar/>
    </aside>
  
    <router-view />
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/layouts/main";
</style>