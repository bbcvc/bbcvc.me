<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'bbcvc' },
    { name: 'description', content: 'bbcvc\'s Portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@Eric55718370' },
  ],
})
</script>

<template>
  <NavBar />
  <main class="px-7 py-10">
    <router-view />
    <Footer />
  </main>
</template>
