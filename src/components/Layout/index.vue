<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div
    class="flex items-start"
  >
    <Left />
    <slot name="center" />
    <Right />
  </div>
</template>
