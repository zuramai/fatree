<script setup lang="ts">
import type { Coordinate, MouseEventType } from '@/@types/editor';
import { computed, inject, onBeforeMount, onMounted, reactive, ref, type Ref } from 'vue';
import type { Fatree } from '@/app';
import { useAppStore } from '@/stores/app';
import type { PersonElementPositions } from '@/@types/person';
import { watch } from 'vue';

const props = defineProps<{
    id: string,
    index: number
}>()

// Inject Fatree instance
const app = useAppStore().fatree
const person = app.people.getPerson(props.id)
const personEl = ref<SVGGraphicsElement>()

const svgStyles =  reactive({
    stroke: "#999",
    fill: "transparent",
    padding: 20,
    radius: 5
})


// Emits
const emit = defineEmits(["move"])
person.$emit = emit

// Events
const mouseEvent = (e: MouseEvent, name: MouseEventType) => {
    person.onMouseEvent(name, e)  
} 

// The positions is somehow doesn't work if I put it in the XPerson class, so I temporarily put this here
const positions =  computed<PersonElementPositions>(() => ({
    image: reactive({
            x: person.centerPosition.x - person.styles!.imageSize!.width,
            y: person.centerPosition.y - person.styles!.imageSize!.height,
            w: person.styles!.imageSize!.width * 2,
            h: person.styles!.imageSize!.height * 2,
    }),
    name: {
            ...person.centerPosition, 
            y: person.centerPosition.y + person.styles!.imageSize!.height + person.styles!.fontSize! + 10// with padding
    }
}))

const rectSize = computed(() => {
    let bbox = personEl.value?.getBBox()
    let centerPosition = person.centerPosition
    if(person.bbox)
        return {
            x: (bbox?.x ?? 0) - svgStyles.padding / 2,
            y: (bbox?.y ?? 0) - svgStyles.padding / 2,
            width: (bbox?.width ?? 0) + svgStyles.padding,
            height: (bbox?.height ?? 0) + svgStyles.padding
        }
    else return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
})
onBeforeMount(() => {
    console.log("beforeMount: "+ person.metadata.name);
    
})
onMounted(() => {
    let bbox = computed(() => personEl.value!.getBBox())
    watch(() => personEl.value!, () => {
        console.log('bbox changed')
    })
    person.onMounted(personEl as Ref<SVGGraphicsElement>, bbox)    
    console.log(person.bbox);
})
</script>
<template>
    <!-- A group dummy element for mouse event purpose -->
    <rect data-component="person"
        :x="rectSize.x" 
        :y="rectSize.y" 
        :width="rectSize.width" 
        :height="rectSize.height" 
        :stroke="person.state.isActive ? `#000` : svgStyles.stroke"
        :rx="svgStyles.radius"
        fill="white"
        >
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
        ref="personEl"
        >
 
        <defs>
            <clipPath :id="`person-image-${index}`">
                <circle id='top' :cx="person.centerPosition.x" :cy="person.centerPosition.y" :r="person.styles!.imageSize!.width"/>
            </clipPath>
        </defs>


        <!-- Image -->
        <g class="person-image">
            <image :clip-path="`url(#person-image-${index})`" 
                    :x="positions.image!.x!" 
                    :y="positions.image!.y!" 
                    :width="positions.image!.w!"
                    :height="positions.image!.h!" 
                    :xlink:href="person.metadata.photo"
                    ref="image"
                    preserveAspectRatio="xMidYMid slice" draggable="false"></image>

            <!-- Transparent circle to cover up the actual image so the image wouldn't be ghost dragged -->
            <circle id='top' :cx="person.centerPosition.x" :cy="person.centerPosition.y" :r="person.styles!.imageSize!.width" stroke="0" fill="transparent"/>

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