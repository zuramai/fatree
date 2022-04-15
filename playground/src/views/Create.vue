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

// For development purpose
const family = useFamilyStore()
const app = inject<Fatree>("app")!

app.people.addPerson({
    name: "Saugi",
    location: {x: 0, y: 0},
    photo: JaneDoeImg,
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