<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    title: String,
})

let isOpen = ref(true)

</script>
<template>
    <div class="collapse">
        <div class="collapse__title" @click="$emit('click', isOpen)">
            {{ title }}
        </div>
        <div class="collapse__content">
            <slot></slot>
        </div>
    </div>
</template>