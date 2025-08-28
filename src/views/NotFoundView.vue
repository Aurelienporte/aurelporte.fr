<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <main class="notfound">
    <h1 class="notfound__title">Chaque création a ses imperfections...</h1>
    <p class="notfound__text">
      Désolé, il semblerait qu'une erreur se soit glissée dans cette composition.
    </p>
    <p class="notfound__text">
      Revenez à
      <RouterLink to="/" class="notfound__link">l'accueil</RouterLink> ou directement
      <wbr /><RouterLink to="/works" class="notfound__link">à la liste des &oelig;uvres</RouterLink>
      pour reprendre votre visite.
    </p>
  </main>
</template>

<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.notfound {
  box-sizing: border-box;
  height: 100svh;
  padding: 2rem;
  display: grid;
  place-content: center;

  & .notfound__title {
    margin-bottom: 1rem;
  }
  & .notfound__text {
    margin-bottom: 0.5rem;
    text-wrap: pretty;
  }
  & .notfound__link {
    padding: 5px 0;
    font-weight: 600;
    color: var(--saillanceColor);
  }
}
</style>
