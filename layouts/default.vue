<template>
  <div
    class="main_container"
    :class="{ flex_support: flexSupport, no_flex_support: !flexSupport, bg: true }"
  >
    <Header />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const flexSupport = ref(false)
    const checkFlexGap = () => {
      const flex = document.createElement('div')
      flex.style.display = 'flex'
      flex.style.flexDirection = 'column'
      flex.style.rowGap = '1px'
      flex.appendChild(document.createElement('div'))
      flex.appendChild(document.createElement('div'))
      document.body.appendChild(flex)
      const isSupported = flex.scrollHeight === 1
      flex.parentNode!.removeChild(flex)
      return isSupported
    }
    onMounted(() => {
      flexSupport.value = checkFlexGap()
    })
    return { flexSupport }
  },
})
</script>
