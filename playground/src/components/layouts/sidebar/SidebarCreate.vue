<script lang="ts" setup>
import Collapse from "@/components/collapse/Collapse.vue"
import { computed, reactive, ref } from "vue";
import FamilyRow from "@/components/family/FamilyRow.vue";
import XInput from "@/components/forms/XInput.vue"
import { useFamilyStore } from "@/stores/family";



const family = useFamilyStore()
const searchPerson = ref('')
const filteredFamily = computed(() => family.filterPeople(searchPerson.value)) 

</script>
<template>
    <div class="sidebar sidebar--editor">
    <collapse title="Family" :open="true">
        <x-input size="sm" v-model="searchPerson" >
            <template #icon>
                <icon-bi-search/>
            </template>
        </x-input>
        <!-- Family lists goes here -->
        <div class="family-members mb-2">
            <family-row v-for="member in filteredFamily" 
                :image="member.img"
                :name="member.name">
            </family-row>
            <p v-if="!filteredFamily.length" class="text-center text-zinc-500">
                No person found
            </p>
        </div>
    </collapse>
    <collapse title="Shape"></collapse>
    </div>
</template>