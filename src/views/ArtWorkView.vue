<script setup>
import TheAppMenu from '@/components/TheAppMenu.vue'
import ArtworkPicture from '@/components/ArtworkPicture.vue'
import ArtworkCartel from '@/components/ArtworkCartel.vue'
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
  console.log({ update })
  return update
}
const comingWorks = ref(updateWorks(pageUrlSlug))
</script>
<template>
  <TheAppMenu></TheAppMenu>
  <main class="artwork">
    <ArtworkPicture :images="artwork.images" :title="artwork.title"></ArtworkPicture>
    <div class="cartels">
      <ArtworkCartel
        :dataSheet="true"
        :title="artwork.title"
        :materials="artwork.materials"
        :height="artwork.height"
        :width="artwork.width"
        :depth="artwork.depth"
        :year="artwork.year"
      ></ArtworkCartel>
      <ArtworkCartel :dataSheet="false" :text="artwork.text"></ArtworkCartel>
      <ArtworkCartel :dataSheet="false" :text="projectText.description"></ArtworkCartel>
    </div>
    <div class="iconbar">
      <RouterLink :to="comingWorks.previousWork">prev</RouterLink>
      <span class="icon"></span><span class="icon"></span><span class="icon"></span>
      <RouterLink :to="comingWorks.nextWork">next</RouterLink>
    </div>
  </main>
</template>

<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.artwork {
  height: 80vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
