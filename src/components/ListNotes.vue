<script setup lang="ts">
import { useRouter } from 'vue-router'
import { englishOnly, formatDate } from '~/logics'

export interface Note {
  path: string
  title: string
  date: string
  lang?: string
  duration?: string
  img?: string
}

const props = defineProps<{
  type?: string
  notes?: Note[]
}>()

const router = useRouter()
const routes: Note[] = router.getRoutes()
  .filter(i => i.path.startsWith('/notes') && i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type === props.type)
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    lang: i.meta.frontmatter.lang,
    duration: i.meta.frontmatter.duration,
    img: i.meta.frontmatter.img,
  }))

const posts = computed(() => (props.notes || routes).filter(i => !englishOnly.value || i.lang !== 'zh'))
</script>

<template>
  <ul class="flex flex-wrap">
    <template v-if="!posts.length">
      <div class="py2 op50">
        { nothing here yet }
      </div>
    </template>
    <div
      v-for="route in posts" :key="route.path"
      class="sm:max-w-30ch bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-16px mr-8px"
    >
      <app-lick href="#">
        <img
          class="rounded-t-lg"
          :src="route.img"
          alt=""
          style="margin: 0;"
        >
      </app-lick>
      <div class="p-5">
        <app-lick href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ route.title }}
          </h5>
        </app-lick>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ route.duration || '-' }}
        </p>
        <app-link :to="route.path" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center !text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </app-link>
      </div>
    </div>
  </ul>
</template>
