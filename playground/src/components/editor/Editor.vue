<script setup lang="ts">
import type { Coordinate, MouseEventType } from "@/@types/editor";
import BackgroundGrid from "@/components/editor/BackgroundGrid.vue"
import { useFamilyStore } from "@/stores/family";
import { computed, provide, reactive, ref } from "vue";
import XPerson from "../svg/XPerson.vue"

const family = useFamilyStore()


// Storing mouse events state
const svg = ref()
const svgMousePosition = ref<Coordinate>()
const isMouseDown = ref<boolean>(false)
let mouseHoldingFrom: Coordinate = {x: 0, y:0}

function getMousePosition(x: number, y: number): Coordinate {
	const domPoint = new DOMPointReadOnly(x, y)
	const pt = domPoint.matrixTransform(svg.value.getScreenCTM().inverse())
	let pos = { x: pt.x, y: pt.y }
	svgMousePosition.value = pos
	return pos
}

function onMouseClick(e: MouseEvent) {}
function onMouseMove(e: MouseEvent) {
	getMousePosition(e.clientX, e.clientY)
	let personInHold = family.filterPeopleByState("isActive")
	if(isMouseDown.value) {
		// Move all `isDragging` people
		for(let i = 0; i < personInHold.length; i++) {
			let person = family.getPerson(personInHold[i].id)
	
			let newLocation = {
				x: person!.state.startDraggingAt!.x + (svgMousePosition.value!.x - mouseHoldingFrom!.x),
				y: person!.state.startDraggingAt!.y + (svgMousePosition.value!.y - mouseHoldingFrom!.y),
			}
			family.setPersonLocation(personInHold[i].id, newLocation)
		}
	}
}
function onMouseOver(e: MouseEvent) {}
function onMouseUp(e: MouseEvent) {
	isMouseDown.value = false
}
function onMouseLeave(e: MouseEvent) {}
function onMouseEnter(e: MouseEvent) {}
function onMouseDown(e: MouseEvent) {
	console.log("EVENT FROM EDITOR")
	isMouseDown.value = true
	Object.keys(family.people).forEach(id => family.people[id].state.startDraggingAt = family.people[id].position)
	mouseHoldingFrom = svgMousePosition.value!
}

const mouseEventMap: {[key in MouseEventType]: (e: MouseEvent) => void} = {
	"click": onMouseClick,
	"mouseover": onMouseOver,
	"mouseup": onMouseUp,
	"mousemove": onMouseMove,
	"mouseleave": onMouseLeave,
	"mouseenter": onMouseEnter,
	"mousedown": onMouseDown,
}

function mouseEvent(e: MouseEvent, name: MouseEventType) {
	mouseEventMap[name](e)
	getMousePosition(e.clientX, e.clientY)
} 

function movePerson(i: number, position: Coordinate) {
	family.movePerson(i, position)
}

provide("svg", svg)
provide("svgMousePosition", svgMousePosition)

</script>
<template>
<div class="editor-area">
	<svg id="editor" 
		ref="svg" 
		width="100%" 
		height="100%" 
		xmlns="http://www.w3.org/2000/svg" 
        @click="(e: MouseEvent) => mouseEvent(e, 'click')" 
        @mouseover="(e: MouseEvent) => mouseEvent(e, 'mouseover')" 
        @mouseleave="(e: MouseEvent) => mouseEvent(e, 'mouseleave')" 
        @mouseup="(e: MouseEvent) => mouseEvent(e, 'mouseup')" 
        @mousemove="(e: MouseEvent) => mouseEvent(e, 'mousemove')" 
        @mouseenter="(e: MouseEvent) => mouseEvent(e, 'mouseenter')"
        @mousedown="(e: MouseEvent) => mouseEvent(e, 'mousedown')"
	>
	<background-grid></background-grid>
	<x-person 
		v-for="(id, i) in Object.keys(family.people)" 
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