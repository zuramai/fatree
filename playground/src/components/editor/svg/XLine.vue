<script lang="ts" setup>import type { XPerson } from '@/app/editor/components/XPerson';
import { useAppStore } from '@/stores/app';
import { computed, nextTick, onBeforeMount, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue';
import { LineType } from "@/@types/lines";
import type { Coordinate } from '@/@types/editor';

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

onBeforeMount(() => {
    console.log("beforeMount: ", props.id);
})
const fromCoordinate = computed<Coordinate>((): Coordinate => {
    let bbox = lineEl.value?.getBBox()

    if (!bbox) return { x: 0, y: 0 }
        
    
    let bboxW = (bbox.width ?? 0)
    let bboxH = (bbox.height ?? 0)

    let deltaX = line.to.centerPosition.x > line.from.centerPosition.x ? bboxW : -bboxW
    let deltaY = 0

    if(line.options.type == LineType.ORTHOGONAL) deltaX = 0
    
    let pos = {
        x: line.from.centerPosition.x + deltaX / 2,
        y: line.from.centerPosition.y + deltaY,
    }
    return pos
})

const toCoordinate = computed<Coordinate>((): Coordinate => {
    let pos: Coordinate;
    let bboxFrom = lineEl.value?.getBBox()  
    let bboxTo = line.to?.el.getBBox() 
    if(!bboxTo) return { x: 0, y: 0 }

    let deltaW = line.to.centerPosition.x > line.from.centerPosition.x ? -(bboxFrom?.width ?? 0) : (bboxFrom?.height ?? 0)
    let deltaH = 0
    if(line.options.type == LineType.ORTHOGONAL) deltaW = 0

    if(line.to.type == "line") {
        // To the bottom of the target line
        pos = {
            x: bboxTo.x + bboxTo.width/2,
            y: bboxTo.y + bboxTo.height
        }
        
    } else {
        pos = {
            x: line.to.centerPosition.x + deltaW / 2,
            y: line.to.centerPosition.y + deltaH,
        }
    }
    return pos
})

// Path D
let d = computed(() => {
    if(isMounted.value)
        return line.types[line.options.type!].getD(fromCoordinate.value, toCoordinate.value, line.position)
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