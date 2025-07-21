<script setup>
import TheAppMenuFilter from './TheAppMenuFilter.vue'
import { getYears } from '@/utils'
import { getProjects } from '@/utils'
import { ref } from 'vue'
import IconArrowBack from './icons/IconArrowBack.vue'
import MenuItem from './MenuItem.vue'

const years = getYears()
const projects = getProjects()
const emit = defineEmits(['visible'])
function showMainMenu() {
  emit('visible')
}

let isYearsVisible = ref(false)
let isProjectsVisible = ref(false)

function toogleList(listName) {
  if (listName === 'years') {
    isYearsVisible.value = !isYearsVisible.value
    isProjectsVisible.value = false
  }
  if (listName === 'projects') {
    isProjectsVisible.value = !isProjectsVisible.value
    isYearsVisible.value = false
  }
}
</script>
<template>
  <ul class="filter-menu">
    <TheAppMenuFilter
      name="Par années"
      :filters="years"
      id="years"
      listName="years"
      :visible="isYearsVisible"
      @toogle="toogleList($event)"
    ></TheAppMenuFilter>
    <TheAppMenuFilter
      name="Par projets"
      :filters="projects"
      id="projects"
      list-name="projects"
      :visible="isProjectsVisible"
      @toogle="toogleList($event)"
    ></TheAppMenuFilter>
    <MenuItem>
      <button @click="showMainMenu" class="navigation-menu__button filter-menu__back-button">
        <IconArrowBack class="back-button__arrow-back"></IconArrowBack> Retour
      </button>
    </MenuItem>
  </ul>
</template>

<style>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.filter-menu {
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  transition: justify-content 150ms ease-out;

  &:has(.visible) {
    justify-content: flex-start;
  }
}
.filter-menu__back-button {
  & .back-button__arrow-back {
    transform: translate(0, 5px);
  }
}
#years {
  & .filter__list {
    transition: all 200ms ease;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
  }
}
#projects {
  & .filter__list {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
  }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
  .filter-menu {
    padding: 0;

    &:has(.visible) {
      justify-content: center;
    }
  }
  .filter-menu__back-button {
    grid-area: 3/1/4/2;
    align-self: center;
    justify-self: center;
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  .filter-menu {
    --inlinePadding: 48px;
    padding: 0;
    grid-template-columns: calc(25vw - var(--inlinePadding) * 2);
    grid-template-rows: repeat(3, auto);
  }
  .filter-menu__back-button {
    grid-area: 3/1/4/2;
    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;

    & .back-button__arrow-back {
      height: 24px;
      width: 24px;
      transition: all 200ms ease;
      transform: translate(-5px, 0);
    }

    &:hover {
      & .back-button__arrow-back {
        fill: black;
        scale: 1.25;
        transform: translate(-10px, 0);
        transition: all 200ms ease;
      }
    }
  }
}
</style>
