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


function onClick(e: MouseEvent) {
  const domPoint = new DOMPointReadOnly(e.clientX, e.clientY)
  const pt = domPoint.matrixTransform(svg.value.getScreenCTM().inverse())
  svgMousePosition.value = { x: pt.x, y: pt.y }
  console.log(svgMousePosition.value);
  
}
</script>
<template>
  <div class="editor-area">
   <svg id="editor" 
        ref="svg" 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg" 
        @click="onClick">
      <background-grid></background-grid>
      <x-person v-for="(person, i) in family.people" :person="person" :id="i"></x-person>
    </svg>
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/components/editor";
</style>