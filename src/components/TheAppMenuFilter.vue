<script setup>
import { RouterLink } from 'vue-router'
import { normalizeName } from '@/utils'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import IconChevronRight from './icons/IconChevronRight.vue'

const route = useRoute()
let param = ref(route.params.filter)
watch(
  () => route.params.filter,
  (newFilter) => {
    param.value = newFilter
  }
)

defineProps({
  name: {
    type: String,
    required: true
  },
  filters: {
    type: Array,
    required: true
  },
  listName: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['toogle'])
function isToogled(payload) {
  emits('toogle', payload)
}
</script>
<template>
  <li class="filter">
    <div class="filter__container">
      <button :class="{ active: visible }" class="filter__title" @click="isToogled(listName)">
        <span>
          {{ name }}
        </span>
        <IconChevronRight class="title__chevron" :class="{ rotated: visible }"></IconChevronRight>
      </button>
    </div>
    <ol class="filter__list" :class="{ visible: visible }">
      <li v-for="filter in filters" :key="filter" class="filter__item">
        <RouterLink
          class="filter__label"
          :to="
            param === `${normalizeName(filter)}`
              ? '/works'
              : `/works/explorer/${normalizeName(filter)}`
          "
          >{{ filter }}</RouterLink
        >
      </li>
    </ol>
  </li>
</template>
<style scoped>
/****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/
.filter {
  & .filter__container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
    border-width: 1px;
    border-style: solid;
    border-image-source: linear-gradient(90deg, transparent 10%, gray 20% 80%, transparent 90%);
    border-image-slice: 0 0 1;
    border-image-width: 1px;
    border-bottom: 1px solid gray;
  }
  & .filter__title {
    --buttonHeight: 40px;
    --error: 2px;

    display: flex;
    align-items: center;
    height: var(--buttonHeight);
    padding: 5px 8px;
    font-weight: 400;
    cursor: pointer;

    & span {
      font-size: 1rem;
    }
    &.active {
      font-weight: 700;
      color: var(--saillanceColor);
    }
    & .title__chevron {
      align-self: flex-start;
      translate: 0 calc((var(--buttonHeight) / 2 - var(--error)) - 50%);
      transition: rotate 200ms ease;
    }
    & .rotated {
      rotate: 90deg;
      transition: rotate 200ms ease;
      fill: var(--saillanceColor);
    }
  }
}
.filter__list {
  height: auto;
  max-height: 0vh;
  transition: all 400ms ease;
  overflow: hidden;
  margin-top: 0;

  & .router-link-active {
    font-weight: 700;
    color: var(--saillanceColor);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 5px;
  }
  & .filter__item {
    display: flex;
    justify-content: center;
  }
  & .filter__label {
    padding: 10px 5px;
  }
}
.visible {
  height: auto;
  max-height: 80vh;
  margin-top: 16px;
  transition: all 300ms ease;
}
/******* TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET *******/
@media screen and (767px < width < 1024px) {
  .filter {
    & .filter__container {
      border-image-source: linear-gradient(90deg, transparent 0, gray 20% 80%, transparent 100%);
    }
    & .filter__title {
      & span {
        font-size: 1.5rem;
      }
    }
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  .filter {
    & .filter__container {
      justify-content: space-between;
      border-image-width: 2px;
      /*for unkwnown reasons border-image is not displayed if width is under 2px */
      border-image-source: linear-gradient(90deg, transparent 0%, gray 20% 80%, transparent 100%);

      &:hover .filter__title {
        font-weight: 700;
        transition: font-weight 0.2s ease;
      }
      &:hover .filter__chevron {
        fill: black;
        transition: fill 0.2s ease;
      }
      &::after,
      &::before {
        content: '';
        height: 0vh;
        width: 4px;
        transition: height 0.4s ease;
        align-self: center;
      }

      &:hover {
        &::after,
        &::before {
          height: 10vh;
          transition: height 0.4s ease;
          background: linear-gradient(transparent 10%, black 20% 80%, transparent 90%);
        }
      }
    }
    & .filter__title {
      --error: 1px;
      transition: font-weight 0.2s ease;

      & span {
        font-size: 1.5rem;
      }
    }
  }
  .filter__list {
    & .filter__label:hover {
      font-weight: 700;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
      transition: all 200ms ease;
    }
  }
}
</style>
