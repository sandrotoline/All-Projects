<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const i = ref(0)

const increase = () => {
  i.value++
}

const decrease = () => {
  if(i.value > 0){i.value--}
}

const reset = () => {
  i.value = 0
}

watch(i, (newVal) => {
  localStorage.setItem('cont',newVal)
})
onMounted(() => {
  i.value = localStorage.getItem('cont') || 0
})
</script>

<template>
  <div>
    <h1>Contador: {{i}}</h1>
    <button @click="increase">Aumentar</button>
    <button @click="decrease">Diminuir</button>
    <button @click="reset">Resetar</button>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
