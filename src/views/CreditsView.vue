<script setup>
import TheMenu from '@/components/TheMenu.vue'
import InfosWrapper from '@/components/InfosWrapper.vue';
import MainScrollX from '@/components/MainScrollX.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>
<template>
  <TheMenu header-title="Crédits et précisions"></TheMenu>
  <MainScrollX>
    <InfosWrapper title="Technologies">
      <div class="credits__container">
        <h3 class="credits__subtitle">Web app</h3>
        <p class="credits__text">
            Ce site est une Progressive Web Application (PWA) réalisée en JavaScript, html et css avec Vue.js.
            Il est par conséquent possible de le télécharger et de le consulter comme une application native.
        </p>
        <h3 class="credits__subtitle">Vue.js</h3>
        <p class="credits__text">
            Un framework open source imaginé et maintenu par Evan You. Il permet de construire des 
            interfaces utilisateur réactives et performantes, en adoptant une approche déclarative et basée sur les composants.</p>
        <h3 class="credits__subtitle">Vue Router</h3>
        <p class="credits__text">
            Développé par Eduardo San Martin Morote et Evan You, assure la navigation programmatique entre les différentes pages du site.  
        </p>
      </div>
    </InfosWrapper>
    <InfosWrapper title="Typographie">
      <div class="credits__container">
        <h3 class="credits__subtitle">Les fontes utilisées</h3>
        <p class="credits__text">
            Sont disponibles gratuitement sur Google Fonts, une bibliothèque de polices de caractères 
            libres de droits.
        </p>
        <h3 class="credits__subtitle">Exo 2</h3>
        <p class="credits__text">
            Ici employée pour les textes et sous-titres, est dessinée par Natanael Gama.
            C'est une fonte géométrique, contemporaine, sans sérif au design futuriste.</p>
        <h3 class="credits__subtitle">Questrial</h3>
        <p class="credits__text">
            Ici employée pour les titres, a été créée par Laura Meseguer et Joe Prince.
            C'est une fonte sans sérif avec des formes circulaires inspirées des grostesques suisses comme Helvetica. 
        </p>
      </div>
    </InfosWrapper>
            <InfosWrapper title="Réseaux sociaux">
      <div class="credits__container">
        <h3 class="credits__subtitle">Bluesky et Pixelfed</h3>
        <p class="credits__text">
            Sont des plateformes sociales décentralisées qui mettent l'accent sur la confidentialité, la 
            liberté d'expression et le contrôle des données personnelles.
        </p>
        <p class="credits__text">
            Elles sans publicité ni algorithmes de recommandation, et n'exigent pas la 
            création d'un compte pour consulter les contenus. Elles ne financent pas les politiques autoritaires et réactionnaires.
        </p>
        <h3 class="credits__subtitle">Bluesky</h3>
        <p class="credits__text">A été crée par Jack Dorsey et les équipes de Twitter. Jay Graber en assure la direction.</p>
        <h3 class="credits__subtitle">Pixelfed</h3>
        <p class="credits__text">Alternative éthique à Instagram, interopérable sur le Fediverse, créée par Daniel Supernault.</p>
      </div>
    </InfosWrapper>
  </MainScrollX>
  <TheFooter></TheFooter>
</template>
<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.credits__subtitle {
  margin-bottom: 5px;
}
.credits__text {
  margin-bottom: 15px;
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
    .credits__container {
        padding: 64px 0;
    }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) {
    .credits__container {
        padding: 64px 0;
    }
}
</style>