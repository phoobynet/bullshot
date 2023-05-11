<script setup lang="ts">
import { computed } from 'vue'
import numeral from 'numeral'

const props = defineProps<{ amount?: number }>()

const price = computed(() => {
  return numeral(props.amount).format('$0,0.00')
})
</script>

<template>
  <span class="money">{{ price }}</span>
</template>

<style scoped>
.money {
  @apply tabular-nums;
}
</style>
