<script setup>
import { getType } from '@/utils'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  images: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <section class="artwork__img">
    <picture>
      <source
        :srcset="`/images/${props.images.small.webp}`"
        :type="getType(props.images.small.webp)"
      />
      <img
        :src="`../../public/images/${props.images.small.jpeg}`"
        :alt="`Lien vers ${title}`"
        :width="props.images.small.width"
        :height="props.images.small.height"
      />
    </picture>
    <div class="dots-row">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span
      ><span class="dot"></span>
    </div>
  </section>
</template>
<style scoped>
.artwork__img {
  width: 90vw;
  & img {
    width: 100%;
  }
}
</style>
