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
  transition:
    translate 300ms ease-out,
    opacity 150ms ease-out,
    background-image 150ms ease-out 150ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  translate: -100vw;
  background-image: linear-gradient(97deg, var(--saillanceColor) -50%, var(--saillanceColor));
  transition:
    translate 200ms ease-out 100ms,
    opacity 200ms ease-out 100ms,
    background-image 150ms ease-out 150ms;
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
    transition: opacity 300ms ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
      transition:
    translate 100ms ease-out 1000ms,
    opacity 200ms ease-out 100ms,
    background-image 150ms ease-out 150ms;
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
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
    transition:
      clip-path 500ms ease-out 50ms,
      opacity 400ms ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    translate: 0; /*looks mandatory to override first declration*/
    transition:
      clip-path 500ms ease-out 100ms,
      opacity 300ms ease-out 100ms;
  }
}
</style>
