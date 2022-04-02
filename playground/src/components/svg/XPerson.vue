<script setup lang="ts">
import type { Coordinate, MouseEventType } from '@/@types/editor';
import type { Person } from '@/@types/family';
import { computed, inject, onMounted, reactive, ref, watch, type ComputedRef, type Ref } from 'vue';
import { XPerson } from './XPerson';
import type { Props } from "./XPerson"

const props = withDefaults(defineProps<Props>(), 
    {
        hoverColor: "rgba(0,0,0,.1)"
    }
);

const mousePosition = inject<Ref<Coordinate>>("svgMousePosition")


// Init xPerson instance
const xPerson = new XPerson(props)
const emit = defineEmits(["move"])
xPerson.$emit = emit

const personEl: Ref<SVGGraphicsElement|undefined> = ref()
const positions = xPerson.positions
const styles = xPerson.styles.value


onMounted(() => {
    xPerson.el = personEl
})

// Events
const mouseEvent = (e: MouseEvent, name: MouseEventType) => {
    xPerson.onMouseEvent(name, e, { mousePosition: mousePosition! })  
} 
console.log(xPerson.person.position)
</script>
<template>

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
        
        <!-- A group dummy element for mouse event purpose -->
        <!-- <rect :x="xPerson.bbox.value.x" 
            :y="xPerson.bbox.value.y" 
            :width="xPerson.bbox.value.width" 
            :height="xPerson.bbox.value.height" 
            fill="transparent"
            :stroke="xPerson.svgStyles.value.stroke"> -->
        <!-- </rect> -->

        <defs>
            <clipPath :id="`person-image-${id}`">
                <circle id='top' :cx="person.position.x" :cy="person.position.y" :r="styles.imageSize.width"/>
            </clipPath>
        </defs>

        <!-- Image -->
        <g class="person-image">
            <image :clip-path="`url(#person-image-${id})`" 
                    :x="positions.image.x" 
                    :y="positions.image.y" 
                    :width="positions.image.w"
                    :height="positions.image.h" 
                    :xlink:href="person.img"
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
    <circle r="10" :cx="xPerson.person.position.x" :cy="xPerson.person.position.y"></circle>
</template>