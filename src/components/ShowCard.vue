<script setup>
defineProps({
  title: String,
  place: String
})
</script>
<template>
  <div class="expo">
    <h3>{{ title }}</h3>
    <p>{{ place }}</p>
  </div>
</template>
<style scoped>
.expo {
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid grey;
}
</style>
