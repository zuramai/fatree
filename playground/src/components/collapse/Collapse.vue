<script setup lang="ts">
import IconChevronDown from "~icons/carbon/chevron-down"
import IconChevronUp from "~icons/carbon/chevron-up"
import { ref } from 'vue';

const props = defineProps({
    title: String,
})
const emit = defineEmits(["click"])

let isOpen = ref(false)

function toggleCollapse() {
    isOpen.value = !isOpen.value
    emit("click")
}

</script>
<template>
    <div class="collapse">
        <div class="collapse__title | flex justify-between items-center" @click="toggleCollapse">
            <span>{{ title }}</span>
            <component :is="isOpen ? IconChevronUp : IconChevronDown"/>
        </div>
        <div class="collapse__content" v-if="isOpen">
            <slot></slot>
        </div>
    </div>
</template>