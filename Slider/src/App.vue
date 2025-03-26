<template>
  <div>
    <Slider :slides="slides" :interval="4000" />
  </div>
</template>

<script setup>
import Slider from './components/Slider.vue';

const slides = [
  'https://placehold.co/800x400?text=Slide+1',
  'https://placehold.co/800x400?text=Slide+2',
  'https://placehold.co/800x400?text=Slide+3',
];
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
