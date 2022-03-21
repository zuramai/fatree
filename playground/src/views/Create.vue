<script setup lang="ts">
import SidebarCreate from '@/components/layouts/sidebar/SidebarCreate.vue';
import Editor from '../components/editor/Editor.vue';
</script>

<template>
    <main id="page-create">
        <sidebar-create></sidebar-create>

        <Editor/>
    </main>
</template>
<style lang="scss">
@import "@/assets/scss/pages/create";
</style>