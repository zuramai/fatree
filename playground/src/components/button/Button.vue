<script setup lang="ts">
const props = defineProps({
    to: {
        default: null,
        type: [String, Object]  
    },
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
    "btn rounded-full inline-block": true,
    ["btn--"+props.color]: true,
    ["btn--"+props.size]: true
}

let componentName = !!props.to ? "router-link" : "button"
</script>
<template>
    <component :is="componentName" :to="to" :class="buttonClasses">
        <div class="flex items-center">
            <slot name="icon" ></slot>
            <span class="ml-2"><slot></slot></span>
        </div>
    </component>
</template>
