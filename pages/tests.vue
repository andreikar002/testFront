<template>
  <div class="tests">
    <div class="admin-content">
      <h1>Список доступных тестов:</h1>
      <div v-for="(test, index) in tests" :key="index">
        <ButtonMini @click="$router.push({ name: 'test-id', params: { id: test.id } })">{{ test.title }}</ButtonMini>
      </div>
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
  setup() {
    const { $axios } = useContext()
    
    const tests = ref([])

    $axios.get('/v1/tests').then((data) => tests.value = data.data)

    return { tests }
  },
})
</script>
