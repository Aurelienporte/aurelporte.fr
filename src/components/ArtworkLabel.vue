<script setup>
defineProps({
  id: { type: String, required: true },
  dataSheet: { type: Boolean, required: true },
  title: { type: String, required: true },
  materials: { type: String, required: false },
  height: { type: String, required: false },
  width: { type: String, required: false },
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
        height === 'dv' ? 'dimensions variables' : `${height}cm x ${width}cm`
      }}{{ depth === '' ? '' : `${depth}cm` }} ,
      {{ year }}
    </p>
    <p v-else class="work-label__text" v-html="addBreaks(text)"></p>
  </section>
</template>
<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.work-label {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  height: 0;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  opacity: 0;
  border-radius: 10px;
  align-self: end;
  translate: 0 -20vh;
  background-color: rgb(255 255 255 / 0.95);
  transition: all 400ms ease;
  border: none;

  &:popover-open {
    height: 70vh;
    opacity: 1;
    transition:
      height 0.8s ease,
      opacity 0.4s ease;
  }
  &::backdrop {
    --toolDiam: 40px;
    --toolRadius: calc(var(--toolDiam) / 2);
    --toolGap: calc(20vw - var(--toolDiam));
    --offset: 1px;
    --maskY: 85.3%;
    background: radial-gradient(
        circle at 100% 30%,
        transparent 20%,
        rgb(26 178 234 / 35%) 65%,
        transparent 85%
      ),
      rgba(21, 20, 50, 0.5);
    backdrop-filter: blur(1px);
    mask: radial-gradient(
        circle at calc(50% + var(--toolDiam) + var(--toolGap) + var(--offset)) var(--maskY),
        black var(--toolRadius),
        white calc(var(--toolRadius) + 1px)
      ),
      radial-gradient(
        circle at calc(50% + var(--offset)) var(--maskY),
        black var(--toolRadius),
        white calc(var(--toolRadius) + 1px)
      ),
      radial-gradient(
        circle at calc(50% - var(--toolDiam) - var(--toolGap) + var(--offset)) var(--maskY),
        black var(--toolRadius),
        white calc(var(--toolRadius) + 1px)
      );
    mask-mode: luminance;
    mask-composite: intersect;
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
@starting-style {
  .work-label:popover-open {
    height: 0;
    opacity: 0;
  }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
  .work-label {
    width: 75%;
    align-self: end;
    translate: 0 calc(-50vh + 50%);

    &:popover-open {
      height: 40vh;
      justify-self: center;
      opacity: 1;
      transition:
        height 0.8s ease,
        opacity 0.4s ease;
    }
    &::backdrop {
      --toolDiam: 44px;
      --toolGap: var(--toolDiam);
      --offset: 1px;
      --maskY: 83.2%;
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
    &::backdrop {
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
    }
  }
}
</style>
