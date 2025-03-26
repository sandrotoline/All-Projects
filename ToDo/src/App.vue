<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref ([])
const name = ref ('')
const todos_content = ref ('')

const todos_asc = computed(() => todos.value.sort((a,b) => {
  return a.createdAt - b.createdAt
}))

const addTodo = () => {
  if(todos_content.value.trim() === '' ){
    return
  }

  todos.value.push({
    id: todos.value.length + 1,
    content: todos_content.value,
    done: false,
    createdAt: new Date().getTime()
  })
  todos_content.value = ''
  alert('Adicionado')
}

const removeTodo = todo => {
  todos.value = todos.value.filter(t => t !== todo)
}

watch(todos, (newVal) => {
  localStorage.setItem('todos',JSON.stringify(newVal))
},{deep: true})

watch(name, (newVal) => {
  localStorage.setItem('name',newVal)
})

onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})


</script>

<template>
  <main class="app">
    <section>
      <h2>Bem vindo,
        <input 
          type="text" 
          :placeholder="name || 'Insira seu nome'" 
          v-model="name"
        />
      </h2>
    </section>
    <section class="create-todo">
      <h3>Check List</h3>
      <form @submit.prevent="addTodo">
        <h4>O que gostaria de adicionar ao Check list?</h4>
        <input type="text" placeholder="Fazer um vídeo" v-model="todos_content">
        <div>
        </div>
        <input type="submit" value="Add Todo" />
      </form>
      <div>
        <section>
          <h3>Todo List</h3>
          <div class="list">
            <div 
              v-for="todo in todos_asc" 
              :class="`todo-item ${todo.done && 'done'}`"
              :key="todo.id">
              <label style="display: flex;justify-content: space-between;align-items: center;">
                <input type="checkbox" v-model="todo.done">
                <span>{{ todo.content }}</span>
                <button @click="removeTodo(todo)">Deletar</button>
              </label>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>

</template>

