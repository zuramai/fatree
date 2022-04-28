<script setup lang="ts">
import type { Coordinate, MouseEventType } from "@/@types/editor";
import BackgroundGrid from "@/components/editor/BackgroundGrid.vue"
import { onMounted, ref } from "vue";
import XPerson from "./svg/XPerson.vue"
import { useAppStore } from "@/stores/app";
import XLine from "./svg/XLine.vue";

// Storing mouse events state
const app = useAppStore().fatree
const svg = ref()

onMounted(() => {
	app.setSVG(svg.value)
})
</script>
<template>
<div class="editor-area">
	<editor-topbar></editor-topbar>
	<svg id="editor" 
		ref="svg" 
		width="100%" 
		height="100%" 
		xmlns="http://www.w3.org/2000/svg" 
        @click="(e: MouseEvent) => app.onMouseEvent(e, 'click')" 
        @mouseover="(e: MouseEvent) => app.onMouseEvent(e, 'mouseover')" 
        @mouseleave="(e: MouseEvent) => app.onMouseEvent(e, 'mouseleave')" 
        @mouseup="(e: MouseEvent) => app.onMouseEvent(e, 'mouseup')" 
        @mousemove="(e: MouseEvent) => app.onMouseEvent(e, 'mousemove')" 
        @mouseenter="(e: MouseEvent) => app.onMouseEvent(e, 'mouseenter')"
        @mousedown="(e: MouseEvent) => app.onMouseEvent(e, 'mousedown')"
	>
	<background-grid></background-grid>
	<g id="lines">
		<x-line 
			v-for="(id, i) in Object.keys(app.lines.lines)" 
			:id="id"
			:index="i"
			>
		</x-line>
	</g>
	<x-person 
		v-for="(id, i) in Object.keys(app.people.people)" 
		:id="id"
		:index="i"
		>
	</x-person>
	</svg>
</div>
</template>
<style lang="scss">
@import "@/assets/scss/components/editor";
</style>