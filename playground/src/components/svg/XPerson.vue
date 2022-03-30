<script setup lang="ts">
import type { Coordinate } from '@/@types/editor';
import type { Person } from '@/@types/family';
import { computed, onMounted, reactive, ref, watch, type ComputedRef, type Ref } from 'vue';
import { XPerson } from './XPerson';
import type { Props } from "./XPerson"

const props = withDefaults(defineProps<Props>(), 
    {
        hoverColor: "rgba(0,0,0,.1)"
    }
);

// Init xPerson instance
const xPerson = new XPerson(props)

const personEl: Ref<SVGGraphicsElement|undefined> = ref()
const positions = xPerson.positions
const styles = xPerson.styles.value


onMounted(() => {
    xPerson.personEl = personEl
    xPerson.bbox.value = xPerson.personEl.value!.getBBox()   
})

const onMouseOver = (e: MouseEvent) => xPerson.onMouseEvent("mouseover", e)
const onMouseUp = (e: MouseEvent) => xPerson.onMouseEvent("mouseup", e)
const onMouseClick = (e: MouseEvent) => xPerson.onMouseEvent("click", e)
const onMouseLeave = (e: MouseEvent) => xPerson.onMouseEvent("mouseleave", e)

</script>
<template>

    <!-- The group of person's component -->
    <g class="person" @click="onMouseClick" @mouseover="onMouseOver" @mouseleave="onMouseLeave" @mouseup="onMouseUp" ref="personEl" >
        
        <!-- A group dummy element for mouse event purpose -->
        <rect :x="xPerson.bbox.value.x" 
            :y="xPerson.bbox.value.y" 
            :width="xPerson.bbox.value.width" 
            :height="xPerson.bbox.value.height" 
            fill="transparent"
            :stroke="xPerson.svgStyles.stroke.value">
        </rect>

        <defs>
            <clipPath :id="`person-image-${id}`">
                <circle id='top' :cx="person.position.x" :cy="person.position.y" :r="styles.imageSize.width"/>
            </clipPath>
        </defs>

        <!-- Image -->
        <g class="person-image">
            <image :clip-path="`url(#person-image-${id})`" 
                    :x="person.position.x - styles.imageSize.width" 
                    :y="person.position.y - styles.imageSize.height" 
                    :width="styles.imageSize.width * 2"
                    :height="styles.imageSize.height * 2" 
                    :xlink:href="person.img"
                    preserveAspectRatio="xMidYMid slice" ></image>
        </g>

        <!-- Name -->
        <text 
            :x="positions.name?.value.x" 
            :y="positions.name?.value.y" 
            :font-size="styles.fontSize" 
            text-anchor="middle">
            {{ person.name }}
        </text>

        
        <g class="person-attribute">
            <text></text>
        </g>
    </g>
</template>