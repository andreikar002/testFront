<template>
  <div class="results">
    <h1>Результаты:</h1>
    <div v-for="(result, index) in results" :key="index">
      <p>
        <b>{{ result.test.title }}: </b>
        Оценка {{ result.mark }}/5 ({{ result.percents }}%)
      </p>
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
    
    const results = ref([])

    $axios.get('/v1/user/results').then((data) => results.value = data.data)

    return { results }
  },
})
</script>
