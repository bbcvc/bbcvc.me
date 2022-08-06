<script setup lang="ts">
import bookmarks from '~/modules/bookmarks.json'
</script>

<template>
  <ul class="list-none">
    <template v-if="!bookmarks.length">
      <div class="py2 op50">
        { nothing here yet }
      </div>
    </template>
    <app-link
      v-for="route in bookmarks" :key="route.path"
      class="item block font-normal mb-6 mt-2 no-underline"
      :to="route.path"
    >
      <li class="no-underline">
        <div class="title text-lg">
          {{ route.title }}
        </div>
        <div class="time opacity-50 text-sm -mt-1">
          <span v-if="route.origin" class="opacity-50">· {{ route.origin }}</span>
        </div>
      </li>
    </app-link>
  </ul>
</template>
