<script lang="ts" setup>
import Avatar from "../avatar/Avatar.vue";
const props = defineProps({
    name: String,
    image: String
})
</script>
<template>
    <div class="family-row | flex px-5 py-2 items-center hover:bg-gray-100 hover:cursor-pointer">
        <avatar :src="image" size="xs" class="mr-2"/>
        <span class="font-medium leading-7">{{ name }}</span>
    </div>
</template>
<style lang="scss">
</style>