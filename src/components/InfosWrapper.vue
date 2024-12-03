<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="infos-wrapper">
    <h2 class="high-title">{{ title }}</h2>
    <slot></slot>

    <span class="low-title">{{ title }}</span>
  </section>
</template>

<style scoped>
.infos-wrapper {
  display: grid;
  grid-template-columns: 15vw 1fr 15vw;
  grid-template-rows: 1fr;
  width: 100vw;
  padding-top: 2rem;
}
.high-title,
.low-title {
  font-family: 'Questrial', serif;
  writing-mode: vertical-lr;
  font-size: 12vw;
  font-weight: 700;
}
.high-title {
  translate: -3.5vw;
}
.low-title {
  translate: 10vw;
  align-self: end;
}
/******* TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET *******/
@media screen and (767px < width < 1024px) {
  .infos-wrapper {
    grid-template-columns: 10vw 1fr 10vw;
    width: 75vw;
    padding-top: 0;
  }
  .high-title,
  .low-title {
    font-family: 'Questrial', serif;
    writing-mode: vertical-lr;
    font-size: 8vw;
  }
  .high-title {
    translate: -1.5vw;
  }
  .low-title {
    display: none;
  }
}
/******* LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP *******/
@media screen and (1024px <= width) {
  .infos-wrapper {
    grid-template-columns: 6vw 1fr 6vw;
    width: 43vw;
    padding-top: 0;
  }
  .high-title,
  .low-title {
    font-family: 'Questrial', serif;
    writing-mode: vertical-lr;
    font-size: 4vw;
  }
  .high-title {
    translate: -1.5vw;
    /* position: relative; */
    /* &::after {
      content: '';
      background-color: white;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 4vw;
      translate: -2.75vw;
    } */
  }
  .low-title {
    display: none;
  }
}
</style>
