<template>
  <div class="header container">
    <ul class="header-nav">
      <li><a href="" @click="redirectTo($event, 'index')" :class="{ active: $route.name == 'index' }">Главная</a></li>
      <template v-if="isAuth">
        <li><a href="/student">Учетная карточка</a></li>
        <li><a href="/progress">Успеваемость</a></li>
      </template>
    </ul>
    <Button 
      v-if="!isAuth" 
      class="light"
      @click="$router.push({ name: 'auth' })"
    >
      Вход
    </Button>
    <Button 
      v-else
      class="light"
      @click="logout"
    >
      Выход
    </Button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, useRouter, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const isAuth = computed(() => store.getters['auth/isAuth'])

    const redirectTo = (event: any, name: string) => {
      event.preventDefault();
      return router.push({ name })
    }

    const logout = () => {
      store.dispatch('auth/logout')
      router.push({ name: 'index' })
    }

    return { redirectTo, isAuth, logout }
  },
})
</script>
