<script setup>
import { ref, useTemplateRef } from 'vue'

const main = useTemplateRef('scrollable')
let isScrollable = ref(true)

function scrollWithWheel(e) {
  if (isScrollable.value) {
    e.preventDefault()
    main.value.scrollLeft += e.deltaY * 5
  } else {
    return
  }
}


</script>
<template>
    <main class="main--scroll-x" @wheel="scrollWithWheel" ref="scrollable">
        <slot></slot>
    </main>
</template>
<style scoped>
.main--scroll-x {
  gap: 15vw;
  overflow-x: scroll;
  overflow-y: hidden;
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
.main--scroll-x {
    gap: 0;
  }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) {
  .main--scroll-x {
    gap: 0;
  }
}
</style>