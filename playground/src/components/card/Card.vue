<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: "No title"
    },
    description: {
        type: String
    }
})

</script>
<template>
    <div class="card shadow-xl rounded-lg">
        <div class="card__image bg-slate-200 aspect-video rounded-t-lg"></div>
        <div class="card__body bg-white p-5 rounded-b-lg">
            <h4 class="card__title text-xl mb-2">{{ title }}</h4>
            <p class="card__desc text-slate-500">
                {{ description }}
            </p>
        </div>
    </div>
</template>