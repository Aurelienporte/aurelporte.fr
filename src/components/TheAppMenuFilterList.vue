<script setup>
import TheAppMenuFilter from './TheAppMenuFilter.vue'
import { getYears } from '@/utils'
import { getProjects } from '@/utils'
import { ref } from 'vue'
import IconArrowBack from './icons/IconArrowBack.vue'

const years = getYears()
const projects = getProjects()
const emit = defineEmits(['visible'])
function showMainMenu() {
  console.log('showmainmenu tourne')
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
    <li class="filter-menu__back-item">
      <button @click="showMainMenu">
        <IconArrowBack class="back-button__arrow-back"></IconArrowBack>
      </button>
    </li>
  </ul>
</template>

<style>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.filter-menu {
  --inlinePadding: 48px;
  display: grid;
  grid-template-columns: var(--inlinePadding) calc(100vw - var(--inlinePadding) * 2) var(
      --inlinePadding
    );
  grid-template-rows: auto auto;
  place-content: center;
}
.filter-menu__back-item {
  grid-area: 1/1/3/2;
  align-self: flex-start; /*If center (and no translate) then it will move when a filter is open */
  transform: translate(0, calc((10vh + 2px) - 50%));

  & button {
    height: 28px;
    box-sizing: content-box;
    padding: 8px;
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
#years {
  grid-area: 1/2/2/3;
  & .filter__list {
    transition: all 200ms ease;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
  }
}
#projects {
  grid-area: 2/2/3/3;
  & .filter__list {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width < 1024px) {
  .filter-menu {
    --inlinePadding: 48px;
    padding: 0 var(--inlinePadding);
    grid-template-columns: calc(50vw - var(--inlinePadding) * 2);
    grid-template-rows: auto auto 10vh;
  }
  .filter-menu__back-item {
    grid-area: 3/1/4/2;
    align-self: center;
    justify-self: center;
    transform: translate(0, 0);
  }
  #years {
    grid-area: 1/1/2/2;
  }
  #projects {
    grid-area: 2/1/3/2;
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  .filter-menu {
    --inlinePadding: 48px;
    padding: 0 var(--inlinePadding);
    grid-template-columns: calc(25vw - var(--inlinePadding) * 2);
    grid-template-rows: repeat(3, auto);
  }
  .filter-menu__back-item {
    grid-area: 3/1/4/2;
    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translate(0, 0);
    height: 10vh;

    & button {
      line-height: 1.5rem;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      background-color: transparent;

      & .back-button__arrow-back {
        height: 32px;
        width: 32px;
        transition: all 200ms ease;
      }
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
      & button {
        & .back-button__arrow-back {
          fill: black;
          scale: 1.1;
          height: 32px;
          width: 32px;
          transition: all 200ms ease;
        }
      }
    }
  }
  #years {
    grid-area: 1/1/2/2;
  }
  #projects {
    grid-area: 2/1/3/2;
  }
}
</style>
