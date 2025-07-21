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
  height: var(--mainHeight);
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgb(255 255 255 / 0.9);
  translate: 100vw 66px;
  transition: all 300ms ease-out allow-discrete;
  border: none;

  &:popover-open {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    translate: 0 66px;
    transition: all 300ms ease-out allow-discrete;
  }
  @starting-style {
    &:popover-open {
      translate: 100vw 66px;
      transition: all 300ms ease-out allow-discrete;
    }
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
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
  .work-label {
    --labelHeight: 40vh;
    top: calc(46vh - var(--labelHeight) / 2);
    width: 75%;
    height: var(--labelHeight);
    translate: 100vw 0;

    &:popover-open {
      translate: calc(50vw - 50%) 0;
    }
    @starting-style {
      &:popover-open {
        translate: 100vw 0;
      }
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
    translate: 100% 0;
    padding: 3rem;
    /* box-shadow: -3px 2px 3px 0px #0003; */

    &:popover-open {
      opacity: 1;
      translate: var(--toolbarWidth) 0;
      transition: all 400ms ease allow-discrete;
    }
    @starting-style {
      &:popover-open {
        translate: 100% 0;
      }
    }
  }
}
</style>
