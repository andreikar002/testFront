<template>
  <button 
    @click="$emit('click', $event)"
    class="btn-mini"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return { }
  },
})
</script>
