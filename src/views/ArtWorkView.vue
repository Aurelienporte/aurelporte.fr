<script setup>
import TheAppMenu from '@/components/TheAppMenu.vue'
import ArtworkPicture from '@/components/ArtworkPicture.vue'
import ArtworkLabel from '@/components/ArtworkLabel.vue'
import TextIcon from '@/components/icons/TextIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import ArrowNextIcon from '@/components/icons/ArrowNextIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { watch, ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getYears, filterByProject, filterByYear } from '@/utils'
import worksData from '@/data.json'
import projectsDdata from '@/dataProjects.json'

const route = useRoute()
const pageUrlSlug = route.params.worktitle

watch(
  () => route.params.worktitle,
  (newUrlSlug) => {
    comingWorks.value = updateWorks(newUrlSlug)
    artwork.value = data.find((work) => work.urlSlug === newUrlSlug)
  }
)

const data = worksData
const projects = projectsDdata
const artwork = ref(data.find((work) => work.urlSlug === pageUrlSlug))
const hasText = computed(() => (artwork.value.text === 'noText' ? true : false))
const projectText = projects.find((project) => project.name === artwork.value.project)

function getUrlSlugList() {
  let list = []
  const path = route.path

  //if a filter is active
  if (path.includes('explorer')) {
    const years = getYears()
    const filter = route.params.filter

    if (years.includes(filter)) {
      let selectedYear = filterByYear(artwork.value.year)

      for (let work of selectedYear) {
        list.push(work.urlSlug)
      }
    } else {
      const project = filterByProject(artwork.value.project)

      for (let work of project) {
        list.push(work.urlSlug)
      }
    }
    return list
    //if no filter active navigation occurs in the slice
  } else {
    const workIndex = data.findIndex((work) => work.id === artwork.value.id)
    const worksNumber = data.length
    const increment = 20
    const slices = Math.trunc(worksNumber / increment) + 1
    const remainder = worksNumber % increment

    for (let i = -1; i < slices; i++) {
      let lowerLimit = i != -1 ? increment * i + remainder : 0
      let upperLimit = i != 5 ? increment * (i + 1) + remainder : worksNumber

      if (workIndex >= lowerLimit && workIndex < upperLimit) {
        const sliceWorks = data.slice(lowerLimit, upperLimit).reverse()

        for (let work of sliceWorks) {
          list.push(work.urlSlug)
        }
        return list
      }
    }
  }
}
const workUrlSlugList = getUrlSlugList()

function updateWorks(urlSlug) {
  const current = workUrlSlugList.indexOf(urlSlug)
  let previous = workUrlSlugList[current - 1]
  let next = workUrlSlugList[current + 1]

  if (current === 0) {
    previous = workUrlSlugList[workUrlSlugList.length - 1]
  }
  if (current === workUrlSlugList.length - 1) {
    next = workUrlSlugList[0]
  }
  const update = {
    currentWork: current,
    previousWork: previous,
    nextWork: next
  }
  return update
}
const comingWorks = ref(updateWorks(pageUrlSlug))
</script>
<template>
  <TheAppMenu></TheAppMenu>
  <main class="artwork__main">
    <ArtworkPicture
      class="work"
      :images="artwork.images"
      :alt-text="artwork.altText"
      :shadow="artwork.display.hasShadow"
    ></ArtworkPicture>
    <ArtworkLabel
      id="description"
      :data-sheet="false"
      :text="artwork.text"
      title="En quelques mots"
    ></ArtworkLabel>
    <ArtworkLabel
      id="infos"
      :data-sheet="true"
      :title="artwork.title"
      :materials="artwork.materials"
      :height="artwork.height"
      :width="artwork.width"
      :depth="artwork.depth"
      :year="artwork.year"
    ></ArtworkLabel>
    <ArtworkLabel
      id="project"
      :data-sheet="false"
      :text="projectText.description"
      :title="projectText.name"
    ></ArtworkLabel>

    <div class="toolbar">
      <RouterLink :to="comingWorks.previousWork" class="toolbar__link"
        ><IconArrowBack class="toolbar__svg"></IconArrowBack
      ></RouterLink>
      <button
        :disabled="hasText"
        popovertarget="description"
        @click="toogleArrows(1)"
        class="toolbar__button"
      >
        <TextIcon class="toolbar__svg toolbar--open"></TextIcon>
        <CloseIcon class="toolbar__svg toolbar--close"></CloseIcon></button
      ><button popovertarget="infos" @click="toogleArrows(2)" class="toolbar__button">
        <InfoIcon class="toolbar__svg toolbar--open"></InfoIcon
        ><CloseIcon class="toolbar__svg toolbar--close"></CloseIcon></button
      ><button popovertarget="project" @click="toogleArrows(3)" class="toolbar__button">
        <MapIcon class="toolbar__svg toolbar--open"></MapIcon
        ><CloseIcon class="toolbar__svg toolbar--close"></CloseIcon>
      </button>
      <RouterLink :to="comingWorks.nextWork" class="toolbar__link"
        ><ArrowNextIcon class="toolbar__svg"></ArrowNextIcon
      ></RouterLink>
    </div>
  </main>
</template>

<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.artwork__main {
  height: 80vh;
  display: grid;
  grid-template-rows: 70vh 10vh;
  grid-template-columns: 1fr;
  place-content: center;
}
.artwork__main:has(:popover-open) {
  & .toolbar__link {
    display: none;
  }
}
.toolbar--close {
  display: none;
}
.artwork__main:has(#description:popover-open) {
  & .toolbar__button:first-of-type {
    & .toolbar--open {
      display: none;
    }
    & .toolbar--close {
      display: block;
    }
  }
}
.artwork__main:has(#infos:popover-open) {
  & .toolbar__button:nth-of-type(2) {
    & .toolbar--open {
      display: none;
    }
    & .toolbar--close {
      display: block;
    }
  }
}
.artwork__main:has(#project:popover-open) {
  & .toolbar__button:last-of-type {
    & .toolbar--open {
      display: none;
    }
    & .toolbar--close {
      display: block;
    }
  }
}
& .work {
  grid-area: 1/1/2/2;
  display: grid;
  place-content: center;
}
& .toolbar {
  --toolHeight: 40px;
  --toolGap: calc(20vw - var(--toolHeight));

  grid-area: 2/1/3/2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--toolGap);
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-image-source: linear-gradient(
    90deg,
    transparent 10%,
    rgb(128, 128, 128) 20% 80%,
    transparent 90%
  );
  border-image-slice: 1 0 0;
  border-image-width: 1px;
  border-top: 1px solid gray;
  & .toolbar__link {
    box-sizing: border-box;
  }
  & .toolbar__button {
    display: grid;
    place-content: center;

    &:disabled {
      & .toolbar__svg {
        fill: #999999;
      }
    }
  }
  & :is(.toolbar__link, .toolbar__button) {
    height: var(--toolHeight);
    padding: 8px;

    & .toolbar__svg {
      fill: #323232;
    }
  }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
  .artwork__main {
    height: 84vh;
    grid-template-rows: 76vh 8vh;
  }
  & .toolbar {
    --toolHeight: 44px;
    --toolGap: var(--toolHeight);
    border-image-width: 2px;
    & .toolbar__svg {
      height: 28px;
      width: 28px;
    }
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  .artwork__main {
    height: 90vh;
    grid-template-rows: 1fr;
    grid-template-columns: 90vw 10vw;
    place-content: end;

    &:has(:popover-open) {
      & .work {
        translate: -25% 0;
        transition: translate 0.4s ease;
      }
    }
  }
  & .work {
    grid-area: 1/1/2/3;
    translate: 0;
    transition: translate 0.8s ease;
    display: grid;
    place-content: center;
  }
  & .toolbar {
    --toolHeight: 44px;
    --toolGap: calc(var(--toolHeight) / 2);

    grid-area: 1/2/2/3;
    height: 80vh; /*centered in screen (banner = 10vh) */
    justify-self: end;
    flex-flow: column;
    width: 58px; /* = burger with (48px) + lr padding (5px) */
    border-image-width: 0;
    border-top: none;
    z-index: 5;

    & :is(.toolbar__link, .toolbar__button) {
      &:hover .toolbar__svg {
        fill: var(--saillanceColor);
        transition: all 200ms ease;
      }
    }
    & .toolbar__svg {
      height: 28px;
      width: 28px;
      transition: all 200ms ease;
    }
    & :first-child {
      order: 1;
    }
    & :last-child {
      order: -1;
    }
    & .toolbar__button:disabled:hover {
      cursor: auto;

      & .toolbar__svg {
        fill: #999999;
      }
    }
  }
}
</style>
