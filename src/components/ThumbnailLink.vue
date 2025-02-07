<script setup>
import { RouterLink } from 'vue-router'
import { getType } from '@/utils'

const props = defineProps({
  filter: {
    type: [Boolean, String],
    required: false
  },
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
const path = props.filter ? `/works/explorer/${props.filter}/${props.url}` : `/works/${props.url}`
</script>
<template>
  <RouterLink
    :to="path"
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
  box-shadow:
    -5px -1px 5px 0px #fff,
    0 7px 5px 0px #0003,
    2px 4px 5px 0px #0002;
  transition: all ease-in 150ms;
  &:hover {
    transform: scale(1.1);
    filter: contrast(1.1);
    transition: all ease-in-out 100ms;
  }
}
.thumbnail__img--no-shadow {
  box-shadow: none;
}
.thumbnail__link {
  height: fit-content;
  align-self: center;
  &:focus-visible {
    transform: scale(1.1);
    filter: contrast(1.1);
    transition: all ease-in-out 100ms;
    outline: 5px solid var(--saillanceColor);
    outline-offset: 10px;
  }
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
