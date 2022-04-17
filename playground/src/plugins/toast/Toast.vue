
<script setup lang="ts">import { onMounted } from 'vue';
import type { ToastProps } from './toast';


const props = defineProps<ToastProps>()
onMounted(() => {
    console.log("Toast mounted!", props.text)
})
</script>
<template>
        <div :class="{'toast':true, [`toast--${position} toast--${bg} text-${props.textAlign}`]:true}" 
            v-html="text">
        </div>
</template>
<style>
.toast {
    min-width: 200px;
    max-width: 300px;
    border-radius: .4rem;
    padding: .5rem .7rem;
    position: absolute;
    animation: moveIn .5s ease-out;
}
.toast--top-center {
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
}
.toast--primary {
    background-color: var(--color-primary);
    color: white;
}
.toast--white {
    background-color: #fff;
    color: #333;
    @apply shadow-lg border;
}
@keyframes moveIn {
    0% {
        opacity: 0;
        translate: 0 -1rem;
    }
    100% {
        translate: 0 0;
        opacity: 1;
    }
}
</style>