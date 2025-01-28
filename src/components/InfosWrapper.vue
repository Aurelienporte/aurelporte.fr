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
    <h2 class="title--vertical infos-wrapper__title infos-wrapper__title--high">{{ title }}</h2>
    <slot></slot>

    <span class="title--vertical infos-wrapper__title infos-wrapper__title--low">{{ title }}</span>
  </section>
</template>

<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.infos-wrapper {
  display: grid;
  grid-template-columns: 15vw 70vw 15vw;
  grid-template-rows: 1fr;
  padding-top: 2rem;
}
.infos-wrapper__title {
  font-size: 12vw;
}
.infos-wrapper__title--high {
  translate: -3.5vw;
}
.infos-wrapper__title--low {
  translate: 10vw;
  align-self: end;
}
/******* TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET *******/
@media screen and (767px < width < 1024px) {
  .infos-wrapper {
    grid-template-columns: 10vw 55vw 10vw;
    width: 75vw;
  }
  .infos-wrapper__title {
    font-size: 8vw;
  }
  .infos-wrapper__title--high {
    translate: -1.5vw;
  }
  .infos-wrapper__title--low {
    display: none;
  }
}
/******* LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP LAPTOP *******/
@media screen and (1024px <= width) {
  .infos-wrapper {
    grid-template-columns: 6vw 31vw 6vw;
    width: 43vw;
  }
  .infos-wrapper__title {
    font-size: 4vw;
  }
  .infos-wrapper__title--high {
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
  .infos-wrapper__title--low {
    display: none;
  }
}
</style>
