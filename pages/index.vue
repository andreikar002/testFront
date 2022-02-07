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
        <ButtonMini class="home-data__action" @click="redirectToTest">Пройти тест</ButtonMini>
        <ButtonMini class="home-data__action light" @click="downloadFile" style="margin-left: 10px;">Скачать материал</ButtonMini>
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
    const redirectToTest = () => {
      window.location.replace('/tests');
    }

    const downloadFile = () => {
      window.open('/neyroseti_nachalnaya_informatsia.docx', '_blank')
    }

    return { redirectToTest, downloadFile }
  },
})
</script>
