<script setup>
import TheAppMenu from '@/components/TheAppMenu.vue'
import ArtworkPicture from '@/components/ArtworkPicture.vue'
import ArtworkCartel from '@/components/ArtworkLabel.vue'
import TextIcon from '@/components/icons/TextIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import ArrowNextIcon from '@/components/icons/ArrowNextIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { watch, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { normalizeName, getYears, filterByProject, filterByYear } from '@/utils'
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
const projectText = projects.find(
  (project) => project.name === normalizeName(artwork.value.project)
)

function getUrlSlugList() {
  let list = []
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
const isLabelActive = ref(false)
const isDescriptionActive = ref(false)
const isInfosActive = ref(false)
const isProjectActive = ref(false)

function toogleArrows(buttonNumber) {
  if (buttonNumber == 1) {
    isDescriptionActive.value = !isDescriptionActive.value
    isInfosActive.value = false
    isProjectActive.value = false
  }
  if (buttonNumber == 2) {
    isInfosActive.value = !isInfosActive.value
    isDescriptionActive.value = false
    isProjectActive.value = false
  }
  if (buttonNumber == 3) {
    isProjectActive.value = !isProjectActive.value
    isDescriptionActive.value = false
    isInfosActive.value = false
  }
  if (isDescriptionActive.value || isInfosActive.value || isProjectActive.value) {
    isLabelActive.value = true
  } else {
    isLabelActive.value = false
  }
}
</script>
<template>
  <TheAppMenu></TheAppMenu>
  <main class="artwork__main">
    <ArtworkPicture class="work" :images="artwork.images" :title="artwork.title"></ArtworkPicture>
    <ArtworkCartel
      id="description"
      :data-sheet="false"
      :text="artwork.text"
      title="En quelques mots"
    ></ArtworkCartel>
    <ArtworkCartel
      id="infos"
      :data-sheet="true"
      :title="artwork.title"
      :materials="artwork.materials"
      :height="artwork.height"
      :width="artwork.width"
      :depth="artwork.depth"
      :year="artwork.year"
    ></ArtworkCartel>
    <ArtworkCartel
      id="project"
      :data-sheet="false"
      :text="projectText.description"
      :title="artwork.project"
    ></ArtworkCartel>

    <div class="toolbar">
      <RouterLink v-show="!isLabelActive" :to="comingWorks.previousWork" class="toolbar__link"
        ><IconArrowBack class="toolbar__svg"></IconArrowBack
      ></RouterLink>
      <button popovertarget="description" @click="toogleArrows(1)" class="toolbar__button">
        <TextIcon v-show="!isDescriptionActive" class="toolbar__svg"></TextIcon>
        <CloseIcon v-show="isDescriptionActive" class="toolbar__svg"></CloseIcon></button
      ><button popovertarget="infos" @click="toogleArrows(2)" class="toolbar__button">
        <InfoIcon v-show="!isInfosActive" class="toolbar__svg"></InfoIcon
        ><CloseIcon v-show="isInfosActive" class="toolbar__svg"></CloseIcon></button
      ><button popovertarget="project" @click="toogleArrows(3)" class="toolbar__button">
        <MapIcon v-show="!isProjectActive" class="toolbar__svg"></MapIcon
        ><CloseIcon v-show="isProjectActive" class="toolbar__svg"></CloseIcon>
      </button>
      <RouterLink v-show="!isLabelActive" :to="comingWorks.nextWork" class="toolbar__link"
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
  }
  & :is(.toolbar__link, .toolbar__button) {
    height: var(--toolHeight);
    padding: 8px;
  }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width < 1024px) {
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
    translate: 0 -5vh; /*centered in screen (banner = 10vh) */
    justify-self: end;
    flex-flow: column;
    width: 58px; /* = burger with (48px) + lr padding (5px) */
    border-image-width: 0;
    border-top: none;

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
  }
}
</style>
