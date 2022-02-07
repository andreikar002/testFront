<template>
  <div class="register">
    <div class="register-content">
      <h1>Авторизация</h1>
      <a href="/register">Регистрация</a>
      <p v-if="error" class="error">{{ error }}</p>
      <div class="register-form">
        <input type="email" placeholder="E-mail" v-model="registerData.email">
        <input type="password" placeholder="Пароль" v-model="registerData.password">
        <ButtonMini @click="login">Войти</ButtonMini>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, useRouter, useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const error = ref(null as String | null)
    const registerData = ref({
      email: '',
      password: ''
    })

    const validate = () => {
      error.value = null

      if (
        !registerData.value.email ||
        !registerData.value.password
      )
        return error.value = 'Заполните все поля!'

      if (registerData.value.email.indexOf('@') == -1)
        return error.value = 'Неверный формат e-mail!'

      return true
    }

    const login = async () => {
      if (validate() !== true) return

      const response = await store.dispatch('auth/login', registerData.value)
      if (response)
        router.push({ name: 'index' })
      else
        error.value = 'Неверные имя пользователя или пароль!'
    }

    return { error, registerData, login }
  },
})
</script>
