<script setup>
import TheAppMenu from '@/components/TheAppMenu.vue'
// import ArtworkPicture from '@/components/ArtworkPicture.vue'
import ArtworkCartel from '@/components/ArtworkCartel.vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import worksData from '@/data.json'
import projectsDdata from '@/dataProjects.json'
import { normalizeName } from '@/utils'
const projects = projectsDdata
console.log(projects)
const route = useRoute()
const pageUrlSlug = route.params.worktitle

const data = worksData
const artwork = data.find((work) => work.urlSlug === pageUrlSlug)
const projectText = projects.find((project) => project.name === normalizeName(artwork.project))

console.log({ projectText })
</script>
<template>
  <TheAppMenu></TheAppMenu>
  <main>
    <!-- <ArtworkPicture
      :srcset="camp_de_bases.webp"
      :src="camp_de_bases.jpeg"
      :title="artwork.title"
      :width="375"
      :height="artwork.images.height"
    ></ArtworkPicture> -->
    <!-- <ArtworkPicture
      :srcset="artwork.images.webp_png"
      :src="artwork.images.jpeg"
      :title="artwork.title"
      :width="artwork.images.width"
      :height="artwork.images.height"
    ></ArtworkPicture> -->
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
      <RouterLink>prev</RouterLink>
      <span class="icon"></span><span class="icon"></span><span class="icon"></span>
      <RouterLink>next</RouterLink>
    </div>
  </main>
</template>

<style></style>
