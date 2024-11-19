<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.path)
</script>
<template>
  <div class="about">
    <h1>This is a page with a specific work displayed</h1>
    <p>the page is about {{ $route.params.worktitle }}</p>
  </div>
  <p v-if="$route.params">le params de la route est vide</p>
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
