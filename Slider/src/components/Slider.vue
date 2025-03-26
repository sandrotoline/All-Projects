<!-- src/components/Slider.vue -->
<template>
    <div class="slider">
      <div
        class="slider-wrapper"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          class="slide"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <img :src="slide" alt="Slide" />
        </div>
      </div>
  
      <!-- Setas de navegação -->
      <button class="prev" @click="prevSlide">&#10094;</button>
      <button class="next" @click="nextSlide">&#10095;</button>
  
      <!-- Bolinhas de navegação -->
      <div class="dots">
        <span
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    slides: {
      type: Array,
      required: true,
    },
    interval: {
      type: Number,
      default: 3000, // Tempo em ms para rolagem automática
    },
  });
  
  const currentIndex = ref(0);
  let autoSlideInterval = null;
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % props.slides.length;
  };
  
  const prevSlide = () => {
    currentIndex.value =
      (currentIndex.value - 1 + props.slides.length) % props.slides.length;
  };
  
  const goToSlide = (index) => {
    currentIndex.value = index;
  };
  
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, props.interval);
  };
  
  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };
  
  onMounted(() => {
    startAutoSlide();
  });
  
  onUnmounted(() => {
    stopAutoSlide();
  });
  </script>
  
  <style scoped>
  .slider {
    position: relative;
    overflow: hidden;
    margin: auto;
    border-radius: 12px;
  }
  
  .slider-wrapper {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .slide {
    min-width: 100%;
  }
  
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
  }
  
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    padding: 10px;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    transition: background 0.3s;
    border-radius: 50%;
  }
  
  button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .prev {
    left: 10px;
  }
  
  .next {
    right: 10px;
  }
  
  .dots {
    text-align: center;
    margin-top: 10px;
  }
  
  .dots span {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 4px;
    background-color: #bbb;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .dots span.active {
    background-color: #333;
  }
  </style>