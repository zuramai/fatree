<script lang="ts" setup>import type { XPerson } from '@/app/editor/components/XPerson';
import { useAppStore } from '@/stores/app';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    id: String,
    index: Number
})

let app = useAppStore().fatree
let line = app.lines.lines[props.id!]!
const lineEl = ref<SVGGraphicsElement|null>(null)
onMounted(() => {
    line.onMounted(lineEl)
})
</script>
<template>
<g class="line">
    <line v-if="line.options.type == 'straight'" 
        :x1="line.fromCoordinate?.x"
        :x2="line.toCoordinate?.x"
        :y1="line.fromCoordinate?.y"
        :y2="line.toCoordinate?.y"
        :stroke="line.options.color"
        ref="lineEl"
        >
    </line>
</g>
</template>