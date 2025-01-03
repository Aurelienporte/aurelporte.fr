<script setup>
import worksData from '@/data.json'
import TheAppMenu from '@/components/TheAppMenu.vue'
import ThumbnailLink from '@/components/ThumbnailLink.vue'
const works = worksData
</script>

<template>
  <TheAppMenu></TheAppMenu>
  <div class="about">
    <h1>This is the h1</h1>
    <ThumbnailLink
      v-for="work in works"
      :key="work.id"
      :url="work.urlSlug"
      :srcset="work.icon.webp_png"
      :src="work.icon.jpeg"
      :title="work.title"
      :width="work.icon.width"
      :height="work.icon.height"
      :shadow="work.display.hasShadow"
      :hanging="work.display.hanging"
    ></ThumbnailLink>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
