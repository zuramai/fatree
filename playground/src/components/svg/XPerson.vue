<script setup lang="ts">
import type { Coordinate } from '@/@types/editor';
import type { Person } from '@/@types/family';
import { getPersonStyles } from '@/utils/person';
import { computed } from 'vue';

interface Props {
    person: Person
    id: number
}

const props = defineProps<Props>()
const styles = getPersonStyles(props.person)

const namePosition: Coordinate = { 
    ...props.person.position, 
    y: props.person.position.y + props.person.styles!.imageSize!.height + styles.value.fontSize + 10// with padding
}

const onPersonClick = () => {

}

</script>
<template>
    <g class="person" @click="onPersonClick" >
        <defs>
            <clipPath :id="`person-image-${id}`">
                <circle id='top' :cx="person.position.x" :cy="person.position.y" :r="styles.imageSize.width"/>
            </clipPath>
        </defs>

        <g class="person-image">
            <image :clip-path="`url(#person-image-${id})`" 
                    :x="person.position.x - styles.imageSize.width" 
                    :y="person.position.y - styles.imageSize.height" 
                    :width="styles.imageSize.width * 2"
                    :height="styles.imageSize.height * 2" 
                    :xlink:href="person.img"
                    preserveAspectRatio="xMidYMid slice" ></image>
        </g>
        <text :x="namePosition.x" :font-size="styles.fontSize" text-anchor="middle" :y="namePosition.y">{{ person.name }}</text>
        <g class="person-attribute">
            <text></text>
        </g>
    </g>
</template>