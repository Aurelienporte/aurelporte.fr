<script setup>
import IconBlueSky from './icons/IconBlueSky.vue'
import IconBlueskyColor from './icons/IconBlueskyColor.vue'
import IconPixelfed from './icons/IconPixelfed.vue'
import IconPixelfedColor from './icons/IconPixelfedColor.vue'

defineProps({
  social: {
    type: String,
    required: true
  },
  url: { type: String, required: true }
})
</script>

<template>
  <a class="socials__link" :href="url"
    ><span v-if="social === 'pixelfed'" class="socials__container"
      ><IconPixelfed class="socials__icon" /><IconPixelfedColor class="socials__icon"
    /></span>
    <span v-if="social === 'bluesky'" class="socials__container"
      ><IconBlueSky class="socials__icon" /><IconBlueskyColor class="socials__icon" /></span
    >{{ social }}</a
  >
</template>
<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/

.socials__link {
  display: flex;
  align-items: center;
  gap: 5px;
}
.socials__container {
  display: grid;
  place-content: center;

  & .socials__icon {
    grid-area: 1/1;
    height: 32px;
    width: 32px;

    &:nth-child(2) {
      opacity: 0;
      transition: opacity 200ms ease;
    }
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) {
  .socials__link {
    & .socials__icon {
      height: 40px;
      width: 40px;
    }
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
      transition: all 200ms ease;

      & .socials__icon {
        &:nth-child(2) {
          opacity: 1;
          transition: opacity 200ms ease;
        }
      }
    }
  }
}
</style>
