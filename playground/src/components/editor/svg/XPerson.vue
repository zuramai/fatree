<script setup lang="ts">
import type { Coordinate, MouseEventType } from '@/@types/editor';
import { inject, onMounted, ref, type Ref } from 'vue';
import type { XPerson } from '@/app/editor/components/XPerson';
import type { Fatree } from '@/app';

const props = defineProps<{
    id: string,
    index: number
}>()

const app = inject<Fatree>("app")!

const emit = defineEmits(["move"])
const image: Ref<SVGImageElement|undefined> = ref()

const person = app.people.getPerson(props.id)
person.$emit = emit

const personEl: Ref<SVGGraphicsElement|null> = ref(null)
const positions = person.positions


// Events
const mouseEvent = (e: MouseEvent, name: MouseEventType) => {
    person.onMouseEvent(name, e)  
} 

onMounted(() => {
    console.log("mounted called", personEl.value)
    person.onMounted(personEl)
    // Disable image dragging
    image.value?.addEventListener('dragstart', (e) => e.preventDefault())
})
</script>
<template>
    <!-- A group dummy element for mouse event purpose -->
    <rect data-component="person"
        :x="person.bbox.value?.x" 
        :y="person.bbox.value?.y" 
        :width="person.bbox.value?.width" 
        :height="person.bbox.value?.height" 
        fill="transparent"
        v-if="person.state.isActive"
        stroke="#666">
    </rect>
    
    <!-- The group of person's component -->
    <g  data-component="person"
        class="person" 
        @click="e => mouseEvent(e, 'click')" 
        @mouseover="e => mouseEvent(e, 'mouseover')" 
        @mouseleave="e => mouseEvent(e, 'mouseleave')" 
        @mouseup="e => mouseEvent(e, 'mouseup')" 
        @mousemove="e => mouseEvent(e, 'mousemove')" 
        @mouseenter="e => mouseEvent(e, 'mouseenter')"
        @mousedown="e => mouseEvent(e, 'mousedown')"
        ref="personEl">
 
        <defs>
            <clipPath :id="`person-image-${index}`">
                <circle id='top' :cx="person.centerPosition.x" :cy="person.centerPosition.y" :r="person.styles!.imageSize!.width"/>
            </clipPath>
        </defs>

        <!-- Image -->
        <g class="person-image">
            <image :clip-path="`url(#person-image-${index})`" 
                    :x="positions.image.x" 
                    :y="positions.image.y" 
                    :width="positions.image.w"
                    :height="positions.image.h" 
                    :xlink:href="person.metadata.photo"
                    ref="image"
                    preserveAspectRatio="xMidYMid slice" draggable="false"></image>
        </g>

        <!-- Name -->
        <text 
            :x="positions.name.x" 
            :y="positions.name.y" 
            :font-size="person.styles!.fontSize" 
            text-anchor="middle">
            {{ person.metadata.name }}
        </text>

        
        <g class="person-attribute">
            <text></text>
        </g>
    </g>
    
</template>