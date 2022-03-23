<script lang="ts" setup>
import Collapse from "@/components/collapse/Collapse.vue"
import { ref } from "vue";
import FamilyRow from "@/components/family/FamilyRow.vue";
import JaneDoeImg from "@/assets/images/janedoe.jpg"
import JohnDoeImg from "@/assets/images/johndoe.jpg"
import XInput from "@/components/forms/XInput.vue"


let familyMembers = ref([
    {
        name: "Jane Doe",
        img: JaneDoeImg
    },
    {
        name: "John Doe",
        img: JohnDoeImg
    }
])
</script>
<template>
    <div class="sidebar sidebar--editor">
    <collapse title="Family" :open="true">
        <x-input size="sm">
            <template #icon>
                <icon-bi-search/>
            </template>
        </x-input>

        <!-- Family lists goes here -->
        <div class="family-members mb-2">
            <family-row v-for="member in familyMembers" 
                :image="member.img"
                :name="member.name">
            </family-row>
        </div>
    </collapse>
    <collapse title="Shape"></collapse>
    </div>
</template>