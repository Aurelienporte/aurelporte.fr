<script setup>
defineProps({
  isVisible: { type: Boolean, required: true }
})
</script>

<template>
  <Transition name="slide-fade">
    <div v-show="isVisible" class="overlay"></div>
  </Transition>
</template>

<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(97deg, var(--darkColor) -50%, var(--lightColor));
  opacity: 0.5;
    transition:
    translate 200ms ease-out 100ms,
    opacity 200ms ease-out 100ms,
    background-image 100ms ease 150ms;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  /*has no effect on entry styles, for unknown reason*/
  opacity: 0;
  translate: -100vw;
  background-image: linear-gradient(97deg, var(--saillanceColor) -50%, var(--saillanceColor));

  transition:
    translate 200ms ease-out 100ms,
    opacity 200ms ease-out 100ms,
    background-image 150ms ease-out 150ms;
}

/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  & .overlay {
    clip-path: polygon(0 0, 0 10%, 100% 10%, 100% 90%, 0 90%, 0 100%, 100% 100%, 100% 0);
    transition:
      clip-path 500ms ease-out 50ms,
      opacity 400ms ease-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    clip-path: polygon(0 0, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 100% 100%, 100% 0);
    opacity: 0;
    translate: 0; /*looks mandatory to override first declration*/
    transition:
      clip-path 500ms ease-out 100ms,
      opacity 300ms ease-out 100ms;
  }
}
</style>
