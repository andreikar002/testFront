<template>
  <div class="home">
     <div class="home-data">
        <div class="home-data__title">
          <h1>
            Тестирующая
            <br>
            система
          </h1>
          <IconHomeTitleLine />
        </div>
        <ButtonMini class="home-data__action">Пройти тест</ButtonMini>
     </div>
     <img src="/home/illustration.png" class="home-illustration" @dragstart="$event.preventDefault()">
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return { }
  },
})
</script>
