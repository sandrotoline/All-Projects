<template>
    <div>
        <section class="board">
            Player <span>{{playerScore}}</span> x <span>{{computerScore}}</span> Computer 
        </section>
        <hr>
    </div>
</template>

<script>
export default {
   props:{
    playerScore: Number,
    computerScore: Number
   }
}
</script>

<style lang="scss" scoped>
    .board{
        padding-bottom: 20px;
        span{
            border: solid 1px;
            padding: 5px 10px;
            font-weight: bold;
            margin: 0 5px;
        }
    }
</style>