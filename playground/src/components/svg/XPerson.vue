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

const xPerson = new XPerson(props)
const positions = xPerson.positions
const styles = xPerson.styles.value


const onPersonClick = () => {

}



const personEl: Ref<SVGGraphicsElement|undefined> = ref()
let bbox: Ref<Partial<DOMRect>> = ref<Partial<DOMRect>>({x: 0, y:0, width: 0, height: 0});


onMounted(() => {
    bbox.value = personEl.value!.getBBox()   
    console.log(bbox) 
    console.log(personEl.value)
})
const onMouseOver = (e: MouseEvent) => {
    let el = e.target as SVGGraphicsElement
    bbox.value = (personEl.value as SVGGraphicsElement).getBBox()

    el.style.cursor = "pointer"
}

</script>
<template>

    <!-- The group of person's component -->
    <g class="person" @click="onPersonClick" @mouseover="onMouseOver" ref="personEl" >
        
        <!-- A group dummy element for mouse event purpose -->
        <rect :x="bbox.x" :y="bbox.y" :width="bbox.width" :height="bbox.height" fill="transparent"></rect>

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