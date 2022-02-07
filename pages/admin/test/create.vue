<template>
  <div class="admin">
    <div class="admin-content">
      <h1>Создание теста:</h1>
      <div class="register-form">
        <input type="text" placeholder="Название теста" v-model="testData.title" required>
        <h3 style="margin-top: 20px">Список вопросов:</h3>
        <div 
          v-for="(question, index) in testData.questions"
          :key="index"
          class="admin-question"
        >
          <input type="text" v-model="testData.questions[index].title" placeholder="Вопрос">
          <h3>Список ответов:</h3>
          <div 
            v-for="(answer, answerIndex) in testData.questions[index].answers"
            :key="answerIndex"
            class="admin-answer"
          >
            <input type="text" v-model="testData.questions[index].answers[answerIndex].title" placeholder="Ответ" required>
            <div class="admin-answer__true">
              <p>Верный ответ</p>
              <input type="checkbox" name="true" v-model="testData.questions[index].answers[answerIndex].isTrue">
            </div>
          </div>
          <ButtonMini class="light" @click="createAnswer(index)">Добавить Ответ</ButtonMini>
        </div>
        <ButtonMini @click="createQuestion" class="light">Добавить вопрос</ButtonMini>
        <ButtonMini @click="createTest">Создать тест</ButtonMini>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, useContext, useRouter, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['auth', 'isAdmin'],

  setup() {
    const router = useRouter()
    const { $axios } = useContext()

    const testData = ref({
      title: '',
      questions: []
    } as any)

    const createQuestion = () => {
      testData.value.questions.push({
        title: '',
        answers: []
      })
    }

    const createAnswer = (index: number) => {
      testData.value.questions[index].answers.push({
        title: '',
        isTrue: false
      })
    }

    const createTest = async () => {
      await $axios.post('/v1/test', testData.value)
      router.push({ name: 'admin' })
    }

    return { testData, createQuestion, createAnswer, createTest }
  },
})
</script>
