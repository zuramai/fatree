<script lang="ts" setup>import type { XPerson } from '@/app/editor/components/XPerson';
import { useAppStore } from '@/stores/app';
import { computed, nextTick, onBeforeMount, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue';
import { LineType } from "@/@types/lines";

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    index: Number
})

let isMounted = ref(false)
let app = useAppStore().fatree
let line = app.lines.lines[props.id!]!
const lineEl = ref<SVGGraphicsElement|undefined>()

// Path D
let d = computed(() => {
    if(isMounted.value)
        return line.types[line.options.type!].getD(line.fromCoordinate!, line.toCoordinate!, line.position)
})
onBeforeMount(() => {
    console.log("beforeMount: ", props.id);
})
onMounted(() => {
    let bbox = computed(() => lineEl.value!.getBBox())
    line.onMounted(lineEl as Ref<SVGGraphicsElement>)
    isMounted.value = true
    console.log("mount: ", lineEl.value);
})

</script>
<template>
<g class="line">
    <path 
    :d="d"
    :stroke="line.options.color"
    ref="lineEl"
    :id="id"
    :stroke-width="line.options.width"
    fill="transparent"
    >
    </path>
</g>
</template>