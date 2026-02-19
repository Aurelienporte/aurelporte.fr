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
        <h3 class="credits__subtitle">Ceci n'est pas un site</h3>
        <p class="credits__text">
            C'est une Progressive Web Appli&shy;ca&shy;tion (PWA) réalisée en&nbsp;Java&shy;Script, HTML et&nbsp;CSS avec Vue.js.
            Il&nbsp;est par con&shy;sé&shy;quent possible de la télé&shy;char&shy;ger et de la con&shy;sul&shy;ter comme une application native.
        </p>
        <h3 class="credits__subtitle">Vue.js</h3>
        <p class="credits__text">
            Est un framework open source imaginé et&nbsp;main&shy;tenu par Evan You. Il&nbsp;permet de&nbsp;construire des 
            inter&shy;fa&shy;ces utilisateur réacti&shy;ves et&nbsp;perfor&shy;mantes, en adoptant une&nbsp;approche déclarati&shy;ve et&nbsp;basée sur les&nbsp;composants.</p>
        <h3 class="credits__subtitle">Vue Router</h3>
        <p class="credits__text">
            Développé par Eduardo San Martin Morote et Evan You, assure la&nbsp;navi&shy;ga&shy;tion programmatique entre les&nbsp;diffé&shy;rentes pages du site.  
        </p>
      </div>
    </InfosWrapper>
    <InfosWrapper title="Typographie">
      <div class="credits__container">
        <h3 class="credits__subtitle">Les fontes utilisées</h3>
        <p class="credits__text">
            Sont disponibles gratuitement sur Google Fonts, une bibliothèque de&nbsp;poli&shy;ces de caractères 
            libres de&nbsp;droits.
        </p>
        <h3 class="credits__subtitle">Exo 2</h3>
        <p class="credits__text">
            Ici employée pour les textes et&nbsp;sous-titres, est&nbsp;dessi&shy;née par Natanael Gama.
            C'est une fonte géométrique, contem&shy;poraine, sans sérif au design futuriste.</p>
        <h3 class="credits__subtitle">Questrial</h3>
        <p class="credits__text">
            Ici employée pour les titres, a été créée par Laura Meseguer et Joe Prince.
            C'est une fonte sans sérif avec des formes circulai&shy;res inspirées des grostesques suisses comme Helvetica. 
        </p>
      </div>
    </InfosWrapper>
            <InfosWrapper title="Réseaux sociaux">
      <div class="credits__container">
        <h3 class="credits__subtitle">Bluesky et Pixelfed</h3>
        <p class="credits__text">
            Sont des plateformes sociales décen&shy;tra&shy;lisées qui mettent l'accent sur la confi&shy;dentialité, la 
            liberté d'expression et le contrôle des données personnelles.
        </p>
        <p class="credits__text">
            Elles sont sans publicité ni algo&shy;rith&shy;mes de recomman&shy;dation, et&nbsp;n'exi&shy;gent pas la&nbsp;création
             d'un compte pour consulter les conte&shy;nus. Elles ne financent pas l'extrè&shy;me droite ni ne portent atteinte à&nbsp;la démocratie.
        </p>
        <h3 class="credits__subtitle">Bluesky</h3>
        <p class="credits__text">A été crée par Jack Dorsey et les équipes de Twitter. Jay&nbsp;Graber en assure la direction.</p>
        <h3 class="credits__subtitle">Pixelfed</h3>
        <p class="credits__text">Est une alternative éthique à Insta&shy;gram, interopérable sur le Fedi&shy;verse, créée par Daniel Supernault.</p>
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