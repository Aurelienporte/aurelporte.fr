<script setup>
import { RouterLink } from 'vue-router'
import worksData from '@/data.json'
// console.log(worksData)
const works = worksData
</script>

<template>
  <div class="about">
    <h1>This is the page with all the works</h1>
    <p>le params de la route est vide</p>
    <RouterLink v-for="work in works" :key="work.id" :to="`/works/${work.urlSlug}`">{{
      work.title
    }}</RouterLink>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
