<script setup>
import TheAppMenuFilter from './TheAppMenuFilter.vue'

import { getYears } from '@/utils'
import { getProjects } from '@/utils'
// import { normalizeProjectName } from '@/utils'
const years = getYears()
const projects = getProjects()
// const urlSlugs = normalizeProjectName()

// let filterProps = []
// function test (strings, normalizedStrings){
//   for(let i = 0; i < )
//   let prop = {"label":"", "urlSlug":""}

// }
</script>
<template>
  <div class="filter-menu">
    <TheAppMenuFilter name="Par dates" :filters="years"></TheAppMenuFilter>
    <TheAppMenuFilter name="Par projets" :filters="projects"></TheAppMenuFilter>
  </div>
</template>
