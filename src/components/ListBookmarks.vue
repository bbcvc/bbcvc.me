<script setup lang="ts">
import bookmarks from '~/modules/bookmarks.json'
const originName = (homeURL: string) => {
  if (homeURL.includes('github'))
    return 'GitHub'
  if (homeURL.includes('notion'))
    return 'Notion'
  if (homeURL.includes('twitter'))
    return 'Twitter'
  if (homeURL.includes('youtube'))
    return 'YouTube'
  if (homeURL.includes('zhihu'))
    return '知乎'
  if (homeURL.includes('weibo'))
    return '微博'
  if (homeURL.includes('juejin'))
    return '掘金'
  if (homeURL.includes('segmentfault'))
    return 'SegmentFault'
  if (homeURL.includes('csdn'))
    return 'CSDN'
  if (homeURL.includes('bilibili'))
    return 'Bilibili'
  if (homeURL.includes('douyu'))
    return '斗鱼'
  if (homeURL.includes('zcool'))
    return '站酷'
  if (homeURL.includes('dribbble'))
    return 'Dribbble'
  if (homeURL.includes('codepen'))
    return 'CodePen'
  if (homeURL.includes('jsfiddle'))
    return 'JSFiddle'
  if (homeURL.includes('codepen'))
    return 'CodePen'
  if (homeURL.includes('stackoverflow'))
    return 'Stack Overflow'
  if (homeURL.includes('weixin'))
    return 'wechart'

  return homeURL
}
</script>

<template>
  <ul class="list-none">
    <template v-if="!bookmarks.length">
      <div class="py2 op50">
        { nothing here yet }
      </div>
    </template>
    <app-link
      v-for="route in bookmarks.filter(item => !!item.targetURL)" :key="route.targetURL"
      class="item block font-normal mb-6 mt-2 no-underline"
      :to="route.targetURL"
    >
      <li class="no-underline">
        <div class="title text-lg">
          {{ route.title }}
        </div>
        <div class="time opacity-50 text-sm -mt-1">
          <span v-if="route.homeURL" class="opacity-50">· {{ originName(route.homeURL) }}</span>
        </div>
      </li>
    </app-link>
  </ul>
</template>
