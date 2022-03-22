<script lang="ts" setup>
const props = defineProps({
    src: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "Image"
    },
    size: {
        type: String,
        default: "md",
        validate(val: string) {
            return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val);
        }
    }
})

const sizes: {[key:string]: string} = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
}
</script>
<template>
    <div class="avatar-wrapper | inline-block">
        <img :src="src" :alt="`Image for ${name}`" :class="{[sizes[size]]: true, ['avatar avatar-'+size]: true}">
    </div>
</template>