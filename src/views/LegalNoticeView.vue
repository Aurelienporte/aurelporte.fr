<script setup>
import TheMenu from '@/components/TheMenu.vue'
import InfosWrapper from '@/components/InfosWrapper.vue';
import MainScrollX from '@/components/MainScrollX.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>
<template>
  <TheMenu header-title="Mentions légales"></TheMenu>
  <MainScrollX>
    <InfosWrapper title="Présentation">
      <div class="legal-notice__container">
        <h3 class="legal-notice__subtitle">Éditeur du site</h3>
        <p class="legal-notice__text">
          Ce site est conçu, développé et édité par :
          <br>Aurel Porté
          <br>11 avenue Victor Hugo
          <br>93120 La Courneuve, France
          <br>contact.aurelporte@gmail.com
        </p>
        <h3 class="legal-notice__subtitle">Hébergeur</h3>
          <p class="legal-notice__text">
          Hébergement et déploiement assurés par : 
          <br>Vercel Inc.
          <br>440 N Barranca Ave #4133
          <br>Covina, CA 91723, États‑Unis
          <br>https://vercel.com
        </p>
      </div>
    </InfosWrapper>
    <InfosWrapper title="Engagements">
      <div class="legal-notice__container">
        <h3 class="legal-notice__subtitle">Exactitude</h3>
        <p class="legal-notice__text">
          Je veille à la justesse des informations présentes sur ce site, mais je ne peux garantir l’absence totale 
          d’erreurs ou d’imprécisions.
        </p>
        <h3 class="legal-notice__subtitle">Responsabilité</h3>
        <p>Je ne saurais être tenu responsable d’un dysfonctionnement, d’une indisponibilité temporaire ou de 
          l’usage qui pourrait être fait des contenus proposés.
        </p>
      </div>
    </InfosWrapper>
    <InfosWrapper title="Copyright">
      <div class="legal-notice__container">
        <h3 class="legal-notice__subtitle">Propriété intellectuelle</h3>
        <p class="legal-notice__text">
          Les images, les mots, les lignes de code et l’ensemble des contenus présentés ici sont le fruit
          de mon travail. Ils sont protégés par le droit d’auteur, comme toute œuvre façonnée avec intention, 
          patience et regard.
        </p>
        <h3 class="legal-notice__subtitle">Droit de reproduction</h3>
        <p class="legal-notice__text">
          Je permets la reproduction à titre gracieux, dans la mesure où : l’usage demeure strictement non 
          commercial, mon nom, Aurel Porté, est clairement mentionné, les contenus ne sont ni modifiés ni 
          détournés sans mon accord préalable.</p>
        <p>Toute utilisation commerciale ou transformation substantielle nécessite une autorisation écrite.
        </p>
      </div>
    </InfosWrapper>
    <InfosWrapper title="Données">
        <div class="legal-notice__container">
          <h3 class="legal-notice__subtitle">Absence de collecte de données</h3>
          <p class="legal-notice__text">
            Ce site ne collecte, n'enregistre ou n'exploite aucune donnée personnelle et ne recourt à aucun 
            dispositif de suivi ou d’analyse.
          </p>
          <h3 class="legal-notice__subtitle">Usage des polices</h3>
          <p>Les polices de caractères sont chargées depuis Google Fonts, un service susceptible de recevoir des 
            informations techniques anonymes (comme l’adresse IP ou le type de navigateur) afin d’assurer leur 
            affichage.</p>   
        </div>
    </InfosWrapper>
  </MainScrollX>
  <TheFooter></TheFooter>
</template>
<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.legal-notice__subtitle {
  margin-bottom: 5px;
}
.legal-notice__text {
  margin-bottom: 15px;
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
@media screen and (767px < width <= 1024px) {
    .legal-notice__container {
        padding: 64px 0;
    }
}
/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) {
    .legal-notice__container {
        padding: 64px 0;
    }
}
</style>