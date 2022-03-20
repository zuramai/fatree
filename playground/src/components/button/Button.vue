<script setup lang="ts">
const props = defineProps({
    color: {
        default: "primary",
        type: String,
    },
    size: {
        default: "md",
        type: String,
    },
})

let buttonClasses = {
    "btn rounded-full flex inline-block": true,
    ["btn--"+props.color]: true,
    ["btn--"+props.size]: true
}
</script>
<template>
    <button :class="buttonClasses">
        <slot name="icon" ></slot>
        <span class="ml-2"><slot></slot></span>
    </button>
</template>
