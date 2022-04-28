<script lang="ts" setup>import { useAppStore } from '@/stores/app';

const props = defineProps({
    id: String,
    index: Number
})

let app = useAppStore().fatree
let line = app.lines.lines[props.id!]!
console.log(line.options)
</script>
<template>
<g class="line">
    <line v-if="line.options.type == 'straight'" 
        :x1="line.fromCoordinate.x"
        :x2="line.toCoordinate.x"
        :y1="line.fromCoordinate.y"
        :y2="line.toCoordinate.y"
        :stroke="line.options.color"
        >
    </line>
</g>
</template>