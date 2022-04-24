<script setup lang="ts">
import type { Coordinate, MouseEventType } from "@/@types/editor";
import BackgroundGrid from "@/components/editor/BackgroundGrid.vue"
import { useFamilyStore } from "@/stores/family";
import { computed, inject, onMounted, provide, reactive, ref } from "vue";
import XPerson from "./svg/XPerson.vue"
import {MouseUtils} from "@/app/utils"
import { useEditorStore } from "@/stores/editor";
import type { Fatree } from "@/app";
import { useAppStore } from "@/stores/app";
const editor = useEditorStore()
const family = useFamilyStore()


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