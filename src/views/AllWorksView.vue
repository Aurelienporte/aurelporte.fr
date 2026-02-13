<script setup>
import worksData from '@/data.json'
import TheMenu from '@/components/TheMenu.vue'
import ThumbnailLink from '@/components/ThumbnailLink.vue'
import { useRoute } from 'vue-router'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import { useTemplateRef, ref, watch } from 'vue'
import { useScroll, useBreakpoints } from '@vueuse/core'
import { getYears, getProjects, normalizeProjectName } from '@/utils'


const route = useRoute()
const path = ref(route.path)

const works = worksData
const filterActive = ref(route.path === '/works' ? false : route.params.filter)

watch(
  () => route.path,
  (newPath) => {
    filteredWorks.value = sortWorks(newPath)
  }
)
watch(
  () => route.params.filter,
  (newFilter) => {
    filterActive.value = route.path === '/works' ? false : newFilter
  }
)

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1440,
  widescreen: 1920
})

// true or false
const mobile = breakpoints.between('mobile', 'tablet')
const tablet = breakpoints.between('tablet', 'laptop')
const laptop = breakpoints.between('laptop', 'desktop')
const desktop = breakpoints.greater('desktop')
const widescreen = breakpoints.greater('widescreen')

const years = getYears()
const projects = getProjects()
const normalizedProjects = normalizeProjectName()

let worksNumber = ref(20)

// Show enough works on widescreen in order to fill the screen and trigger horizontal scroll
if(widescreen.value) {
  worksNumber.value = 30
}

let filteredWorks = ref(sortWorks(path.value))

function showMoreWorks() {
  worksNumber.value += 20
  filteredWorks.value = sortWorks('/works')
  isArrived.value = false
  
    let offSet;
    if (mobile.value) {
      offSet = 180
    } else if (tablet.value) {
      offSet = 350
    } else if (laptop.value) {
      offSet = 500
    } else if (desktop.value) {
      offSet = 700
    }

    const scrollX = useScroll(main, { behavior: 'auto' }).x
    setTimeout(() => {
      scrollX.value += offSet
      }, 100)
    // scrollX.value += offSet
}

function sortWorks(path) {
  if (path === '/works') {
    return works.slice(-worksNumber.value).reverse()
  } else {
    let filter = route.params.filter
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
}

function filterByYear(year) {
  let filteredWorks = []
  filteredWorks = works.filter((work) => work.year === year)
  return filteredWorks
}

function filterByProject(project) {
  let filteredWorks = []
  filteredWorks = works.filter((work) => work.project === project)
  filteredWorks.sort((a, b) => {
    if (a.year < b.year) {
      return 1
    }
    if (a.year > b.year) {
      return -1
    }
    return 0
  })
  return filteredWorks
}

function resetHanging(workHanging, workWidth) {
  let hangingParams = { x: '0', y: workHanging.y, leftGap: '0' }
  if (workWidth <= 50) {
    hangingParams.leftGap = '25px'
  } else if (workWidth > 50 && workWidth <= 100) {
    hangingParams.leftGap = '50px'
  } else if (workWidth > 100 && workWidth <= 150) {
    hangingParams.leftGap = '75px'
  } else {
    hangingParams.leftGap = '100px'
  }
  return hangingParams
}

const main = useTemplateRef('main')

function scrollWithWheel(e) {
  e.preventDefault()
  const scrollX = useScroll(main, { behavior: 'smooth' }).x
  scrollX.value += e.deltaY * 10
}

const isArrived = ref(false)

function updateScroll(e) {
  e.preventDefault()
  const scrollEnd = useScroll(main).arrivedState
  isArrived.value = scrollEnd.right
}
</script>

<template>
  <TheMenu header-title="&OElig;uvres"></TheMenu>
  <main
    class="works__main main--scroll-x"
    @wheel="scrollWithWheel"
    @scroll="updateScroll"
    ref="main"
  >
    <h1 class="works__title title--vertical" id="title">
      {{ route.path === '/works' ? '&OElig;uvres récentes' : route.params.filter }}
    </h1>
    <div v-if="filterActive" class="thumbnails__container">
      <ThumbnailLink
        v-for="work in filteredWorks"
        :key="work.id"
        :filter="filterActive"
        :url="work.urlSlug"
        :srcset="work.icon.webp_png"
        :src="work.icon.jpeg"
        :title="work.title"
        :width="work.icon.width"
        :height="work.icon.height"
        :shadow="work.display.hasShadow"
        :hanging="resetHanging(work.display.hanging, work.width)"
      ></ThumbnailLink>
    </div>
    <div v-else class="thumbnails__container">
      <ThumbnailLink
        v-for="work in filteredWorks"
        :key="work.id"
        :filter="filterActive"
        :url="work.urlSlug"
        :srcset="work.icon.webp_png"
        :src="work.icon.jpeg"
        :title="work.title"
        :width="work.icon.width"
        :height="work.icon.height"
        :shadow="work.display.hasShadow"
        :hanging="work.display.hanging"
      ></ThumbnailLink>
    </div>
    <div class="action-bar" :class="{ 'action-bar--arrived': isArrived }">
      <button
        v-if="route.path === '/works' && worksNumber < works.length"
        class="action-bar__see-more-button"
        @click="showMoreWorks"
      >
        Voir <PlusIcon class="action-bar_plus-icon" />
      </button>
      <a class="action-bar__return-link" href="#title" v-if="filteredWorks.length >= 10"
        >Retour <span>&uarr;</span></a
      >
    </div>
  </main>
</template>

<style>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.works__main {
  --titleSize: 17vw;
  --titleOffset: -3.5vw;
  --mainHeight: 80svh;
  --barWidth: calc(10vw + 30px);

  display: grid;
  grid-template-rows: var(--mainHeight);
  grid-template-columns: var(--titleSize) 1fr auto;
  width: 100vw;
}
.works__title {
  font-size: var(--titleSize);
  color: lightgrey;
  translate: var(--titleOffset);
  text-wrap: nowrap;

  &::first-letter {
    text-transform: uppercase;
  }
}
.thumbnails__container {
  display: flex;
  align-items: flex-end;
  padding-right: var(--barWidth);
}
.action-bar {
  position: absolute;
  right: 0;
  translate: 0 2vh;
  height: calc(var(--mainHeight) - 4vh);
  width: var(--barWidth);
  overflow: hidden;
  writing-mode: vertical-lr;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: 'Questrial', serif;
  font-size: 32px;
  font-weight: 700;
  opacity: 0;
  background: rgb(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  transition: opacity 200ms ease;

  & .action-bar__see-more-button,
  .action-bar__return-link {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: auto;
    width: 40px;
    padding: 5px;
    translate: var(--barWidth);
    transform: rotateZ(180deg);
    color: var(--mainColor);
    transition:
      color 150ms ease,
      translate 400ms ease-in;

    &:hover,
    &:focus-visible {
      color: var(--saillanceColor);
      transition:
        color 150ms ease,
        translate 400ms ease;
    }
  }
  & .action-bar__see-more-button {
    gap: 10px;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;

    &:hover .action-bar_plus-icon,
    &:focus-visible .action-bar_plus-icon {
      fill: var(--saillanceColor);
      transition: fill 150ms ease;
    }
  }
  &.action-bar--arrived {
    opacity: 1;
    transition: opacity 400ms ease 200ms;

    & .action-bar__see-more-button,
    .action-bar__return-link {
      translate: 0;
      transition:
        color 150ms ease,
        translate 400ms ease;
    }
  }
}

/******* TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET *******/
@media screen and (767px < width <= 1024px) {
  .works__main {
    --titleSize: 12vw;
    --titleOffset: -2vw;
  }
}
/******* LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP *******/
@media screen and (1024px <= width) {
  .works__main {
    --titleSize: 5vw;
    --titleOffset: -1vw;
    --barWidth: calc(1vw + 48px);
  }
}
/* .low-title {
  translate: 10vw;
  align-self: end;
} */
</style>
