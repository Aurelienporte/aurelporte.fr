<script setup></script>
<template>
    <footer class="the-footer">
        <RouterLink class="footer__link" to="/mentions_legales">Mentions légales</RouterLink>
        <RouterLink class="footer__link" to="/credits">Crédits</RouterLink>
        <!-- <p class="the-footer__text">© 2026 Aurel Porte</p> -->
    </footer>
</template>
<style scoped>
/***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/ /***|| SMARTPHONE ||***/
.the-footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
  height: var(--bannerHeight);
  background-color: rgb(0, 0, 0, 0.2);
}
.footer__link {
    color: black;
    padding-inline: 5px;
    padding-block: 15px;
    font-size: 0.875rem;
    text-decoration: underline solid black;
    text-underline-offset: 3px;

    &.router-link-active {
        font-size: 1rem;
        font-weight: 600;
        text-decoration-thickness: 2px;
    }
}
/****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/ /****| TABLET |****/
/* @media screen and (767px < width < 1024px) {
} */

/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
.the-footer {
display: flex;
align-items: center;
gap: 20px;
padding-inline: 20px;
}
}
</style>