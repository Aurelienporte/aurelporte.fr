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
          Ce site est conçu, développé et&nbsp;édité&nbsp;par :
          <br>Aurel Porté
          <br>11 avenue Victor Hugo
          <br>93120 La Courneuve, France
          <br>contact.aurelporte@gmail.com
        </p>
        <h3 class="legal-notice__subtitle">Hébergeur</h3>
          <p class="legal-notice__text">
          Hébergement et déploiement assurés&nbsp;par&nbsp;: 
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
          Je veille à la justesse des informa&shy;tions présentes sur&nbsp;ce site, mais je ne peux garantir l’absence totale 
          d’erreurs ou&nbsp;d’imprécisions.
        </p>
        <h3 class="legal-notice__subtitle">Responsabilité</h3>
        <p>Je ne saurais être tenu responsa&shy;ble d’un dysfonction&shy;ne&shy;ment, d’une indispo&shy;nibilité temporaire ou de 
          l’usage qui pourrait être fait des&nbsp;contenus proposés.
        </p>
      </div>
    </InfosWrapper>
    <InfosWrapper title="Copyright">
      <div class="legal-notice__container">
        <h3 class="legal-notice__subtitle">Propriété intellectuelle</h3>
        <p class="legal-notice__text">
          Les images, les mots, les lignes de&nbsp;code et l’ensemble des&nbsp;conte&shy;nus présentés ici sont le fruit
          de mon travail. Ils&nbsp;sont protégés par le droit d’auteur, comme toute œuvre façonnée avec intention, 
          patience et&nbsp;regard.
        </p>
        <h3 class="legal-notice__subtitle">Droit de reproduction</h3>
        <p class="legal-notice__text">
          Je permets la reproduction à titre gracieux, dans la mes&shy;ure où&nbsp;: l’usage demeure strictement non&nbsp;com&shy;mer&shy;cial,
          mon nom, Aurel Porté, est claire&shy;ment mentionné, les&nbsp;conte&shy;nus ne sont ni&nbsp;modifiés ni&nbsp;détour&shy;nés sans mon accord préalable.</p>
        <p>Toute utilisation commerciale ou&nbsp;trans&shy;formation substantielle nécessite une&nbsp;autorisation écrite.
        </p>
      </div>
    </InfosWrapper>
    <InfosWrapper title="Données">
        <div class="legal-notice__container">
          <h3 class="legal-notice__subtitle">Absence de collecte de données</h3>
          <p class="legal-notice__text">
            Ce site ne collecte, n'enregistre ou&nbsp;n'ex&shy;ploite aucune donnée personnelle et ne&nbsp;recourt à aucun 
            dispositif de&nbsp;suivi ou&nbsp;d’analyse.
          </p>
          <h3 class="legal-notice__subtitle">Usage des polices</h3>
          <p>Les polices de caractères sont chargées depuis Google Fonts, un&nbsp;service suscep&shy;tible de recevoir des 
            informa&shy;tions techni&shy;ques anony&shy;mes (comme l’adres&shy;se IP ou le&nbsp;type de&nbsp;navi&shy;gateur) afin d’assurer leur 
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