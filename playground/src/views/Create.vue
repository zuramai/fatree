<script setup lang="ts">
import SidebarCreate from '@/components/layouts/sidebar/SidebarCreate.vue';
import { useFamilyStore } from '@/stores/family';
import Editor from '../components/editor/Editor.vue';


import JaneDoeImg from "@/assets/images/janedoe.jpg"
import JohnDoeImg from "@/assets/images/johndoe.jpg"
import AnakImg from "@/assets/images/anak.png"
import { inject, onBeforeMount, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Fatree } from '@/app';
import { useAppStore } from '@/stores/app';

// For development purpose
const appStore = useAppStore()
const app = appStore.fatree

app.people.addPerson({
    name: "John Xina",
    location: {x: 300, y: 300},
    photo: JohnDoeImg,
})

let ids = [uuidv4(), uuidv4(), uuidv4()]
onBeforeMount(() => { 
 
})


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