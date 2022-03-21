<script lang="ts" setup>
import Collapse from "@/components/collapse/Collapse.vue"
import { ref } from "vue";
import FamilyRow from "../../family/FamilyRow.vue";
import JaneDoeImg from "@/assets/images/janedoe.jpg"


let familyMembers = ref([
    {
        name: "Jane Doe",
    },
    {
        name: "Jane Doe",
    },
    {
        name: "Jane Doe",
    },
])
</script>
<template>
    <div class="sidebar sidebar--editor">
    <collapse title="Family">
        <!-- Family lists goes here -->
        <div class="family-members">
            <FamilyRow v-for="member in familyMembers" 
                :image="JaneDoeImg"
                :name="member.name">
            </FamilyRow>
        </div>
    </collapse>
    <collapse title="Shape"></collapse>
    </div>
</template>