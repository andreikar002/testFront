import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({ store, redirect }) => {
  if (!store.getters['auth/isAuth'] || !store.getters['auth/user'].is_admin) {
    redirect('/')
  }
})
