<template>
    <div>
      <h2>Lista de Posts</h2>
      <div v-if="loading">Carregando...</div>
      <div v-else-if="error">{{ error }}</div>
      <ul v-else>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getPosts } from '../service/api.js';
  
  const posts = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  onMounted(async () => {
    try {
      posts.value = await getPosts();
    } catch (err) {
      error.value = 'Erro ao carregar os posts';
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  h2,h3 {
    color: #42b883;
  }
  p{
    color: #666;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    background: #f4f4f4;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }
  </style>