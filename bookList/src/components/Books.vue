
<script setup>
    const props = defineProps(['books']);
</script>

<template>
    <div class="books-list">
        <div v-for="item in books" :key="item.isbn" class="book">
          <div class="book-cover" >
            <div class="readIt" v-if="item.isRead">
                <i class="fa-solid fa-eye"></i>
            </div>
            <img :src="item.cover">
              <button @click="$emit('toggleIsRead',item.id)" :class="{isRead : item.isRead}">
                <i class="fa-solid fa-eye"></i>
                <span>{{item.isRead ? 'Já li' : 'Ainda não li' }}</span
              >
            </button>
          </div>
          <div class="book-details">
            <p class="book-author">{{item.author}}</p>
            <h3 class="book-title">{{item.title}}</h3>
            <p><i class="fa-solid fa-hashtag icon"></i>{{ item.isbn }}</p>
          </div>
        </div>
      </div>
</template>

<style lang="scss" scoped>

</style>