<script setup lang="ts">

const props = defineProps({
    withIcon: {
        type: Boolean,
        default: false
    },
    to: {
        default: null,
        type: [String, Object]  
    },
    color: {
        default: "primary",
        type: String,
    },
    rounded: {
        default: "md",
        type: String,
    },
    size: {
        default: "md",
        type: String,
    },
})

let buttonClasses = {
    "btn inline-block": true,
    ["btn--"+props.color]: true,
    ["btn--"+props.size]: true,
    [`rounded-${props.rounded}`]: true
}

let componentName = !!props.to ? "router-link" : "button"
</script>
<template>
    <component :is="componentName" :to="to" :class="buttonClasses">
        <div class="flex items-center">
            <slot name="icon"></slot>
            <span :class="{'ml-2': withIcon}"><slot></slot></span>
        </div>
    </component>
</template>
