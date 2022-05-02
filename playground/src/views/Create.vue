<script setup lang="ts">
import SidebarCreate from '@/components/layouts/sidebar/SidebarCreate.vue';
import Editor from '../components/editor/Editor.vue';
import LoidPNG from "@/assets/images/loid.png"
import AnyaJPG from "@/assets/images/anya.jpg"
import YorWEBP from "@/assets/images/yor.webp"
import { useAppStore } from '@/stores/app';
import { ConnectionAs } from '@/@types/family';
import { onMounted } from 'vue';

// For development purpose
const app = useAppStore().fatree

let loid = app.people.addPerson({
    name: "Loid Forger",
    location: {x: 600, y: 300},
    photo: LoidPNG,
})
let yor = app.people.addPerson({
    name: "Yor",
    location: {x: 200, y: 300},
    photo: YorWEBP,
})
let anya = app.people.addPerson({
    name: "Anya",
    location: {x: 400, y: 600},
    photo: AnyaJPG,
})

onMounted(() => {
    app.connectPeople(ConnectionAs.PARENT, loid, anya)
    app.connectPeople(ConnectionAs.PARENT, yor, anya)
    app.connectPeople(ConnectionAs.SPOUSE, loid, yor)
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