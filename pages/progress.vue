<template>
  <div class="progress">
    <h1>Ваша успеваемость:</h1>
    <div class="progress-content">
      <h2>{{ progress }}%</h2>
      <p v-if="progress < 40" style="color: red">Старайся лучше!</p>
      <p v-else-if="progress >= 40 && progress < 60" style="color: orange">Довольно неплохо!</p>
      <p v-else-if="progress >= 60 && progress < 75" style="color: orange">Хорошо</p>
      <p v-else style="color: green">Отлично! Так держать!</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['auth'],
  
  setup() {
    const { $axios } = useContext()
    
    const progress = ref(0)

    $axios.get('/v1/user/results').then((data) => {
      var sum = 0
      for (const result of data.data) {
        sum += result.mark
      }
      const result = (sum / (data.data.length * 5)) * 100
      progress.value = Math.round(result)
    })

    return { progress }
  },
})
</script>
