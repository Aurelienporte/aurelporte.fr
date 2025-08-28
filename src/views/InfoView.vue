<script setup>
import InfosWrapper from '@/components/InfosWrapper.vue'
import ShowCard from '@/components/ShowCard.vue'
import TheContact from '@/components/TheContact.vue'
import SocialLink from '@/components/SocialLink.vue'
import TheMenu from '@/components/TheMenu.vue'
import dataExhibitions from '@/dataExhibitions.json'
import { useBreakpoints } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1920
})

// true or false
const mobile = breakpoints.between('mobile', 'tablet')
const tablet = breakpoints.between('tablet', 'laptop')
const laptop = breakpoints.between('laptop', 'desktop')
const desktop = breakpoints.greater('desktop')

const exhibSlices = []

function makeSlices() {
  const exhibitions = dataExhibitions.reverse()
  let showsPerSlice
  if (mobile.value) {
    showsPerSlice = 6
  }
  if (tablet.value) {
    showsPerSlice = 10
  }
  if (laptop.value) {
    showsPerSlice = 7
  }
  if (desktop.value) {
    showsPerSlice = 14
  }
  console.log({ showsPerSlice })
  let slicesAmount = Math.floor(exhibitions.length / showsPerSlice)
  const hasRemainder = exhibitions.length % showsPerSlice

  if (hasRemainder > 0) {
    slicesAmount += 1
  }
  for (let i = 0; i < slicesAmount; i++) {
    let slice = exhibitions.slice(i * showsPerSlice, (i + 1) * showsPerSlice)
    exhibSlices.push(slice)
  }
  console.log(exhibSlices)
}
makeSlices()

const main = useTemplateRef('scrollable')
function scrollWithWheel(e) {
  if (isScrollable.value) {
    e.preventDefault()
    main.value.scrollLeft += e.deltaY * 5
  } else {
    return
  }
}
let isScrollable = ref(true)
function stopMainScroll(e) {
  isScrollable.value = !e
}
</script>

<template>
  <TheMenu header-title="A propos"></TheMenu>
  <main class="main--scroll-x infos__main" @wheel="scrollWithWheel" ref="scrollable">
    <InfosWrapper title="Biographie">
      <p class="text">
        Né en 1991, je vis à Saint-Denis et travaille à la Courneuve. Mes objets manifestent une
        sensibilité à la notion d'espace, qu'il soit géographique, temporel, culturel ou politique.
        Il est question de comment on l'occupe, le traverse ou le façonne. Cette démarche m'amène
        autant à observer mon quotidien, qu'à interroger les futurs dans lesquels on nous projette,
        le peuple ou les personnes qu'on nous propose d'être.
      </p>
    </InfosWrapper>
    <InfosWrapper v-for="(slice, index) in exhibSlices" :key="index" title="Expositions">
      <div class="container">
        <ShowCard
          v-for="exhibition in slice"
          :key="exhibition.id"
          :title="exhibition.title"
          :place="exhibition.place"
        ></ShowCard>
      </div>
    </InfosWrapper>
    <InfosWrapper title="Contact">
      <div class="contact-container">
        <h3 class="contact__title">Mes réseaux</h3>
        <div class="socials">
          <SocialLink social="Pixelfed" url="https://pixelfed.social/Aurel-Porte"></SocialLink>
          <SocialLink
            social="Bluesky"
            url="https://bsky.app/profile/aurel-porte.bsky.social"
          ></SocialLink>
        </div>
        <TheContact @text-area-onfocus="stopMainScroll($event)"></TheContact>
      </div>
    </InfosWrapper>
  </main>
</template>

<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.infos__main {
  gap: 15vw;
  overflow-x: scroll;
  overflow-y: hidden;
}
.text {
  place-self: center;
}
.container, .contact-container {
  padding-top: 2rem;
}
.contact-container {
  display: flex;
  flex-flow: column;
}
.contact__title {
  margin-bottom: 10px;
}
.socials {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
  .infos__main {
    gap: 0;
  }
  .container {
    display: flex;
    flex-flow: column;
  }
  .container, .contact-container {
    align-self: end;
    height: 70svh;
  }
  .socials {
    justify-content: flex-start;
    gap: 1rem;
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) {
  .infos__main {
    gap: 0;
  }
  .container {
    display: flex;
    flex-flow: column;
  }
  .container, .contact-container {
    align-self: end;
    height: 70svh;
  }
  .socials {
    justify-content: flex-start;
    gap: 2rem;
  }
}
</style>
