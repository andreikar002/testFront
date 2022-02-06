<template>
  <div v-if="!result" class="test">
    <h2>{{ question.title }}</h2>
    <ul>
      <li
        v-for="(answer, index) in question.answers"
        :key="index"
      >
        <input type="radio" name="answer" :value="index" v-model="answers">
        <p>{{ answer.title }}</p>
      </li>
    </ul>
    <div class="test-buttons">
      <!-- <ButtonMini @click="prevQuestion">Назад</ButtonMini> -->
      <ButtonMini v-if="answers > -1 && test.questions.findIndex(e => e.id == question.id) < test.questions.length - 1" @click="nextQuestion()">Вперед</ButtonMini>
      <ButtonMini @click="endTest">Закончить тестирование</ButtonMini>
    </div>
  </div>
  <div v-else class="home">
     <div class="home-data">
        <div class="test-result">
          <h1>Результаты вашего тестирования:</h1>
          <ul>
            <li>
              <b>Состояние:</b>
            </li>
            <li>Завершено</li>
            <br>
            <li>
              <b>Оценка: {{ result.mark }}</b>
            </li>
            <li>{{ result.true_answers_count }} из {{ result.questions_count }} ({{ result.persents }}%)</li>
          </ul>
          <ButtonMini style="margin-top: 60px" @click="reloadPage">Пройти еще раз</ButtonMini>
        </div>
     </div>
     <img src="/home/result.png" class="home-illustration" @dragstart="$event.preventDefault()">
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import {
  defineComponent, ref, useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  async fetch({ store, route, error }) {
    const testResponse = await store.dispatch('tests/load', route.params.id)
    console.log(testResponse)
    if (testResponse.status != 200)
      error({ statusCode: 404 })
  },

  setup() {
    const store = useStore()

    const result = ref(null)

    const answers = ref(-1)
    return { answers, result }
  },

  methods: {
    loadAnswers() {
      const currentAnswer = this.testAnswers.find((item: any) => item.question_id == this.question.id)
      console.log(currentAnswer, this.testAnswers, this.question)
      if (currentAnswer)
        this.answers = this.question.answers.indexOf(currentAnswer);
    },

    nextQuestion() {
      this.$store.commit('tests/addAnswer', this.question.answers[this.answers])
      this.$store.commit('tests/nextQuestion')
      this.answers = -1

      // this.loadAnswers();
    },

    prevQuestion() {
      this.$store.commit('tests/prevQuestion')
      this.answers = -1

      this.loadAnswers();
    },

    reloadPage() {
      window.location.reload()
    },

    async endTest() {
      this.$store.commit('tests/addAnswer', this.question.answers[this.answers])

      const result = await this.$axios.post(`/v1/tests/${this.test.id}`, {
        answers: this.testAnswers
      })
      this.result = result.data
    }
  },

  computed: {
    ...mapGetters({
      test: 'tests/test',
      testAnswers: 'tests/answers',
      question: 'tests/question',
    })
  }
})
</script>
