<script setup>

</script>


<template>
   <nav>
        <h1>Estudos</h1>
        <ul class="nav-links">
            <li>Posts</li>
            <li>Contador</li>
            <li>Formulario</li>
            <li>Slider</li>
            <li>ToDo</li>
        </ul>
   </nav>
</template>
<style scoped>
    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px;
        border-bottom: solid 1px #666;
        box-shadow: 0 0 4px rgba(0,0,0,0.5);
    }
    ul{
        list-style: none;
        display: flex;
    }
    ul li {
        padding: 0 5px;
    }
</style>