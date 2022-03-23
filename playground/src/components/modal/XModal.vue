<script lang="ts" setup>import { ref } from 'vue';

defineProps({
    modelValue: Boolean
})
defineEmits(['open', 'close', 'update:modelValue'])


</script>
<template>
<Transition name="fade">
    <div class="modal-wrapper"  v-show="modelValue">
        <div class="modal-backdrop | absolute inset-0 bg-gray-700 opacity-25"
            @click="$emit('update:modelValue', false)">
        </div>
        <div class="modal" v-show="modelValue">
            <div class="modal__header | flex justify-between py-3 px-3 border-b ">
                <h1><slot name="modal-header"></slot></h1>

                <!-- Button close -->
                <a href="#" @click.prevent="$emit('update:modelValue', false)" class="ml-auto">
                    <icon-bi-x/>
                </a>
            </div>
            <div class="modal__body | p-3">
                <slot name="modal-body"></slot>
            </div>
            <div class="modal__footer | border-t p-3">
                <slot name="modal-footer"></slot>
            </div>
        </div>
    </div>
</Transition>
</template>

<style lang="scss">
@import "@/assets/scss/components/modal";
</style>