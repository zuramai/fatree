<script setup lang="ts">
import { onBeforeMount } from 'vue'


interface Props {
    size?: "sm" | "md" | "lg" | "xl"
    placeholder?: string
    label?: string
    type?: string
    withIcon?: boolean
}
const { 
    size = "md", 
    type = "text",
    withIcon = false,
} = defineProps<Props>()

const paddingSizes = {
    "sm": (withIcon ? "pl-6 pr-3" : "px-2") + " py-1",
    "md": (withIcon ? "pl-10 pr-4": "px-3") + " py-2",
    "lg": (withIcon ? "pl-12 pr-6": "px-6") + " py-3",
    "xl": (withIcon ? "pl-14 pr-7": "px-7") + " py-4",
}

const classBySizes = {
    "sm": `${paddingSizes['sm']} text-sm`,
    "md": `${paddingSizes['md']}`,
    "lg": `${paddingSizes['lg']}`,
    "xl": `${paddingSizes['xl']}`,
}
const emit = defineEmits(['update:modelValue', 'change'])

onBeforeMount(() => {
    let uid = 0;
    let uuid = uid.toString();
    uid += 1;
    console.log(uuid)
})

const onChange = (e: Event) => {
    let emitValue
    if(type == 'text') emitValue = (e.target as HTMLInputElement).value
    else if(type == 'file') emitValue = (e.target as HTMLInputElement).files

    emit('change', emitValue)
}

</script>
<template>
    <div class="form-group">
        <div class="form-input ">
            <label class="font-medium">{{ label }}</label>
            <input :type="type" 
                :placeholder="placeholder"
                :class="{'form__control | border-stone-300 border rounded-md w-full': true, [classBySizes[size]]: true}" 
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                @change="onChange">
                
            <div class="input__icon">
                <slot name="icon"></slot>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.form-group + .form-group {
    margin-top: 1rem;
}
.form__control {
    outline: none;
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