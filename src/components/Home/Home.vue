<script setup lang="ts">
import { useFetch } from '@vueuse/core'

const { isFetching, error, data } = useFetch('https://v1.hitokoto.cn/').get().json()

</script>

<template>
  <div class="home">
    <div class="font-bold">
      #{{ data?.from }}#
    </div>
    <br>
    {{ data?.hitokoto }}
    -- {{ data?.from_who ?? "佚名" }}
  </div>
</template>
