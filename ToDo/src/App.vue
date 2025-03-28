<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

const todos = ref([])

const todoContent = reactive({
    id: '',
    content: '',
    done: false,
});
  
const AddTodo = () => {
  if (todoContent.content.trim() === '') {
    alert('Please enter a task');
    return;
  }

  todos.value.push({
    id: todos.value.length + 1,
    content: todoContent.content,
    done: false
  });

  todoContent.content = '';
};

const removeToDo = (item) => {
  todos.value = todos.value.filter(todo => todo.id !== item.id)
}

watch(todos, (newVal) => {
  localStorage.setItem('todos',JSON.stringify(newVal))
},{deep: true})

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

</script>

<template>
  <main class="app">
    <section>
      <h2>Bem vindo </h2>
      <form class="create-todo" @submit.prevent="AddTodo">
        <label for="ToDo">Tarefa:</label>
        <input type="text" name="ToDo" id="ToDo" v-model="todoContent.content">
        <button type="submit" value="Add Todo">Add</button>
      </form>
      <section v-if="Array.isArray(todos)">
        <div v-for="item in todos" :key="item.id" class="todoList">
          <span :class="item.done ? 'done' : ''" @click="item.done = !item.done" >
           {{ item.id }}: {{ item.content }}
          </span>
          <button @click="removeToDo(item)">x</button>
        </div>
        <button class="clear" @click="todos=[]">Limpar tudo</button>
      </section>
    </section>
    
  </main>

</template>

<style scoped>
.create-todo{
  display: flex;
  flex-direction: column;
  text-align: left;
}
.create-todo button{
  margin-top: 10px;
}
.todoList{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}
.done{
  text-decoration: line-through;
}
.clear{
  margin-top: 10px;
  background: #f00;
}
</style>
