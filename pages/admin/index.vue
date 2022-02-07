<template>
  <div class="admin">
    <div class="admin-content">
      <h1>Список тестов:</h1>
      <ul>
        <li v-for="(test, index) in tests" :key="index">{{ test.title }}</li>
      </ul>
      <ButtonMini @click="$router.push({ name: 'admin-test-create' })">Создать тест</ButtonMini>
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
    const { $axios } = useContext()
    
    const tests = ref([])

    $axios.get('/v1/tests').then((data) => tests.value = data.data)

    return { tests }
  },
})
</script>
