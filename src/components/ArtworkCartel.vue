<script setup>
defineProps({
  dataSheet: { type: Boolean, required: true },
  title: { type: String, required: false },
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
</script>
<template>
  <div class="cartel">
    <h3 v-if="dataSheet">{{ title }}</h3>
    <p v-if="dataSheet" class="cartel__text">
      {{ materials }}<br />{{ height === 'dv' ? 'dimensions variables' : `${height}cm x ${width}cm`
      }}{{ depth === '' ? '' : `${depth}cm` }} ,
      {{ year }}
    </p>
    <p v-else class="cartel__text">{{ text }}</p>
  </div>
</template>
