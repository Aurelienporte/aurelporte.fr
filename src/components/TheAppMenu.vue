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
header {
  --buttonSide: 30px;
  --halfSide: calc(var(--buttonSide) * 0.5);
  --buttonPadding: 9px;

  border-width: 1px;
  border-style: solid;
  border-image-source: linear-gradient(90deg, transparent 10%, gray 20% 80%, transparent 90%);
  border-image-slice: 0 0 1;
  border-image-width: 1px;
  border-bottom: 1px solid gray;

  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
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
    top: 10vh;
    left: 0;
    width: 100vw;
    translate: 100vh 0;
    transition: all 0.4s ease allow-discrete;

    &:popover-open {
      position: absolute;
      transition: all 0.4s ease allow-discrete;
      translate: 0 0;
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
      --buttonWidth: calc(89vw - var(--buttonSide));
      /*Because shape is not a square and dashes are not perfectly centered after rotation
       it looks better with 89vw instead of 90vw*/
      --borderRadius: 30px;

      opacity: 1;
      background: radial-gradient(
          circle at 100% 30%,
          transparent 20%,
          rgb(26 178 234 / 35%) 65%,
          transparent 85%
        ),
        rgba(21, 20, 50, 0.5);
      mask:
        linear-gradient(#000 calc(10vh + 1px), #fff 0),
        radial-gradient(
            calc(var(--borderRadius) * 2) circle at 100% 100%,
            #000 50%,
            #fff calc(50% + 1px)
          )
          calc(var(--buttonWidth) - 1px) 0 / var(--borderRadius) var(--borderRadius) no-repeat,
        linear-gradient(90deg, #fff var(--buttonWidth), #000 calc(var(--buttonWidth) + 1px)) 0 0 /
          100vh 10vh no-repeat,
        radial-gradient(
            calc(var(--borderRadius) * 2) circle at 0% 0%,
            #000 50%,
            #fff calc(50% + 1px)
          )
          calc(var(--buttonWidth) - var(--borderRadius) + 1px) calc(10vh - var(--borderRadius)) /
          var(--borderRadius) var(--borderRadius) no-repeat;
      mask-composite: add, add, subtract;
      mask-mode: luminance;
      transition:
        background-color 0.3s ease 0.3s allow-discrete,
        opacity 0.5 ease allow-discrete,
        display 0.5s allow-discrete,
        overlay 0.5s allow-discrete;
    }
    @starting-style {
      &:popover-open::backdrop {
        opacity: 0;
        background: rgb(26 178 234 / 40%);
        mask:
          linear-gradient(#000 calc(10vh + 1px), #fff 0),
          radial-gradient(
              calc(var(--borderRadius) * 2) circle at 100% 100%,
              #000 50%,
              #fff calc(50% + 1px)
            )
            calc(var(--buttonWidth) - 1px) 0 / var(--borderRadius) var(--borderRadius) no-repeat,
          linear-gradient(90deg, #fff var(--buttonWidth), #000 calc(var(--buttonWidth) + 1px)) 0 0 /
            100vh 10vh no-repeat,
          radial-gradient(
              calc(var(--borderRadius) * 2) circle at 0% 0%,
              #000 50%,
              #fff calc(50% + 1px)
            )
            calc(var(--buttonWidth) - var(--borderRadius) + 1px) calc(10vh - var(--borderRadius)) /
            var(--borderRadius) var(--borderRadius) no-repeat;
        mask-composite: add, add, subtract;
        mask-mode: luminance;
      }
    }
    @starting-style {
      &:popover-open {
        translate: 100vh 0;
      }
    }
  }

  .navigation-menu__item {
    display: grid;
    place-content: center;
    height: 10vh;
    background-color: white;
    border-width: 1px;
    border-style: solid;
    border-image-source: linear-gradient(90deg, transparent 10%, gray 20% 80%, transparent 90%);
    border-image-slice: 0 0 1;
    border-image-width: 1px;
    border-bottom: 1px solid gray;

    &:last-child {
      border: none;
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
    .navigation-menu {
      width: 50vw;
      height: 80vh;
      display: flex;
      flex-flow: column;
      justify-content: center;
      border-radius: 0 0 0 100px;

      &:popover-open {
        translate: 50vw 0;
      }
      &:popover-open::backdrop {
        --buttonWidth: 50vw;
        /*Because shape is not a square and dashes are not perfectly centered after rotation
       it looks better with 89vw instead of 90vw*/
        --borderRadius: 10vh;

        opacity: 1;
        background: radial-gradient(
            circle at 100% 30%,
            transparent 20%,
            rgb(26 178 234 / 35%) 65%,
            transparent 85%
          ),
          rgba(21, 20, 50, 0.5);
        mask:
          linear-gradient(#000 calc(10vh + 1px), #fff 0),
          linear-gradient(90deg, #fff var(--buttonWidth), #000 calc(var(--buttonWidth) + 1px)) 0 0 /
            100vh 10vh no-repeat,
          radial-gradient(
              calc(var(--borderRadius) * 2) circle at 0% 100%,
              #000 50%,
              #fff calc(50% + 1px)
            )
            calc(var(--buttonWidth) - var(--borderRadius) + 1px) 0 / var(--borderRadius)
            var(--borderRadius) no-repeat;
        mask-composite: add, subtract;
        mask-mode: luminance;
        transition:
          background-color 0.3s ease 0.3s allow-discrete,
          opacity 0.5 ease allow-discrete,
          display 0.5s allow-discrete,
          overlay 0.5s allow-discrete;
      }
      @starting-style {
        &:popover-open::backdrop {
          opacity: 0;
          background: rgb(26 178 234 / 40%);
          mask:
            linear-gradient(#000 calc(10vh + 1px), #fff 0),
            radial-gradient(
                calc(var(--borderRadius) * 2) circle at 100% 100%,
                #000 50%,
                #fff calc(50% + 1px)
              )
              calc(var(--buttonWidth) - 1px) 0 / var(--borderRadius) var(--borderRadius) no-repeat,
            linear-gradient(90deg, #fff var(--buttonWidth), #000 calc(var(--buttonWidth) + 1px)) 0 0 /
              100vh 10vh no-repeat,
            radial-gradient(
                calc(var(--borderRadius) * 2) circle at 0% 0%,
                #000 50%,
                #fff calc(50% + 1px)
              )
              calc(var(--buttonWidth) - var(--borderRadius) + 1px) calc(10vh - var(--borderRadius)) /
              var(--borderRadius) var(--borderRadius) no-repeat;
          mask-composite: add, add, subtract;
          mask-mode: luminance;
        }
      }
    }
  }
}
</style>
