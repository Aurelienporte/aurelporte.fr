<script setup>
import { RouterLink } from 'vue-router'
import { normalizeName } from '@/utils'
defineProps({
  name: {
    type: String,
    required: true
  },
  filters: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <div class="filter">
    <h2 class="filter__title">{{ name }}</h2>
    <ol class="filter__list">
      <li v-for="filter in filters" :key="filter" class="filter__item">
        <RouterLink class="filter__label" :to="`/works/explorer/${normalizeName(filter)}`">{{
          filter
        }}</RouterLink>
      </li>
    </ol>
  </div>
</template>
