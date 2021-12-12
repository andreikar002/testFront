<template>
  <div class="header container">
    <ul class="header-nav">
      <li><a href="" @click="redirectTo($event, 'index')" :class="{ active: $route.name == 'index' }">Личный кабинет</a></li>
      <li><a href="">Учетная карточка</a></li>
      <li><a href="">Успеваемость</a></li>
      <li><a href="">Сервисы</a></li>
    </ul>
    <Button class="light">Вход</Button>
  </div>
</template>
<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()

    const redirectTo = (event: any, name: string) => {
      event.preventDefault();
      return router.push({ name })
    }

    return { redirectTo }
  },
})
</script>
