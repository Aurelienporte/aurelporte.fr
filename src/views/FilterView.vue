<script setup>
import { RouterLink } from 'vue-router'
import TheAppMenu from '@/components/TheAppMenu.vue'
// import dataSrc from '@/data.json'
// const works = dataSrc.works
const works = [
  { id: 1, title: 'firstwork' },
  { id: 2, title: 'secondwork' }
]
</script>

<template>
  <TheAppMenu></TheAppMenu>
  <div class="about">
    <h1>Cette page appellera le mur en lui passant le filtre en props</h1>
    <p>le params de la route est vide</p>
    <RouterLink v-for="work in works" :key="work.id" :to="`/works/${work.title}`">{{
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
