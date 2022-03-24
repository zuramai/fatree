<script setup lang="ts">
import BackgroundGrid from "@/components/editor/BackgroundGrid.vue"
import { useFamilyStore } from "@/stores/family";
import { computed } from "vue";
import XPerson from "../svg/XPerson.vue"

const family = useFamilyStore()
</script>
<template>
  <div class="editor-area">
    <svg id="editor" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <background-grid></background-grid>
      <x-person v-for="(person, i) in family.people" :person="person" :id="i"></x-person>
    </svg>
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/components/editor";
</style>