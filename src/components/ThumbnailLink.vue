<script setup>
import { RouterLink } from 'vue-router'
import { getType } from '@/utils'
import { reactive, computed } from 'vue'

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
const url = reactive(props)
const path = computed(() => {
  return props.filter ? `/works/explorer/${props.filter}/${url.url}` : `/works/${url.url}`
})
</script>
<template>
  <RouterLink
    :to="path"
    :style="{
      '--x': hanging.x,
      '--y': hanging.y,
      '--leftGap': hanging.leftGap
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
  filter: drop-shadow(4px 5px 2px rgba(50, 55, 68, 0.4));
  transition: all ease-in 150ms;
  &:hover {
    transform: scale(1.1);
    filter: contrast(1.1);
    transition: all ease-in-out 100ms;
  }
}
.thumbnail__img--no-shadow {
  filter: none;
}
.thumbnail__link {
  height: fit-content;
  transform: translate(var(--x), var(--y));
  margin-left: var(--leftGap);

  &:focus-visible {
    transform: translate(var(--x), var(--y)) scale(1.1);
    filter: contrast(1.1);
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
