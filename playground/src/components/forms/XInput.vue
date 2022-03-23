<script setup lang="ts">

interface Props {
    size: "sm" | "md" | "lg" | "xl"
}
const props = defineProps<Props>()

const sizes = {
    "sm": "pl-8 pr-4 py-1",
    "md": "pl-10 pr-4 py-2",
    "lg": "pl-12 pr-6 py-3",
    "xl": "pl-14 pr-7 py-4",
}

</script>
<template>
    <div class="form-group">
        <div class="form-input | mx-5 mb-2 mt-3">
            <input type="text" :class="{'form__control | border-stone-300 border rounded-md w-full': true, [sizes[size]]: true}">
            <div class="input__icon">
                <slot name="icon"></slot>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.form__control {
    outline: none;
    padding-left: 2rem;
    transition: all .1s ease-out;

    &:focus {
        box-shadow: 0 3px 15px  #95a3b471;
        border-color: $primary;
        & + .input__icon svg {
            color: $primary;
        }
    }
}
.form-input {
    position: relative;
}
.input__icon {
    position: absolute;
    padding: 0 5px;
    top: 50%;
    transform: translateY(-50%);
    svg {
        width: 1rem;
        height: 1rem;
    }
}
</style>