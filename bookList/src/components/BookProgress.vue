<template>
    <div class="books-read">
        <label for="progress">Seu Progresso</label><br>
        <progress :value="booksRead" :max="books.length"></progress>
        <p>{{booksReadMessage}}</p>
    </div>
</template>

<script setup>
    import {computed} from 'vue';
    
    const props = defineProps(['books']);
    
    const booksRead = computed(() => {
        return props.books.filter(item => item.isRead).length
    })
    const booksReadMessage = computed(() => {
        return booksRead.value >= props.books.length ? 
            'Parabéns, Você leu todos os livros!' :
            `${booksRead.value} de ${props.books.length} livros`
    })

</script>

<style lang="scss" scoped>

</style>