<script setup lang="ts">
import SidebarCreate from '@/components/layouts/sidebar/SidebarCreate.vue';
import { useFamilyStore } from '@/stores/family';
import Editor from '../components/editor/Editor.vue';


import JaneDoeImg from "@/assets/images/janedoe.jpg"
import JohnDoeImg from "@/assets/images/johndoe.jpg"
import AnakImg from "@/assets/images/anak.png"
import { onBeforeMount, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

// For development purpose
const family = useFamilyStore()

let ids = [uuidv4(), uuidv4(), uuidv4()]
onBeforeMount(() => { 
    family.people = {
        [ids[0]]:{
            id: ids[0],
            type: "person",
            name: "Jane Doe",
            img: JaneDoeImg,
            position: {
                x: 700,
                y: 300
            },
            styles: {
                imageSize: { width: 75, height:75 },
            },
            state: {
                isActive: false,
                isDragging: false,
                isHovered: false 
            }
        },
        [ids[1]]: {
            id: ids[1],
            name: "John Doe",
            img: JohnDoeImg,
            type: "person",
            position: {
                x: 300,
                y: 300
            },
            styles: {
                imageSize: { width: 75, height:75 },
            },
            state: {
                isActive: false,
                isDragging: false,
                isHovered: false 
            }
        },
        [ids[2]]: {
            id: ids[2],
            name: "Anak",
            img: AnakImg,
            type: "person",
            position: {
                x: 500,
                y: 600
            },
            styles: {
                imageSize: { width: 75, height:75 },
            },
            state: {
                isActive: false,
                isDragging: false,
                isHovered: false 
            }
        },
    }
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