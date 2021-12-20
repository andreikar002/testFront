<template>
  <div class="test">
    <h2>{{ question.title }}</h2>
    <ul>
      <li
        v-for="(answer, index) in question.answers"
        :key="index"
      >
        <p>{{ answer.title }}</p>
        <input type="radio" name="answer" :value="index" v-model="answers">
      </li>
    </ul>
    <div class="test-buttons">
      <ButtonMini @click="prevQuestion()">Назад</ButtonMini>
      <ButtonMini v-if="answers > -1" @click="nextQuestion()">Вперед</ButtonMini>
      <ButtonMini>Закончить тестирование</ButtonMini>
    </div>
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
    if (testResponse.status != 200)
      error({ statusCode: 404 })
  },

  setup() {
    const store = useStore()
    
    const answers = ref(-1)
    return { answers }
  },

  methods: {
    nextQuestion() {
      this.$store.commit('tests/nextQuestion')
      this.$store.commit('tests/addAnswer', this.question.answers[this.answers])
      this.answers = -1
    },

    prevQuestion() {
      this.$store.commit('tests/prevQuestion')
      this.answers = -1
    }
  },

  computed: {
    ...mapGetters({
      test: 'tests/test',
      question: 'tests/question'
    })
  }
})
</script>
