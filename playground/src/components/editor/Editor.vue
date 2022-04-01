<script setup lang="ts">
import type { Coordinate } from "@/@types/editor";
import BackgroundGrid from "@/components/editor/BackgroundGrid.vue"
import { useFamilyStore } from "@/stores/family";
import { computed, provide, ref } from "vue";
import XPerson from "../svg/XPerson.vue"

const family = useFamilyStore()

const svg = ref()
const svgMousePosition = ref<Coordinate>()

provide("svg", svg)
provide("svgMousePosition", svgMousePosition)

function calculateMousePosition(x: number, y: number): void {
  const domPoint = new DOMPointReadOnly(x, y)
  const pt = domPoint.matrixTransform(svg.value.getScreenCTM().inverse())
  svgMousePosition.value = { x: pt.x, y: pt.y }
}

function onClick(e: MouseEvent) {
  calculateMousePosition(e.clientX, e.clientY)
  console.log(svgMousePosition.value);
}

function onMouseMove(e: MouseEvent) {
  calculateMousePosition(e.clientX, e.clientY)
}

function movePerson(i: number, position: Coordinate) {
    console.log("MOVED", position)
   family.movePerson(i, position)
}

</script>
<template>
  <div class="editor-area">
   <svg id="editor" 
        ref="svg" 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg" 
        @click="onClick"
        @mousemove="onMouseMove">
      <background-grid></background-grid>
      <x-person 
          v-for="(person, i) in family.people" 
          :person="person" 
          :id="i"
          @move="(position: Coordinate) => movePerson(i, position)">
      </x-person>
    </svg>
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/components/editor";
</style>