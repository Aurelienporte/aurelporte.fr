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
  <div class="artwork">
    <picture class="artwork__container">
      <source
        :srcset="`/images/${props.images.large.webp} ${props.images.large.width}w`"
        :type="getType(props.images.small.webp)"
        media="(min-width: 1024px) and (orientation: landscape)"
      />
      <source
        :srcset="`/images/${props.images.medium.webp} ${props.images.medium.width}w`"
        :type="getType(props.images.small.webp)"
        media="(min-width: 768px)"
      />
      <source :srcset="`/images/${props.images.small.webp} ${props.images.small.width}w`" />
      <img
        class="artwork__img"
        :srcset="`/images/${props.images.large.jpeg} ${props.images.large.width}w, /images/${props.images.medium.jpeg} ${props.images.medium.width}w, /images/${props.images.small.jpeg} ${props.images.small.width}w`"
        sizes="(min-width: 1024px) and (orientation: landscape) 40vw, (min-width: 768px) 75vw, 100vw"
        :src="`/images/${props.images.large.jpeg}`"
        :alt="`Photo de l'oeuvre ${title}`"
        :width="props.images.small.width"
        :height="props.images.small.height"
      />
    </picture>
    <div class="dots-row">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span
      ><span class="dot"></span>
    </div>
  </div>
</template>
<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.artwork {
  & .artwork__container {
    display: grid;
    justify-items: center;
  }
  & .artwork__img {
    width: 100%;
    height: auto;
    max-height: 60vh;
    border-radius: 2px;
    filter: drop-shadow(4px 7px 4px #0007);
  }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
  .artwork {
    & .artwork__img {
      height: auto;
      max-height: 68vh;
      width: 75%;
    }
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  .artwork {
    & .artwork__img {
      max-height: 70vh;
      translate: 0 -5vh; /*centered in screen (banner = 10vh) */
      filter: drop-shadow(-4px 7px 4px #0007);
    }
  }
}
</style>
