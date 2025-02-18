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
  <section class="artwork">
    <picture>
      <source
        :srcset="`/images/${props.images.small.webp}`"
        :type="getType(props.images.small.webp)"
      />
      <img
        class="artwork__img"
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
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.artwork {
  & .artwork__img {
    width: 100%;
    max-height: 60vh;
    border-radius: 2px;
    filter: drop-shadow(4px 7px 4px #0007);
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  .artwork {
    & .artwork__img {
      translate: 0 -5vh; /*centered in screen (banner = 10vh) */
      filter: drop-shadow(-4px 7px 4px #0007);
    }
  }
}
</style>
