<script setup>
import { reactive, ref } from 'vue';
import Books from './components/Books.vue';
import BookProgress from './components/BookProgress.vue';
import AddBook from './components/AddBook.vue';

let showAddBook = ref(false);

let books = reactive ([
        {
          id: 1,
          title: "History of Europe",
          cover:
            "https://placehold.co/250x400/black/white",
          isRead: true,
          isbn: "0-395-07157-8",
          author: "Daniel Trejo",
        },
        {
          id: 2,
          title: "Penguin Classics",
          cover:
            "https://placehold.co/250x400/grey/white",
          isRead: false,
          isbn: "0-395-07157-8",
          author: "Daniel Trejo, Jon Snow",
        },
        {
          id: 3,
          title: "Becoming",
          cover:
          "https://placehold.co/250x400/",
          isRead: false,
          isbn: "0-395-07157-8",
          author: "Daniel Trejo",
        },
        {
          id: 4,
          title: "Sonnets",
          cover:
          "https://placehold.co/250x400/purple/white",
          isRead: false,
          isbn: "0-395-07157-8",
          author: "Daniel Trejo",
        },
]);


function toggleIsRead(id) {
  books.forEach((book) => {
    if (book.id === id) {
      book.isRead = !book.isRead;
    }
  })
}

function addBook(newBook) {
  newBook.id = Math.max(...books.map(el=> el.id))+ 1
  showAddBook.value = false;
  books.push(newBook);
  console.log(books)
}

</script>

<template>
  <div class="container" v-if="!showAddBook">
      <h1>📖 Meus Livros</h1>
      <div class="header-btns">
        <button
          class="btn"
          @click="showAddBook = true"
          >
          Adicionar Livro +
        </button>
      </div>
  
      <div class="books-container">
        <Books @toggleIsRead="toggleIsRead" :books="books"/>
        <BookProgress :books="books"/>
      </div>
  </div>
  <div v-else>
    <AddBook @addBook="addBook" @closeAddBook="showAddBook = false" />
  </div>
</template>

<style scoped>

</style>
