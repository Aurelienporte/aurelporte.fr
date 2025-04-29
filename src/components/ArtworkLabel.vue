<script setup>
defineProps({
  id: { type: String, required: true },
  dataSheet: { type: Boolean, required: true },
  title: { type: String, required: true },
  materials: { type: String, required: false },
  height: { type: Number, required: false },
  width: { type: Number, required: false },
  depth: { type: String, required: false },
  year: { type: String, required: false },
  text: {
    type: String,
    required: false
  }
})
function addBreaks(string) {
  let newStr = string.replaceAll(/[\n]/g, '<br>')
  return newStr
}
</script>
<template>
  <section :id="id" popover class="work-label" :class="{ 'work-label__datasheet': dataSheet }">
    <h3 class="title--small" :class="{ 'title--italic': dataSheet }">
      {{ title === 'noproject' ? "Née au fil de l'eau" : title }}
    </h3>
    <p v-if="dataSheet">
      {{ materials }},<br />{{
        height === -1
          ? 'dimensions variables'
          : `${height.toLocaleString()}cm x ${width.toLocaleString()}cm`
      }}{{ depth === '' ? '' : `${depth}cm` }},
      {{ year }}
    </p>
    <p v-else class="work-label__text" v-html="addBreaks(text)"></p>
  </section>
</template>
<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.work-label {
  position: absolute;
  top: 66px;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  height: 70vh;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgb(255 255 255 / 0.95);
  translate: 100vw 0;
  transition: all 400ms ease;
  border: none;

  &:popover-open {
    translate: 0;
  }
  &.work-label__datasheet {
    justify-content: center;
    align-items: center;
    text-align: center;

    & p {
      line-height: 1.5rem;
    }
  }
  /* .work-label__text {
  } */
}
/* @starting-style {
  .work-label:popover-open {
    height: 0;
    opacity: 0;
  }
} */
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
  .work-label {
    --labelHeight: 40vh;
    top: calc(46vh - var(--labelHeight) / 2);
    width: 75%;
    height: var(--labelHeight);

    &:popover-open {
      translate: calc(50vw - 50%) 0;
    }
    &.work-label__datasheet {
      justify-content: center;
      align-items: center;
      text-align: center;

      & p {
        line-height: 1.5rem;
      }
    }
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) {
  .work-label {
    --toolbarWidth: -58px; /* = burger width (48px) + lr padding (5px) */
    width: calc(50% + var(--toolbarWidth));
    height: 70vh;
    top: 0;
    align-self: center;
    justify-self: end;
    translate: 100% 0vh;
    padding: 3rem;
    /* box-shadow: -3px 2px 3px 0px #0003; */

    &:popover-open {
      opacity: 1;
      translate: var(--toolbarWidth) 0vh;
      transition:
        opacity 0.4s ease,
        translate 0.4s ease;
    }
    /* &::backdrop {
      background: radial-gradient(
          circle at 100% 30%,
          transparent 20%,
          rgb(26 178 234 / 35%) 65%,
          transparent 85%
        ),
        rgba(21, 20, 50, 0.5);
      backdrop-filter: blur(1px);
      mask: linear-gradient(180deg, white 0 10%, black 10% 90%, white 90% 100%);
      mask-mode: luminance;
    } */
  }
}
</style>
