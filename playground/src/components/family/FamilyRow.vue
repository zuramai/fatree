<script lang="ts" setup>
const props = defineProps({
    name: String,
    image: String
})
</script>
<template>
    <div class="family-row | flex px-5 py-2 hover:bg-gray-100 hover:cursor-pointer">
        <img :src="image" :alt="`Image for ${name}`" class="avatar avatar-sm | mr-2">
        <span class="font-medium leading-7">{{ name }}</span>
    </div>
</template>
<style lang="scss">
</style>