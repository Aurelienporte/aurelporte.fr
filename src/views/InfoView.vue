<script setup>
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import InfosWrapper from '@/components/InfosWrapper.vue'
import ShowCard from '@/components/ShowCard.vue'
import TheContact from '@/components/TheContact.vue'
import TheAppMenu from '@/components/TheAppMenu.vue'
import dataExhibitions from '@/dataExhibitions.json'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1440
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
    showsPerSlice = 7
  }
  if (tablet.value) {
    showsPerSlice = 10
  }
  if (laptop.value) {
    showsPerSlice = 8
  }
  if (desktop.value) {
    showsPerSlice = 10
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
</script>

<template>
  <TheAppMenu header-title="A propos"></TheAppMenu>
  <main ref="main" class="main--scroll-x infos__main">
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
          <a class="socials__link" href="https://www.instagram.com/aurel_porte/"
            ><IconInstagram />Instagram</a
          >
          <a class="socials__link" href="https://www.facebook.com/aurel.porte/"
            ><IconFacebook />Facebook</a
          >
        </div>
        <TheContact></TheContact>
      </div>
    </InfosWrapper>
  </main>
</template>

<style scoped>
.infos__main {
  gap: 15vw;
  overflow-x: scroll;
  overflow-y: hidden;
}
.text {
  place-self: center;
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

  .socials__link {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
/******* TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET *******/
@media screen and (767px < width < 1024px) {
  .infos__main {
    gap: 0;
  }
  .container {
    align-self: end;
    display: flex;
    flex-flow: column;
    height: 70vh;
  }
  .contact-container {
    align-self: end;
    display: flex;
    flex-flow: column;
    height: 70vh;
  }
}
/******* LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP *******/
@media screen and (1024px <= width) {
  .infos__main {
    gap: 0;
  }
  .container {
    align-self: end;
    display: flex;
    flex-flow: column;
    height: 70vh;
  }
  .contact-container {
    align-self: end;
    display: flex;
    flex-flow: column;
    height: 70vh;
  }
  .socials {
    justify-content: flex-start;
    gap: 30px;
  }
}
</style>
