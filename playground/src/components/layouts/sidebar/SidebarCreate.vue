<script lang="ts" setup>
import Collapse from "@/components/collapse/Collapse.vue"
import { computed, reactive, ref } from "vue";
import FamilyRow from "@/components/family/FamilyRow.vue";
import XInput from "@/components/forms/XInput.vue"
import { useFamilyStore } from "@/stores/family";
import XButton from "../../button/XButton.vue";
import XModal from "../../modal/XModal.vue";
import type { Person } from "@/types/family";
import { readImage } from "@/utils"

const family = useFamilyStore()
const searchPerson = ref('')
const filteredFamily = computed(() => family.filterPeople(searchPerson.value)) 


const isModalAddOpen = ref(false)
const addPerson = reactive<Person>({
    name: '',
    img: ''
})
const executeAddPerson = () => {
    isModalAddOpen.value = false 
    console.log("added")
    family.addPerson(addPerson)
}

const onAddImageChange = (files: FileList) => {
    readImage(files)
        .then(res => addPerson.img = (res as string))
        .catch(err => console.log(err))
}

</script>
<template>
    <div class="sidebar sidebar--editor">
        <!-- Collapses menu start -->
        <collapse title="Family" :open="true">
            <div class="mx-5 flex items-center gap-2 my-3">

                <!-- Search form -->
                <x-input size="sm" v-model="searchPerson" :with-icon="true" placeholder="Search person..">
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
        <template #modal-body>
            <x-input size="md" label="Name" v-model="addPerson.name"></x-input>
            <x-input size="md" label="Photo" type="file" @change="onAddImageChange"></x-input>
            <div v-if="addPerson.img" class="mt-2">
                <p>Image preview:</p>
                <img :src="addPerson.img" :alt="`Photo preview for ${addPerson.name}`" class="w-32 h-32">
            </div>
        </template>        
        <template #modal-footer>
            <div class="flex justify-end">
                <x-button class="mr-2" @click="executeAddPerson">Add</x-button>
                <x-button color="secondary" @click="isModalAddOpen=false">Close</x-button>
            </div>
        </template>        
    </x-modal>
</template>