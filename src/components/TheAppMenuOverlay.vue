<script setup>
defineProps({
  isVisible: { type: Boolean, required: true }
})
</script>

<template>
  <Transition name="fade">
    <div v-show="isVisible" class="menu__overlay"></div>
  </Transition>
</template>

<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.menu__overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(97deg, var(--darkColor) -50%, var(--lightColor));
  opacity: 0.75;
}
.fade-enter-active {
  transition:
    translate 300ms ease-out,
    opacity 150ms ease-out,
    background-image 150ms ease-out 150ms;
}
.fade-leave-active {
  transition:
    translate 200ms ease-out 100ms,
    opacity 200ms ease-out 100ms,
    background-image 150ms ease-out 150ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  translate: -100vw;
  background-image: linear-gradient(97deg, rgb(26 178 234 / 90%) -50%, rgb(26 178 234 / 90%));
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width < 1024px) {
  & .menu__overlay {
    --borderRadius: var(--bannerHeight);
    --tabX: calc(100vw - var(--navWidth));
    --navWidth: 50vw;

    mask:
      linear-gradient(#000 var(--bannerHeight), #fff 0),
      linear-gradient(90deg, #fff var(--tabX), #000 var(--tabX)),
      radial-gradient(
          calc(var(--borderRadius) * 2) circle at -1px 100%,
          #000 50%,
          #fff calc(50% + 1px)
        )
        calc(var(--tabX) - var(--borderRadius)) 0 / var(--borderRadius) var(--borderRadius)
        no-repeat;
    mask-composite: add, subtract;
    mask-mode: luminance;
  }
  .fade-enter-active {
    transition: opacity 150ms ease-out;
  }
  .fade-leave-active {
    transition: opacity 150ms ease-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  /* & .overlay {
    clip-path: polygon(0 0, 0 10%, 100% 10%, 100% 90%, 0 90%, 0 100%, 100% 100%, 100% 0);
  } */
  & .menu__overlay {
    --borderRadius: var(--bannerHeight);
    --tabX: calc(100vw - var(--navWidth));
    --navWidth: 25vw;

    mask:
      linear-gradient(#000 var(--bannerHeight), #fff 0),
      linear-gradient(90deg, #fff var(--tabX), #000 var(--tabX)),
      radial-gradient(
          calc(var(--borderRadius) * 2) circle at -1px 100%,
          #000 50%,
          #fff calc(50% + 1px)
        )
        calc(var(--tabX) - var(--borderRadius)) 0 / var(--borderRadius) var(--borderRadius)
        no-repeat;
    mask-composite: add, subtract;
    mask-mode: luminance;
  }
  .fade-enter-active {
    transition:
      clip-path 500ms ease-out 50ms,
      opacity 400ms ease-out;
  }
  .fade-leave-active {
    transition:
      clip-path 500ms ease-out 100ms,
      opacity 300ms ease-out 100ms;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    translate: 0; /*looks mandatory to override first declration*/
  }
}
</style>
