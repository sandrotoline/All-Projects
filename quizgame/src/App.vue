<script>
import ScoreBoard from './components/ScoreBoard.vue'

export default {
  name: 'App',
  
  components :{
    ScoreBoard
  },

  data() {
    return{
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
      chosenAnswer: undefined,
      submited: false,
      message : undefined,
      winCount: 0,
      loseCount: 0
    }
  },

  methods:{
    confirmAnswer() {
      if(!this.chosenAnswer){
        alert('Please choose an answer')
      } else {
        this.submited = true
        if(this.chosenAnswer === this.correctAnswer){
          this.message = `&#9989; Congratulations, the answer ${this.correctAnswer} is correct.`
          this.winCount++
        } else {
          this.message = `&#10060; I'm Sorry, you picked wrong answer. The correct is ${this.correctAnswer}`
          this.loseCount++
        }
      }
    },
    newQuestion() {
      this.submited = false;
      this.chosenAnswer = undefined;
      this.question = undefined;
      try{
        this.axios
        .get('https://opentdb.com/api.php?amount=1&category=21')
        .then((response) => {
          this.question = response.data.results[0].question,
          this.incorrectAnswers = response.data.results[0].incorrect_answers,
          this.correctAnswer = response.data.results[0].correct_answer
        })
      } catch(error) {
          console.error(error);
      }
    }
  },

  computed:{
    answers(){
      var answers = [...this.incorrectAnswers];
      answers.splice(Math.round(Math.random() * answers.length),0,this.correctAnswer);
      return answers;
    }
  },

  created(){
    this.newQuestion();
    this.winCount = localStorage.getItem('win') || 0;
    this.loseCount = localStorage.getItem('lose') || 0 ;
  },

  updated() {
      localStorage.setItem('win', this.winCount);
      localStorage.setItem('lose', this.loseCount);
  }

}
</script>
<template>
  <div>
    <ScoreBoard :playerScore=this.winCount :computerScore=this.loseCount />
    <div class="container" v-if="this.question">
      <h1 v-html="this.question" />
        <div v-for="(item, index) in this.answers" :key="index">
          <input
              :disabled="submited"
              type="radio" 
              name="options" 
              :value="item" 
              v-model="chosenAnswer"
            >
          <label v-html="item" /><br>
        </div>

        <button v-if="!submited" class="button button__send" @click="confirmAnswer()">Confirm</button>

        <section v-if="submited">
          <h2 v-html="this.message"/>
          <button class="button button__next" @click="newQuestion()">Next Question</button>
        </section>

    </div>
  </div>
</template>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 40px 0 60px;

  .container {
    max-width: 1600px;
    margin: 60px auto;
  }
  .button{
    padding: 10px 40px;
    border: none;
    margin: 10px 0;
    cursor: pointer;
      &__send{
        background: #4ead00;
        color: #fff;
      }
      &__next{
        background: #144484;
        color: #fff;
      }
  }

  input[type=radio]{
      margin: 12px 4px;
  }
}

</style>
