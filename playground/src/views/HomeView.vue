<script setup lang="ts">
import Card from "../components/card/Card.vue";
let templates = [0,0,0,0,0,0,0,0]
</script>

<template>
  <main id="page-home">
    <div class="container">
      <h1 class="home__title mb-5 text-4xl">Create your own family tree, it's free!</h1>
      <p class="w-3/4 tracking-wide">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pulvinar congue rhoncus. Proin rhoncus justo porttitor tellus imperdiet, vitae tristique urna posuere. Sed eu interdum augue. </p>

      <button class="btn btn-primary"></button>

      <section class="choose-template mt-16">
        <h2 class="text-xl mb-5">Choose your template:</h2>

        <div class="template-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
          <div v-for="template in templates">
            <card title="Stunning Fam" description="Lorem ipsum dolor sit amet"/>          
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/pages/home";
</style>