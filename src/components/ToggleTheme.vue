<script setup lang='ts'>
import { isDark } from '~/logics'

function toggleDark() {
  isDark.value = !isDark.value
}

watchEffect(() => {
  if (isDark.value) {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#111111')
  } else {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff')
  }
})
</script>

<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark">
    <ri-moon-line v-show="isDark" />
    <ri-sun-line v-show="!isDark" />
  </a>
</template>
