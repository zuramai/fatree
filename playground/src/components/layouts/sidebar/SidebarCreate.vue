<script lang="ts" setup>
import Collapse from "@/components/collapse/Collapse.vue"
import { computed, reactive, ref } from "vue";
import FamilyRow from "@/components/family/FamilyRow.vue";
import XInput from "@/components/forms/XInput.vue"
import { useFamilyStore } from "@/stores/family";
import XButton from "../../button/XButton.vue";
import XModal from "../../modal/XModal.vue";



const family = useFamilyStore()
const searchPerson = ref('')
const filteredFamily = computed(() => family.filterPeople(searchPerson.value)) 

const isModalAddOpen = ref(true)

</script>
<template>
    <div class="sidebar sidebar--editor">
        <!-- Collapses menu start -->
        <collapse title="Family" :open="true">
            <div class="mx-5 flex items-center gap-2 my-3">

                <!-- Search form -->
                <x-input size="sm" v-model="searchPerson" placeholder="Search person..">
                    <template #icon>
                        <icon-bi-search/>
                    </template>
                </x-input>

                <!-- Toggle add modal -->
                <x-button size="md" @click="isModalAddOpen=true">Add</x-button>
                

            </div>

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


    <!-- Modals -->
    <!-- Modal add -->
    <x-modal v-model="isModalAddOpen">
        <template #modal-header>
            Add person
        </template>        
        <template #modal-footer>
            <div class="flex justify-end">
                <x-button class="mr-2">Add</x-button>
                <x-button color="secondary" @click="isModalAddOpen=false">Close</x-button>
            </div>
        </template>        
    </x-modal>
</template>