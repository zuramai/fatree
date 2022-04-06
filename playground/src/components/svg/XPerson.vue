<script setup lang="ts">
import type { Coordinate, MouseEventType } from '@/@types/editor';
import { computed, inject, onMounted, reactive, ref, watch, type ComputedRef, type Ref } from 'vue';
import { XPerson } from './XPerson';
import type { Props } from "./XPerson"

const props = withDefaults(defineProps<Props>(), 
    {
        hoverColor: "rgba(0,0,0,.1)"
    }
);

const emit = defineEmits(["move"])
const svg = inject<Ref<SVGElement>>("svg")
const mousePosition = inject<Ref<Coordinate>>("svgMousePosition")
const image: Ref<SVGImageElement|undefined> = ref()


// Init xPerson instance
const xPerson = new XPerson(props)
xPerson.$emit = emit

const personEl: Ref<SVGGraphicsElement|undefined> = ref()
const positions = xPerson.positions
const styles = xPerson.styles.value
const person = xPerson.person

onMounted(() => {
    xPerson.onMounted(personEl)
    xPerson.el = personEl
    xPerson.setBBox()

    // Disable image dragging
    image.value?.addEventListener('dragstart', (e) => e.preventDefault())
})

// Events
const mouseEvent = (e: MouseEvent, name: MouseEventType) => {
    xPerson.onMouseEvent(name, e, { mousePosition: mousePosition! })  
} 
console.log(xPerson.person.position)
</script>
<template>
    <!-- A group dummy element for mouse event purpose -->
    <rect :x="xPerson.bbox.value?.x" 
        :y="xPerson.bbox.value?.y" 
        :width="xPerson.bbox.value?.width" 
        :height="xPerson.bbox.value?.height" 
        fill="transparent"
        v-if="xPerson.person.state.isActive"
        stroke="#666">
    </rect>
    
    <!-- The group of person's component -->
    <g class="person" 
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
                <circle id='top' :cx="person.position.x" :cy="person.position.y" :r="styles.imageSize.width"/>
            </clipPath>
        </defs>

        <!-- Image -->
        <g class="person-image">
            <image :clip-path="`url(#person-image-${index})`" 
                    :x="positions.image.x" 
                    :y="positions.image.y" 
                    :width="positions.image.w"
                    :height="positions.image.h" 
                    :xlink:href="person.img"
                    ref="image"
                    preserveAspectRatio="xMidYMid slice" draggable="false"></image>
        </g>

        <!-- Name -->
        <text 
            :x="positions.name.x" 
            :y="positions.name.y" 
            :font-size="styles.fontSize" 
            text-anchor="middle">
            {{ person.name }}
        </text>

        
        <g class="person-attribute">
            <text></text>
        </g>
    </g>
    
</template>