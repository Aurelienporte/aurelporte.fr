<script setup>
import IconPixelfed from '@/components/icons/IconPixelfed.vue'
import worksData from '@/data.json'
import ThumbnailLink from '@/components/ThumbnailLink.vue'

const data = worksData
const lastYears = ['2024', '2023', '2022']

function getRandomWork() {
  let recentWorks = []
  for (let y of lastYears) {
    let filteredWorks = data.filter((work) => work.year === y)
    recentWorks.push(filteredWorks)
  }
  let number = Math.round(Math.random() * recentWorks.length)
  let work = recentWorks.flat()[number]
  console.log({ work })
  return work
}
const work = getRandomWork()
</script>

<template>
  <main>
    <div class="titles-container">
      <h1 class="high-title"><span>Aurel</span><span>Porté</span></h1>
      <div class="low-title"><span>Porté</span><span>Aurel</span></div>
    </div>
    <ThumbnailLink
      :url="work.urlSlug"
      :srcset="work.icon.webp_png"
      :src="work.icon.jpeg"
      :title="work.title"
      :width="work.icon.width"
      :height="work.icon.height"
      :shadow="work.display.hasShadow"
      :hanging="work.display.hanging"
    ></ThumbnailLink>
    <nav class="nav-menu">
      <ul>
        <li><RouterLink class="home__nav-menu__link" to="/works">&OElig;uvres</RouterLink></li>
        <li><RouterLink class="home__nav-menu__link" to="/infos">Infos</RouterLink></li>
        <li>
          <a
            class="home__nav-menu__link"
            href="https://pixelfed.fr/i/web/profile/787962229803910124"
            ><IconPixelfed class="nav-menu__icon"></IconPixelfed>Pixelfed</a
          >
        </li>
      </ul>
    </nav>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
}
main,
.titles-container {
  display: grid;
  grid-template-columns: 20vw 1fr 20vw;
  grid-template-rows: 1fr 25vh 1fr;
}
.titles-container {
  grid-area: 1/1/4/4;
  overflow-x: hidden;

  .high-title,
  .low-title {
    display: grid;
    writing-mode: vertical-lr;
    font-size: 17vw;
    font-weight: 700;

    span:nth-child(2) {
      grid-area: 1/3/2/4;
    }
  }
  .high-title {
    grid-area: 1/1/3/2;
    grid-template-columns: auto 11vh 25vh;
    align-content: end;
    translate: -5.5vw;

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
    translate: 11vw;

    span:nth-child(1) {
      justify-self: center;
    }
  }
}
.random-work {
  grid-area: 1/2/2/3;
  justify-self: start;
  align-self: end;

  img {
    width: 40vw;
    height: auto;
  }
}

.nav-menu {
  grid-area: 3/2/4/3;
  align-self: center;

  ul {
    display: flex;
    flex-flow: column;
    align-items: end;
    gap: 0.5rem;
  }
  .home__nav-menu__link {
    font-size: 1.5rem;
    min-height: 32px;
    display: inline-block;
    font-weight: 500;
    color: black;
  }
  .home__nav-menu__link:has(.nav-menu__icon) {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  & .nav-menu__icon {
    height: 32px;
    width: 32px;
  }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width < 1024px) {
  main,
  .titles-container {
    grid-template-rows: 1fr 28vh 1fr;
  }
  .titles-container {
    .high-title,
    .low-title {
      font-size: 12vw;
    }
    .high-title {
      grid-template-columns: auto 7vh 28vh;
      translate: -10vw;
    }
    .low-title {
      grid-template-columns: 28vh 7vh auto;
      translate: 14vw;
    }
  }
  .random-work {
    grid-area: 1/2/3/3;
    align-self: center;

    img {
      width: 33vw;
    }
  }
  .nav-menu {
    ul {
      gap: 0.75rem;
    }
    .home__nav-menu__link {
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
  main {
    grid-template-rows: 10vh repeat(3, auto) 10vh;
    grid-template-columns: 60vw 1fr 10vh 10vh;
  }
  main,
  .titles-container {
    overflow: hidden;
  }
  .titles-container {
    grid-area: 1/1/6/5;
    grid-template-rows: 1fr 10vh;
    grid-template-columns: 60vw 1fr 10vh;

    .high-title,
    .low-title {
      writing-mode: horizontal-tb;
      rotate: 180deg;
      font-size: 15vh;
      font-weight: 700;
    }
    .high-title {
      writing-mode: vertical-lr;
      grid-area: 1/3/3/4;
      align-self: end;
      grid-template-columns: auto 11vh 25vh;
      align-content: start;
      translate: 7vh;
    }
    .low-title {
      grid-area: 2/1/3/2;
      justify-self: center;
      grid-template-columns: 25vh 11vh auto;
      translate: 0 13vh;
    }
  }
  .random-work {
    grid-area: 3/1/4/2;
    justify-self: center;
    align-self: center;

    img {
      width: 40vmin;
    }
  }
  .nav-menu {
    grid-area: 4/2/5/3;
    .home__nav-menu__link {
      font-size: 2rem;
    }
    & .nav-menu__icon {
      height: 48px;
      width: 48px;
    }
  }
}
</style>
