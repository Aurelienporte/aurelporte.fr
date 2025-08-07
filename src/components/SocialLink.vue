<script setup>
import BlueSkyIcon from './icons/BlueSkyIcon.vue'
import BlueskyColorIcon from './icons/BlueskyColorIcon.vue'
import PixelfedIcon from './icons/PixelfedIcon.vue'
import PixelfedColorIcon from './icons/PixelfedColorIcon.vue'

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
    ><span v-if="social === 'Pixelfed'" class="socials__container"
      ><PixelfedIcon class="socials__icon" /><PixelfedColorIcon class="socials__icon"
    /></span>
    <span v-if="social === 'Bluesky'" class="socials__container"
      ><BlueSkyIcon class="socials__icon" /><BlueskyColorIcon class="socials__icon" /></span
    ><span class="socials__name">{{ social }}</span></a
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
    padding: 4px;

    & .socials__icon {
      height: 32px;
      width: 32px;
    }
    & .socials__name {
      position: relative;
    }
    & .socials__name::after {
      height: 2px;
      width: 0;
      content: '';
      position: absolute;
      right: 0;
      bottom: -1px;
      background-color: var(--saillanceColor);
    }
    &:hover {
      .socials__name::after {
        width: 100%;
        transition: width 200ms ease;
      }

      color: var(--saillanceColor);
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
