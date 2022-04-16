<script setup lang="ts">
import type { Coordinate, MouseEventType } from '@/@types/editor';
import { computed, inject, onMounted, reactive, ref, type Ref } from 'vue';
import type { PersonElementPositions, XPerson } from '@/app/editor/components/XPerson';
import type { Fatree } from '@/app';

const props = defineProps<{
    id: string,
    index: number
}>()

// Inject Fatree instance
const app = inject<Fatree>("app")!
const person = app.people.getPerson(props.id)
const personEl: Ref<SVGGraphicsElement|null> = ref(null)

// Emits
const emit = defineEmits(["move"])
person.$emit = emit

// States
const isMounted = ref(false)

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

onMounted(() => {
    isMounted.value = true
    person.onMounted(personEl)
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
        ref="personEl"
        v-if="isMounted"
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