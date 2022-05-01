<script setup lang="ts">
import SidebarCreate from '@/components/layouts/sidebar/SidebarCreate.vue';
import Editor from '../components/editor/Editor.vue';
import JohnDoeImg from "@/assets/images/johndoe.jpg"
import { useAppStore } from '@/stores/app';
import { ConnectionAs } from '@/@types/family';
import { onMounted } from 'vue';

// For development purpose
const app = useAppStore().fatree

let xina = app.people.addPerson({
    name: "John Xina",
    location: {x: 600, y: 500},
    photo: JohnDoeImg,
})
let wok = app.people.addPerson({
    name: "The Wok",
    location: {x: 400, y: 200},
    photo: "https://i.kym-cdn.com/photos/images/original/002/229/102/5c5.jpg",
})

onMounted(() => {
    app.connectPeople(xina, wok, ConnectionAs.SPOUSE)
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