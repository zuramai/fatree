<script setup lang="ts">
import type { Person } from '@/types/family';
import { getPersonStyles } from '@/utils/person';
import { computed } from 'vue';

interface Props {
    person: Person
    id: number
}
const props = defineProps<Props>()
const styles = getPersonStyles(props.person)
</script>
<template>
    <g class="person">
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
        <g class="person-attribute">
            <text></text>
        </g>
    </g>
</template>