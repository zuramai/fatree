<script setup lang="ts">
import IconChevronDown from "~icons/carbon/chevron-down"
import IconChevronUp from "~icons/carbon/chevron-up"
import { onMounted, ref } from 'vue';

const props = defineProps({
    title: String,
    open: Boolean
})

let isOpen = ref(false)

function toggleCollapse() {
    isOpen.value = !isOpen.value
    emit("click")
}    
onMounted(() => {
    isOpen.value = props.open
}) 
const emit = defineEmits(["click"])



</script>
<template>
    <div :class="{'collapse': true, 'collapse--open': isOpen}">
        <div class="collapse__title | flex justify-between items-center" @click="toggleCollapse">
            <span>{{ title }}</span>
            <component :is="isOpen ? IconChevronUp : IconChevronDown"/>
        </div>
        <div class="collapse__content" v-if="isOpen">
            <slot></slot>
        </div>
    </div>
</template>