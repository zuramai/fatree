<script setup lang="ts">
import SidebarCreate from '@/components/layouts/sidebar/SidebarCreate.vue';
import { useFamilyStore } from '@/stores/family';
import Editor from '../components/editor/Editor.vue';


import JaneDoeImg from "@/assets/images/janedoe.jpg"
import JohnDoeImg from "@/assets/images/johndoe.jpg"
import { onBeforeMount, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

// For development purpose
const family = useFamilyStore()

onBeforeMount(() => { 
    family.people = [{
        id: uuidv4(),
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
    },{
        id: uuidv4(),
        name: "John Doe",
        img: JohnDoeImg,
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
    ]
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