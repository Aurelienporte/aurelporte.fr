<script setup>
import { RouterLink } from 'vue-router'
import { normalizeName } from '@/utils'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import IconChevronRight from './icons/IconChevronRight.vue'
import MenuItem from './MenuItem.vue'

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
  <MenuItem>
    <button
      :class="{ active: visible }"
      class="filter__title navigation-menu__button"
      @click="isToogled(listName)"
    >
      <IconChevronRight class="title__chevron" :class="{ rotated: visible }"></IconChevronRight>
      <span>
        {{ name }}
      </span>
    </button>
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
  </MenuItem>
</template>

<style scoped>
/****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/
.filter__title {
  display: flex;
  align-items: center;

  & .active {
    font-weight: 700;
    color: var(--saillanceColor);
  }
  & .title__chevron {
    translate: 0 1px;
    transition: rotate 200ms ease;
  }
  & .rotated {
    rotate: 90deg;
    transition: rotate 200ms ease;
    fill: var(--saillanceColor);
  }
}
.filter__list {
  height: auto;
  max-height: 0vh;
  transition: max-height 150ms ease 150ms;
  overflow: hidden;

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
  max-height: calc(var(--mainHeight) - 20vh - 96px);
  overflow: scroll;
  transition: max-height 150ms ease 150ms;
}
/******* TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET *******/
@media screen and (767px < width <= 1024px) {
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

      & .filter__title {
        --buttonHeight: calc(10vh - 2px);
        --error: -3px;

        line-height: 1.5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        transition: font-weight 0.2s ease;

        & span {
          font-size: 1.5rem;
        }
      }
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
  }
  .filter__list {
    & .filter__label {
      font-size: 1rem;
    }

    & .filter__label:hover {
      font-weight: 700;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
      transition: all 200ms ease;
    }
  }
  .visible {
    height: auto;
    max-height: calc(var(--menuHeight) - 20vh - 96px);
    overflow-x: hidden;
    overflow-y: auto;
    transition: max-height 150ms ease 150ms;
  }
}
</style>
