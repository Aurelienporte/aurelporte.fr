<script setup>
import { getType } from '@/utils'
defineProps({
  title: {
    type: String,
    required: true
  },
  srcset: { type: String, required: true },
  src: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: false
  }
})
</script>
<template>
  <div class="artwork__img">
    <picture>
      <source :srcset="`/images/${srcset}`" :type="getType(srcset)" />
      <img
        :src="`../../public/images/${src}`"
        :alt="`Lien vers ${title}`"
        :width="width"
        :height="height"
      />
    </picture>
    <div class="dots-row">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span
      ><span class="dot"></span>
    </div>
  </div>
</template>
