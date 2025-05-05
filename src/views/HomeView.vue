<script setup>
import { ref } from 'vue'
import SocialLink from '@/components/SocialLink.vue'
import worksData from '@/data.json'
import ThumbnailLink from '@/components/ThumbnailLink.vue'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1440
})

// true or false
const laptop = breakpoints.between('laptop', 'desktop')
const desktop = breakpoints.greater('desktop')

const data = worksData
const lastYears = ['2024', '2023', '2022']

function getRandomWork() {
  let recentWorks = []
  for (let y of lastYears) {
    let filteredWorks = data.filter((work) => work.year === y)
    recentWorks.push(filteredWorks)
  }
  let worksList = recentWorks.flat()
  let randomNumber = Math.round(Math.random() * (worksList.length - 1))
  let work = worksList[randomNumber]
  return work
}
const work = ref(getRandomWork())
setInterval(() => (work.value = getRandomWork()), 17000)

const secondWork = ref(getRandomWork())
setInterval(() => (secondWork.value = getRandomWork()), 19000)

const isMoving = ref(false)
setInterval(() => (isMoving.value = !isMoving.value), 7000)

const isAppearing = ref(false)
setInterval(() => (isAppearing.value = !isAppearing.value), 13000)

const resetHanging = { x: '0', y: '0', leftGap: '0' }
</script>

<template>
  <main class="home">
    <h1 class="high-title" :class="{ 'high-title--moving': isMoving }">
      <span data="Aurel">Aurel</span><span data="Porté">Porté</span>
    </h1>
    <div class="low-title" :class="{ 'low-title--moving': isMoving }">
      <span data="Porté">Porté</span><span data="Aurel">Aurel</span>
    </div>
    <ThumbnailLink
      class="home__thumbnail"
      :url="work.urlSlug"
      :srcset="work.icon.webp_png"
      :src="work.icon.jpeg"
      :title="work.title"
      :width="work.icon.width"
      :height="work.icon.height"
      :shadow="work.display.hasShadow"
      :hanging="resetHanging"
      rel="nofollow"
    ></ThumbnailLink>
    <ThumbnailLink
      v-if="laptop || desktop"
      class="home__thumbnail"
      :url="secondWork.urlSlug"
      :srcset="secondWork.icon.webp_png"
      :src="secondWork.icon.jpeg"
      :title="secondWork.title"
      :width="secondWork.icon.width"
      :height="secondWork.icon.height"
      :shadow="secondWork.display.hasShadow"
      :hanging="resetHanging"
      rel="nofollow"
    ></ThumbnailLink>
    <nav class="nav-menu">
      <ul class="nav-menu__list">
        <li :class="{ 'nav-menu__item--appearing': isAppearing }">
          <RouterLink class="nav-menu__link" to="/works">&OElig;uvres</RouterLink>
        </li>
        <li :class="{ 'nav-menu__item--appearing': isAppearing }">
          <RouterLink class="nav-menu__link" to="/infos">Infos</RouterLink>
        </li>
        <li :class="{ 'nav-menu__item--appearing': isAppearing }">
          <SocialLink
            class="nav-menu__link"
            social="Pixelfed"
            url="https://pixelfed.social/Aurel-Porte"
          ></SocialLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.home {
  display: grid;
  grid-template-columns: 20vw 1fr 20vw;
  grid-template-rows: 37.5vh 25vh 37.5vh;
  height: 100vh;
}
.high-title,
.low-title {
  display: grid;
  writing-mode: vertical-lr;
  font-size: 17vw;
  font-weight: 700;

  span:nth-child(2) {
    grid-area: 1/3/2/4;
  }
  & span {
    color: white;
    background-color: white;
    position: relative;

    &::after,
    &::before {
      content: attr(data);
      position: absolute;
      top: 0;
      left: 0;
      translate: var(--initialPosition);
      color: black;
    }
    &::after {
      z-index: -5;
    }
  }
}
.high-title {
  grid-area: 1/1/3/2;
  grid-template-columns: auto 8vh 25vh;
  align-content: end;
  translate: 17vw;

  & span {
    --distance: 22vw;

    &::after {
      --initialPosition: -22vw;
    }
    &::before {
      --initialPosition: -44vw;
    }
  }
  span:nth-child(1) {
    justify-self: end;
  }
  span:nth-child(2) {
    justify-self: center;
  }
}
.high-title--moving {
  span:nth-child(1) {
    &::before {
      animation: move 0.5s ease 0.5s 1 forwards;
    }
    &::after {
      animation: move 0.5s ease 1 both;
    }
  }
  span:nth-child(2) {
    &::before {
      animation: move 0.5s ease 0.625s 1 both;
    }
    &::after {
      animation: move 0.5s ease 0.125s 1 both;
    }
  }
}
.low-title {
  grid-area: 2/3/4/4;
  grid-template-columns: 25vh 8vh auto;
  translate: -17vw;

  span {
    --distance: 28vw;

    &::after {
      --initialPosition: 0vw;
    }
    &::before {
      --initialPosition: 28vw;
    }
  }

  span:nth-child(1) {
    justify-self: center;
  }
}
.low-title--moving {
  span:nth-child(1) {
    &::before {
      animation: move 0.6s ease 0.3s 1 forwards;
    }
    &::after {
      animation: move 0.6s ease 0.85s 1 forwards;
    }
  }
  span:nth-child(2) {
    &::before {
      animation: move 0.6s ease 0.425s 1 forwards;
    }
    &::after {
      animation: move 0.6s ease 0.975s 1 forwards;
    }
  }
}
.titles-container {
  grid-area: 1/1/4/4;
  overflow-x: hidden;

  /* .high-title,
  .low-title {
    display: grid;
    writing-mode: vertical-lr;
    font-size: 17vw;
    font-weight: 700;

    span:nth-child(2) {
      grid-area: 1/3/2/4;
    }
    & span {
      position: relative;

      &::after,
      &::before {
        content: attr(data);
        position: absolute;
        top: 0;
        left: 0;
      }
      &::after {
        color: white;
        background-color: white;
      }
    }
  }
  .high-title {
    grid-area: 1/1/3/2;
    grid-template-columns: auto 11vh 25vh;
    align-content: end;

    & span {
      translate: -0.5cap;

      &::after,
      &::before {
        translate: 2.2cap;
      }
    }

    span:nth-child(1) {
      justify-self: end;
    }
    span:nth-child(2) {
      justify-self: center;
    }
  }
  .low-title {
    grid-area: 2/3/4/4;
    grid-template-columns: 25vh 11vh auto;

    span {
      translate: 0.9cap;

      &::before,
      &::after {
        translate: -2.2cap;
      }
    }

    span:nth-child(1) {
      justify-self: center;
    }
  } */
}
.home__thumbnail {
  grid-area: 1/2/3/3;
  justify-self: center;
  align-self: center;
  z-index: 5;
}
.nav-menu {
  grid-area: 2/2/4/3;
  align-self: center;
  z-index: 5;
  background-color: white;

  & .nav-menu__list {
    display: flex;
    flex-flow: column;
    align-items: end;
    gap: 0.5rem;

    & .nav-menu__link {
      font-size: 1.5rem;
      font-weight: 500;
    }
    & .nav-menu__link:not(.socials__link) {
      font-size: 1.5rem;
      padding: 4px;
      display: inline-block;
      min-height: 32px;
      font-weight: 500;
    }
    .nav-menu__item--appearing {
      --staggering: 2s;
      animation:
        fadeOut 0.4s ease-out var(--staggering) 1 forwards,
        fadeIn 0.4s ease-in calc(1.2s + var(--staggering)) 1 forwards;
    }
    li:nth-child(2) {
      --staggering: 2.3s;
    }
    li:nth-child(3) {
      --staggering: 2.6s;
    }
  }
}
@keyframes move {
  0% {
    translate: var(--initialPosition);
  }
  100% {
    translate: calc(var(--initialPosition) + var(--distance));
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
  .home {
    grid-template-rows: 1fr 28vh 1fr;
    grid-template-columns: 15vw 1fr 15vw;
  }
  .high-title,
  .low-title {
    font-size: 12vw;
  }
  .high-title {
    grid-template-columns: auto 7vh 28vh;
    translate: 12vw;

    & span {
      --distance: 17vw;

      &::after {
        --initialPosition: -17vw;
      }
      &::before {
        --initialPosition: -34vw;
      }
    }
  }
  .low-title {
    grid-template-columns: 28vh 7vh auto;
    translate: -12vw;

    span {
      --distance: 21vw;

      &::after {
        --initialPosition: 0vw;
      }
      &::before {
        --initialPosition: 21vw;
      }
    }
  }
  .home__thumbnail {
    grid-area: 1/2/3/3;
    align-self: center;
  }
  .nav-menu {
    & .nav-menu__list {
      gap: 0.75rem;
    }
    & .nav-menu__link {
      font-size: 2rem;
    }
    & .nav-menu__icon {
      height: 40px;
      width: 40px;
    }
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) {
  .home {
    box-sizing: border-box;
    overflow: hidden;
    padding-top: 10vh;
    grid-template-rows: repeat(3, auto) 10vh;
    grid-template-columns: 60vw auto 10vh;
  }
  .high-title,
  .low-title {
    writing-mode: horizontal-tb;
    rotate: 180deg;
    font-size: 15vh;
    font-weight: 700;
  }
  .high-title {
    writing-mode: vertical-lr;
    grid-area: 1/3/5/4;
    align-self: end;
    grid-template-columns: auto 11vh 25vh;
    align-content: start;
    translate: -22vh;
    width: fit-content;

    & span {
      --distance: 20vh;

      &::after {
        --initialPosition: 0vh;
      }
      &::before {
        --initialPosition: -20vh;
      }
    }
    span:nth-child(1) {
      justify-self: center;
    }
  }
  .high-title--moving {
    span:nth-child(1) {
      &::before {
        animation: move 0.5s ease 0.425s 1 forwards;
      }
      &::after {
        animation: move 0.5s ease 0.975s 1 both;
      }
    }
    span:nth-child(2) {
      &::before {
        animation: move 0.5s ease 0.3s 1 both;
      }
      &::after {
        animation: move 0.5s ease 0.85s 1 both;
      }
    }
  }
  @keyframes move {
    0% {
      translate: var(--initialPosition);
    }
    100% {
      translate: calc(var(--initialPosition) - var(--distance));
    }
  }
  .low-title {
    grid-area: 4/1/5/2;
    justify-self: center;
    grid-template-columns: 25vh 11vh auto;
    translate: 0 -10vh;

    & span {
      --distance: 20vh;

      &::before,
      &::after {
        translate: 0 var(--initialPosition);
      }
      &::after {
        --initialPosition: 0vh;
      }
      &::before {
        --initialPosition: -20vh;
      }
    }
  }
  .low-title--moving {
    span:nth-child(1) {
      &::before {
        animation: moveY 0.6s ease 0.125s 1 forwards;
      }
      &::after {
        animation: moveY 0.6s ease 0.625s 1 forwards;
      }
    }
    span:nth-child(2) {
      &::before {
        animation: moveY 0.6s ease 1 forwards;
      }
      &::after {
        animation: moveY 0.6s ease 0.5s 1 forwards;
      }
    }
  }
  @keyframes moveY {
    0% {
      translate: 0 var(--initialPosition);
    }
    100% {
      translate: 0 calc(var(--initialPosition) - var(--distance));
    }
  }
  .home__thumbnail {
    grid-area: 2/1/3/2;
    justify-self: center;
    align-self: center;
  }
  & .home__thumbnail + .home__thumbnail {
    justify-self: start;
    grid-area: 1/2/2/3;
  }
  .nav-menu {
    grid-area: 3/2/4/3;
    margin-right: 32px;

    & .nav-menu__link:not(.socials__link) {
      font-size: 2rem;
      position: relative;

      &::after {
        height: 2px;
        width: 0;
        content: '';
        position: absolute;
        right: 3px;
        bottom: 6px;
        background-color: var(--saillanceColor);
      }
      &:hover {
        transition: all 200ms ease;
        color: var(--saillanceColor);

        &::after {
          width: 90%;
          transition: width 200ms ease;
        }
      }
    }
  }
}
</style>
