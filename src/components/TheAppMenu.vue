<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

defineProps({
  headerTitle: {
    type: String,
    required: false
  }
})
const setCloseButton = ref(false)
const clicked = ref(false)
function toogleButton() {
  setCloseButton.value = !setCloseButton.value
  clicked.value = true
}
const route = useRoute()
const activePath = route.fullPath
</script>

<template>
  <header>
    <div class="banner">
      <h1 class="banner__title" v-if="headerTitle">{{ headerTitle }}</h1>
      <span v-else class="banner__title">Aurel Porté</span>

      <button class="burger" popovertarget="navigation-menu" popoveraction="toggle">
        <span
          class="burger__dash"
          :class="{ close: setCloseButton, open: !(setCloseButton == clicked) }"
        ></span>
        <span class="burger__dash" :class="{ fadeIn: setCloseButton }"></span
        ><span
          class="burger__dash"
          :class="{ close: setCloseButton, open: !(setCloseButton == clicked) }"
        ></span>
      </button>
    </div>
    <nav class="navigation-menu" popover id="navigation-menu" @toggle="toogleButton()">
      <ul>
        <li class="navigation-menu__item"><RouterLink to="/">Accueil</RouterLink></li>
        <!-- Display a link to the works if you're not already in the page -->
        <li
          v-if="!(activePath === '/works' || activePath.substring(0, 16) === '/works/explorer/')"
          class="navigation-menu__item"
        >
          <RouterLink to="/works">&OElig;uvres</RouterLink>
        </li>
        <!-- Display filters if you're on the works pages -->
        <li
          v-if="activePath === '/works' || activePath.substring(0, 16) === '/works/explorer/'"
          class="navigation-menu__item"
        >
          <button class="navigation-menu__button">Filtres</button>
        </li>
        <!-- Display a link to infos if you're not already in the page -->
        <li v-if="!(activePath === '/infos')" class="navigation-menu__item">
          <RouterLink to="/infos">Infos</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/
header {
  --bannerHeight: 10vh;
  --buttonSide: 30px;
  --halfSide: calc(var(--buttonSide) * 0.5);
  --buttonPadding: 9px;
  --navWidth: 100vw;
  position: sticky;
  left: 0;
  top: 0;
  border-width: 1px;
  border-style: solid;
  border-image-source: linear-gradient(
    90deg,
    transparent 10%,
    rgb(128, 128, 128) 20% 80%,
    transparent 90%
  );
  border-image-slice: 0 0 1;
  border-image-width: 1px;
  border-bottom: 1px solid gray;

  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--bannerHeight);
    padding-inline: 5vw calc(5vw - var(--buttonPadding));
    padding-block: 0;

    & .banner__title {
      font-family: 'Questrial', serif;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }

  .burger {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    height: var(--buttonSide);
    background: white;
    padding: var(--buttonPadding);
    box-sizing: content-box;
    border: none;

    & .burger__dash {
      --dashHeight: 4px;

      height: var(--dashHeight);
      width: var(--buttonSide);
      background-color: black;
      &:nth-child(1) {
        --switch: 1;
      }
      &:nth-child(2) {
        width: calc(var(--buttonSide) * 0.75);
        transition: all 200ms ease 200ms;
      }
      &:nth-child(3) {
        --switch: -1;
      }
      &.close {
        animation: closeButton 400ms ease 1 forwards;
      }
      &.open {
        transform: translateY(calc(var(--switch) * (var(--halfSide) - 0.5 * var(--dashHeight))))
          rotate(calc(var(--switch) * 45deg));
        animation: openButton 400ms ease 1 forwards;
      }
      &.fadeIn {
        opacity: 0;
        width: 0;
        transition: all 200ms ease;
      }
    }
  }
  .navigation-menu {
    position: absolute;
    top: var(--bannerHeight);
    left: 0;
    width: var(--navWidth);
    height: 33vh;
    translate: 100vw 0;
    transition: all 0.4s ease allow-discrete;

    &:popover-open {
      display: flex;
      flex-flow: column;
      justify-content: center;
      transition: all 0.4s ease allow-discrete;
      translate: calc(100vw - var(--navWidth)) 0;
      border: none;
    }
    &::backdrop {
      transition:
        background-color 0.3s ease 0.3s allow-discrete,
        opacity 0.5s ease allow-discrete,
        display 0.5s allow-discrete,
        overlay 0.5s allow-discrete;
    }

    &:popover-open::backdrop {
      --tabX: calc(89vw - var(--buttonSide));
      /*computed empty space length, give visible width to the X tab.
      89vw looks better than 90vw because of the irregular shape*/
      --borderRadius: 20px;

      opacity: 1;
      background: radial-gradient(
          circle at 100% 30%,
          transparent 20%,
          rgb(26 178 234 / 35%) 65%,
          transparent 85%
        ),
        rgba(21, 20, 50, 0.5);
      mask:
        linear-gradient(#000 calc(var(--bannerHeight) + 1px), #fff 0),
        radial-gradient(
            calc(var(--borderRadius) * 2) circle at 100% 100%,
            #000 50%,
            #fff calc(50% + 1px)
          )
          calc(var(--tabX) - 1px) 0 / var(--borderRadius) var(--borderRadius) no-repeat,
        linear-gradient(90deg, #fff var(--tabX), #000 calc(var(--tabX) + 1px)) 0 0 / 100vh
          var(--bannerHeight) no-repeat,
        radial-gradient(
            calc(var(--borderRadius) * 2) circle at 0% 0%,
            #000 50%,
            #fff calc(50% + 1px)
          )
          calc(var(--tabX) - var(--borderRadius) + 1px)
          calc(var(--bannerHeight) - var(--borderRadius)) / var(--borderRadius) var(--borderRadius)
          no-repeat;
      mask-composite: add, add, subtract;
      mask-mode: luminance;
      transition:
        background-color 0.3s ease 0.3s allow-discrete,
        opacity 0.5s ease allow-discrete,
        display 0.5s allow-discrete,
        overlay 0.5s allow-discrete;
    }
    @starting-style {
      &:popover-open::backdrop {
        opacity: 0;
        background: rgb(26 178 234 / 40%);
        mask:
          linear-gradient(#000 calc(var(--bannerHeight) + 1px), #fff 0),
          radial-gradient(
              calc(var(--borderRadius) * 2) circle at 100% 100%,
              #000 50%,
              #fff calc(50% + 1px)
            )
            calc(var(--tabX) - 1px) 0 / var(--borderRadius) var(--borderRadius) no-repeat,
          linear-gradient(90deg, #fff var(--tabX), #000 calc(var(--tabX) + 1px)) 0 0 / 100vh
            var(--bannerHeight) no-repeat,
          radial-gradient(
              calc(var(--borderRadius) * 2) circle at 0% 0%,
              #000 50%,
              #fff calc(50% + 1px)
            )
            calc(var(--tabX) - var(--borderRadius) + 1px)
            calc(var(--bannerHeight) - var(--borderRadius)) / var(--borderRadius)
            var(--borderRadius) no-repeat;
        mask-composite: add, add, subtract;
        mask-mode: luminance;
      }
    }
    @starting-style {
      &:popover-open {
        translate: 100vw 0;
      }
    }
  }

  .navigation-menu__item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 10vh;
    background: white;
    border-width: 1px;
    border-style: solid;
    border-image-source: linear-gradient(90deg, transparent 10%, gray 20% 80%, transparent 90%);
    border-image-slice: 0 0 1;
    border-image-width: 1px;
    border-bottom: 1px solid gray;

    &::after,
    &::before {
      content: '';
      height: 0vh;
      width: 4px;
      transition: height 0.4s ease;
      align-self: center;
    }

    &:hover {
      &::after,
      &::before {
        height: 10vh;
        transition: height 0.4s ease;
        background: linear-gradient(transparent 10%, black 20% 80%, transparent 90%);
      }
    }
    &:last-child {
      border: none;
    }
    &:hover {
      :is(a, .navigation-menu__button) {
        font-weight: 700;
        transition: font-weight 0.2s ease;
      }
    }
    :is(a, .navigation-menu__button) {
      padding: 8px 16px;
      transition: font-weight 0.2s ease;
    }
    & .navigation-menu__button {
      font-size: 1rem;
      background-color: transparent;
      border: none;
    }
  }
}
@keyframes closeButton {
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(calc(var(--switch) * (var(--halfSide) - 0.5 * var(--dashHeight))))
      rotate(0);
  }
  100% {
    transform: translateY(calc(var(--switch) * (var(--halfSide) - 0.5 * var(--dashHeight))))
      rotate(calc(var(--switch) * 45deg));
  }
}
@keyframes openButton {
  0% {
    transform: translateY(calc(var(--switch) * (var(--halfSide) - 0.5 * var(--dashHeight))))
      rotate(calc(var(--switch) * 45deg));
  }
  50% {
    transform: translateY(calc(var(--switch) * (var(--halfSide) - 0.5 * var(--dashHeight))))
      rotate(0);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
}
/******* TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET TABLET *******/
@media screen and (767px < width < 1024px) {
  header {
    --bannerHeight: 8vh;
    --navWidth: 50vw;
    border-image-width: 2px;
    border-image-source: linear-gradient(
      90deg,
      transparent,
      rgb(128, 128, 128) 50%,
      transparent 100%
    );
    &:has(:popover-open) {
      border-image-source: linear-gradient(
        90deg,
        transparent,
        gray 50% calc(100vw - var(--navWidth)),
        transparent 0
      );
    }
    .navigation-menu {
      height: calc(100vh - 2 * (var(--bannerHeight)));
      border-radius: 0 0 0 var(--bannerHeight);

      &:popover-open::backdrop {
        --borderRadius: var(--bannerHeight);
        --tabX: calc(100vw - var(--navWidth));

        opacity: 1;
        background: radial-gradient(
            circle at 100% 30%,
            transparent 20%,
            rgb(26 178 234 / 35%) 65%,
            transparent 85%
          ),
          rgba(21, 20, 50, 0.5);
        mask:
          linear-gradient(#000 var(--bannerHeight), #fff 0),
          linear-gradient(90deg, #fff var(--tabX), #000 var(--tabX)),
          radial-gradient(
              calc(var(--borderRadius) * 2) circle at -1px 100%,
              #000 50%,
              #fff calc(50% + 1px)
            )
            calc(var(--tabX) - var(--borderRadius)) 0 / var(--borderRadius) var(--borderRadius)
            no-repeat;
        mask-composite: add, subtract;
        mask-mode: luminance;
        transition:
          background-color 0.3s ease 0.3s allow-discrete,
          opacity 0.5s ease allow-discrete,
          display 0.5s allow-discrete,
          overlay 0.5s allow-discrete;
      }
      @starting-style {
        &:popover-open::backdrop {
          opacity: 0;
          background: rgb(26 178 234 / 40%);
          mask:
            linear-gradient(#000 var(--bannerHeight), #fff 0),
            linear-gradient(90deg, #fff var(--tabX), #000 var(--tabX)),
            radial-gradient(
                calc(var(--borderRadius) * 2) circle at -1px 100%,
                #000 50%,
                #fff calc(50% + 1px)
              )
              calc(var(--tabX) - var(--borderRadius)) 0 / var(--borderRadius) var(--borderRadius)
              no-repeat;
          mask-composite: add, subtract;
          mask-mode: luminance;
        }
      }
    }
    & .navigation-menu__item {
      :is(a, .navigation-menu__button) {
        font-size: 1.5rem;
      }
    }
  }
}
/******LAPTOP ******/ /******LAPTOP ******/ /******LAPTOP ******/ /******LAPTOP ******/ /******LAPTOP ******/ /******LAPTOP ******/
@media screen and (1024px <= width) and (orientation: landscape) {
  header {
    --navWidth: 25vw;

    border-image-width: 2px;
    /*for unkwnown reasons border-image is not displayed if width is under 2px */
    border-image-source: linear-gradient(
      90deg,
      transparent,
      rgb(128, 128, 128) 50%,
      transparent 100%
    );

    &:has(:popover-open) {
      border-image-source: linear-gradient(
        90deg,
        transparent,
        gray 50% calc(100vw - var(--navWidth)),
        transparent 0
      );
    }
    .banner {
      padding-inline: 1vw calc(1vw - var(--buttonPadding));
    }
    .navigation-menu {
      height: calc(100vh - 2 * var(--bannerHeight));
      border-radius: 0 0 0 var(--bannerHeight);

      &:popover-open::backdrop {
        --borderRadius: var(--bannerHeight);
        --tabX: calc(100vw - var(--navWidth));

        opacity: 1;
        background: radial-gradient(
            circle at 100% 30%,
            transparent 20%,
            rgb(26 178 234 / 35%) 65%,
            transparent 85%
          ),
          rgba(21, 20, 50, 0.5);
        mask:
          linear-gradient(#000 var(--bannerHeight), #fff 0),
          linear-gradient(90deg, #fff var(--tabX), #000 var(--tabX)),
          radial-gradient(
              calc(var(--borderRadius) * 2) circle at -1px 100%,
              #000 50%,
              #fff calc(50% + 1px)
            )
            calc(var(--tabX) - var(--borderRadius)) 0 / var(--borderRadius) var(--borderRadius)
            no-repeat;
        mask-composite: add, subtract;
        mask-mode: luminance;
        transition:
          background-color 0.3s ease 0.3s allow-discrete,
          opacity 0.5s ease allow-discrete,
          display 0.5s allow-discrete,
          overlay 0.5s allow-discrete;
      }
      @starting-style {
        &:popover-open::backdrop {
          opacity: 0;
          background: rgb(26 178 234 / 40%);
          mask:
            linear-gradient(#000 10vh, #fff 0),
            linear-gradient(90deg, #fff var(--tabX), #000 var(--tabX)),
            radial-gradient(
                calc(var(--borderRadius) * 2) circle at -1px 100%,
                #000 50%,
                #fff calc(50% + 1px)
              )
              calc(var(--tabX) - var(--borderRadius)) 0 / var(--borderRadius) var(--borderRadius)
              no-repeat;
          mask-composite: add, subtract;
          mask-mode: luminance;
        }
      }
    }
    & .navigation-menu__item {
      border-image-width: 2px;

      :is(a, .navigation-menu__button) {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
