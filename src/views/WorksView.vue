<script setup>
import worksData from '@/data.json'
import TheAppMenu from '@/components/TheAppMenu.vue'
import ThumbnailLink from '@/components/ThumbnailLink.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const path = route.path
const routeFilter = ref(route.params.filter)

import { ref, computed, watch } from 'vue'
const works = worksData

watch(
  () => route.params.filter,
  (newFilter) => {
    filteredWorks.value = sortWorks(newFilter)
  }
)

import { getYears, getProjects, normalizeProjectName } from '@/utils'
const years = getYears()
const projects = getProjects()
const normalizedProjects = normalizeProjectName()

let worksNumber = ref(20)
let filteredWorks = ref(sortWorks(routeFilter.value))
const lastWorks = computed(() => works.slice(-worksNumber.value).reverse())
const selectedWorks = path === '/works' ? lastWorks : filteredWorks

function showMoreWorks() {
  worksNumber.value += 20
  if (worksNumber.value > works.length) {
    console.log('plus rien à monter')
  }
}

function sortWorks(filter) {
  if (years.includes(filter)) {
    return filterByYear(filter)
  }
  if (normalizedProjects.includes(filter)) {
    for (let i = 0; i < projects.length; i++) {
      if (normalizedProjects[i] === filter) {
        return filterByProject(projects[i])
      }
    }
  }
}

function filterByYear(year) {
  let filteredWorks = []
  filteredWorks = works.filter((work) => work.year === year)
  return filteredWorks
}

function filterByProject(project) {
  let filteredWorks = []
  filteredWorks = works.filter((work) => work.project === project)
  return filteredWorks
}
</script>

<template>
  <TheAppMenu></TheAppMenu>
  <main class="works__main main--scroll-x">
    <h1 class="works__title title--vertical" id="title">
      {{ path === '/works' ? '&OElig;uvres récentes' : route.params.filter }}
    </h1>
    <ThumbnailLink
      v-for="work in selectedWorks"
      :key="work.id"
      :url="work.urlSlug"
      :srcset="work.icon.webp_png"
      :src="work.icon.jpeg"
      :title="work.title"
      :width="work.icon.width"
      :height="work.icon.height"
      :shadow="work.display.hasShadow"
      :hanging="work.display.hanging"
    ></ThumbnailLink>
    <div class="action-bar">
      <button
        v-if="worksNumber < works.length"
        class="action-bar__see-more-button"
        @click="showMoreWorks"
      >
        Voir <span>+</span>
      </button>
      <a class="action-bar__return-link" href="#title">Retour <span>&uarr;</span></a>
    </div>
  </main>
</template>

<style>
.works__main {
  gap: 16px;
  width: 100vw;
}
.works__title {
  font-size: 17vw;
  color: lightgrey;
  translate: -3.5vw;
}
.action-bar {
  writing-mode: vertical-lr;
  display: flex;
  align-items: center;
  font-family: 'Questrial', serif;
  font-size: 2rem;
  font-weight: 700;

  & .action-bar__see-more-button,
  .action-bar__return-link {
    transform: rotateZ(180deg);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100%;
    width: calc(10vw + 30px);
    transition: color 150ms ease;

    &:hover {
      color: rgb(26, 179, 234);
      transition: color 150ms ease;
    }
    &:focus-visible {
      color: rgb(26, 179, 234);
      transition: color 150ms ease;
    }
  }
  & .action-bar__see-more-button {
    background: inherit;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    border: none;
    outline: none;
    & span {
      translate: 1vw 0;
    }
  }
}

/******* TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET *******/
@media screen and (767px < width < 1024px) {
  .works__title {
    font-size: 12vw;
    translate: -2vw;
  }
}
/******* LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP *******/
@media screen and (1024px <= width) {
  .works__title {
    font-size: 5vw;
    translate: -1vw;
  }
}
/* .low-title {
  translate: 10vw;
  align-self: end;
} */
</style>
