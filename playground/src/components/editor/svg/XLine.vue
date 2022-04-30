<script lang="ts" setup>import type { XPerson } from '@/app/editor/components/XPerson';
import { useAppStore } from '@/stores/app';
import { computed, onMounted, ref, watch, type ComputedRef } from 'vue';
import { LineType } from "@/@types/lines";

const props = defineProps({
    id: String,
    index: Number
})

let isMounted = ref(false)
let app = useAppStore().fatree
let line = app.lines.lines[props.id!]!
const lineEl = ref<SVGGraphicsElement|null>(null)

// Path D
let d = computed(() => {
    if(isMounted.value)
        return line.types[line.options.type!].getD(line.fromCoordinate!, line.toCoordinate!)
})

onMounted(() => {
    line.onMounted(lineEl)
    isMounted.value = true
    
    
    // console.log("d",d.value)
})
</script>
<template>
<g class="line">
    <path 
    :d="d"
    :stroke="line.options.color"
    ref="lineEl"
    :stroke-width="line.options.width"
    >
    </path>
</g>
</template>