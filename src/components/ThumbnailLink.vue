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
  <RouterLink
    :to="`/works/${url}`"
    :class="{
      'thumbnail__link--high': hanging.high,
      'thumbnail__link--low': hanging.low,
      'thumbnail__link--floor': hanging.floor
    }"
    class="thumbnail__link"
  >
    <picture>
      <source :srcset="`/thumbnails/${srcset}`" :type="getType(srcset)" />
      <img
        class="thumbnail__img"
        :class="{
          'thumbnail__img--no-shadow': !shadow
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
  filter: drop-shadow(-5px -1px 5px #fff) drop-shadow(0 7px 5px #0003)
    drop-shadow(2px 4px 5px #0002);
}
.thumbnail__img--no-shadow {
  filter: initial;
}
.thumbnail__link {
  height: fit-content;
  align-self: center;
}
.thumbnail__link--hight {
  align-self: flex-start;
}
.thumbnail__link--low {
  margin-bottom: 50px;
  align-self: flex-end;
}
.thumbnail__link--floor {
  align-self: flex-end;
}
</style>
