<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  url: {
    type: String,
    required: true
  },
  srcset: { type: String, required: true },
  src: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  shadow: {
    type: Boolean,
    required: true
  },
  hanging: {
    type: Object,
    required: true
  }
})
function getType(fileName) {
  let type = ''
  if (fileName.slice(-3) === 'png') {
    type = 'image/png'
  }
  if (fileName.slice(-4) === 'webp') {
    type = 'image/webp'
  }
  return type
}
</script>
<template>
  <RouterLink :to="`/works/${url}`">
    <picture>
      <source :srcset="`../../public/thumbnails/${srcset}`" :type="getType(srcset)" />
      <img
        class="thumbnail__img"
        :class="{
          'thumbnail__img--no-shadow': !shadow,
          'thumbnail__img--high': hanging.high,
          'thumbnail__img--low': hanging.low,
          'thumbnail__img--floor': hanging.floor
        }"
        :src="`../../public/thumbnails/${src}`"
        :alt="`Lien vers ${title}`"
        :width="width"
        :height="height"
      />
    </picture>
  </RouterLink>
</template>
<style scoped>
.thumbnail__img {
  border-radius: 2px;
  margin-bottom: 3rem;
  filter: drop-shadow(-5px -1px 5px #fff) drop-shadow(0 7px 5px #0003)
    drop-shadow(2px 4px 5px #0002);
}
.thumbnail__img--no-shadow {
  filter: initial;
}
.thumbnail__img--high {
  margin-bottom: 4rem;
}
.thumbnail__img--low {
  margin-bottom: 2rem;
}
.thumbnail__img--floor {
  margin-bottom: 0;
}
</style>
