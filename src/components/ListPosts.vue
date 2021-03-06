<script setup lang="ts">
import { useRouter } from 'vue-router'
import { englishOnly, formatDate } from '~/logics'

export interface Post {
  path: string
  title: string
  date: string
  lang?: string
  duration?: string
}

export type oPosts = Omit<Post, 'date'>

const props = defineProps<{
  type?: string
  posts?: Post[]
}>()

const router = useRouter()
const routes: Post[] = router.getRoutes()
  .filter(i => i.path.startsWith('/posts') && i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type === props.type)
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    lang: i.meta.frontmatter.lang,
    duration: i.meta.frontmatter.duration,
  }))

const posts = computed(() => (props.posts || routes).filter(i => !englishOnly.value || i.lang !== 'zh'))

const oRoutes: oPosts[] = router.getRoutes()
  .filter(i => (i.path.startsWith('/posts') && !i.meta.frontmatter.date))
  .filter(i => !i.path.endsWith('.html') && i.meta.frontmatter.type === props.type)
  .filter(i => i.name !== 'posts')
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    lang: i.meta.frontmatter.lang,
    duration: i.meta.frontmatter.duration,
  }))
</script>

<template>
  <ul class="list-none">
    <template v-if="!posts.length">
      <div class="py2 op50">
        { nothing here yet }
      </div>
    </template>
    <app-link
      v-for="route in posts" :key="route.path"
      class="item block font-normal mb-6 mt-2 no-underline"
      :to="route.path"
    >
      <li class="no-underline">
        <div class="title text-lg">
          {{ route.title }}
          <sup
            v-if="route.lang === 'en'"
            class="text-xs border border-current rounded px-1 pb-0.2"
          >英文</sup>
          <sup
            v-else
            class="text-xs border border-current rounded px-1 pb-0.2"
          >中文</sup>
        </div>
        <div class="time opacity-50 text-sm -mt-1">
          {{ formatDate(route.date) }}
          <span v-if="route.duration" class="opacity-50">· {{ route.duration }}</span>
        </div>
      </li>
    </app-link>
    <a class="no-underline list-none" v-if="oRoutes.length > 0">很久以前...</a>
    <app-link
      v-for="route in oRoutes" :key="route.path"
      class="item block font-normal mb-6 mt-2 no-underline"
      :to="route.path"
    >
      <li class="no-underline">
        <div class="title text-lg">
          {{ route.title }}
        </div>
        <div class="time opacity-50 text-sm -mt-1">
          <span v-if="route.duration" class="opacity-50">· {{ route.duration }}</span>
        </div>
      </li>
    </app-link>
  </ul>
</template>
