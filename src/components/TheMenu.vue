<script setup>
import { ref, watch, useTemplateRef } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import TheMenuFilterMenu from './TheMenuFilterMenu.vue'
import TheMenuOverlay from './TheMenuOverlay.vue'
import MenuItem from './MenuItem.vue'


defineProps({
  headerTitle: {
    type: String,
    required: false
  }
})
const menuToggle = defineEmits(['menuToggle'])

function onToggling(payload) {
  menuToggle('menuToggle', payload)
}

const isMenuActive = ref(false)
const isFiltersVisible = ref(false)
const isNavLinksVisible = ref(false)

function toogleMenu() {
  isMenuActive.value = !isMenuActive.value

  if (isNavLinksVisible.value == false && isFiltersVisible.value == false) {
    isNavLinksVisible.value = true
  }
  onToggling(isMenuActive.value)
}

function showFilters() {
  isNavLinksVisible.value = false
  isFiltersVisible.value = true
}

function hideFilters() {
  isNavLinksVisible.value = true
  isFiltersVisible.value = false
}

const route = useRoute()
const activePath = route.fullPath

const navMenu = useTemplateRef('navigationMenu')

watch(
  () => route.path,
  () => {
    navMenu.value.hidePopover()
  }
)
</script>

<template>
  <header>
    <div class="banner">
      <h1 class="banner__title" v-if="headerTitle">{{ headerTitle }}</h1>
      <RouterLink v-else class="banner__title" to="/">Aurel Porté</RouterLink>
      <button
        class="burger"
        popovertarget="navigation-menu"
        popoveraction="toggle"
        :class="{ 'button--up': isMenuActive }"
      >
        <span class="burger__dash" :class="{ close: isMenuActive, open: !isMenuActive }"></span>
        <span class="burger__dash" :class="{ fadeIn: isMenuActive }"></span
        ><span class="burger__dash" :class="{ close: isMenuActive, open: !isMenuActive }"></span>
      </button>
    </div>
    <nav
      class="navigation-menu"
      popover
      id="navigation-menu"
      ref="navigationMenu"
      @toggle="toogleMenu()"
    >
      <ul class="navigation-menu__list" v-if="isNavLinksVisible">
        <!-- Display a link to the works if you're not on the page -->
        <MenuItem v-if="!(activePath === '/works')">
          <RouterLink to="/works" class="navigation-menu__link">&OElig;uvres</RouterLink>
        </MenuItem>

        <!-- Display filters -->
        <MenuItem>
          <button class="navigation-menu__button" @click="showFilters">Filtrer</button>
        </MenuItem>

        <!-- Display a link to infos if you're not already in the page -->
        <MenuItem v-if="!(activePath === '/infos')">
          <RouterLink to="/infos" class="navigation-menu__link">Infos et contact</RouterLink>
        </MenuItem>
      </ul>
      <TheMenuFilterMenu v-if="isFiltersVisible" @visible="hideFilters"></TheMenuFilterMenu>
    </nav>
    <Teleport to="body">
      <TheMenuOverlay :is-visible="isMenuActive"></TheMenuOverlay>
    </Teleport>
  </header>
</template>

<style>
/* GLOBAL CSS VARIABLE */
:root {
  --bannerHeight: min(64px, 10svh);
  --navWidth: 100vw;
}
@media screen and (767px < width < 1024px) {
  :root {
    --bannerHeight: 8svh;
    --navWidth: 50vw;
  }
}
@media screen and (1024px <= width) and (orientation: landscape) {
  :root {
    --bannerHeight: 10svh;
    --navWidth: 25vw;
  }
}
</style>
<style scoped>
/****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/
header {
  --buttonSide: 24px;
  --halfSide: calc(var(--buttonSide) * 0.5);
  --buttonPadding: 8px;
  --buttonWidth: calc(var(--buttonSide) + 2 * var(--buttonPadding));
  --menuHeight: 66svh;

  box-sizing: border-box;
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
    position: relative;
    display: grid;
    grid-template-columns: 3fr 1fr var(--buttonWidth);
    align-items: center;
    height: var(--bannerHeight);
    padding-inline: 5vw calc(5vw - var(--buttonPadding));
    padding-block: 0;

      &::after{
        content: '';
        height: 100%;
        grid-area: 1/2/2/3;
        background: linear-gradient(90deg, transparent 0%, white 100%);
      }

    & .banner__title {
      grid-area: 1/1/2/3;
      font-family: 'Questrial', serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--mainColor);
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .burger {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    height: var(--buttonSide);
    background: white;
    border-radius: 50%;
    padding: var(--buttonPadding);
    box-sizing: content-box;
    border: none;

    &:hover,
    &:focus-visible {
      .burger__dash {
        background-color: var(--saillanceColor);
        transition: color 150ms ease;
      }
    }
    &:focus-visible.burger__dash {
      color: var(--saillanceColor);
      transition: color 150ms ease;
    }
    & .burger__dash {
      --dashHeight: 3px;

      height: var(--dashHeight);
      width: var(--buttonSide);
      background-color: var(--mainColor);

      &:nth-child(1) {
        --switch: 1;
      }
      &:nth-child(2) {
        width: calc(var(--buttonSide) * 0.75);
        transition:
          opacity 200ms ease,
          width 200ms ease;
      }
      &:nth-child(3) {
        --switch: -1;
      }
      &.close {
        animation: isMenuActive 300ms ease-out 1 forwards;
      }
      &.open {
        transform: translateY(calc(var(--switch) * (var(--halfSide) - 0.5 * var(--dashHeight))))
          rotate(calc(var(--switch) * 45deg));
        animation: openButton 300ms ease 1 forwards;
      }
      &.fadeIn {
        opacity: 0;
        width: 0;
        transition:
          opacity 200ms ease,
          width 200ms ease;
      }
    }
  }
  .navigation-menu {
    position: absolute;
    top: var(--bannerHeight);
    left: 0;
    width: 90%;
    height: var(--menuHeight);
    translate: 100vw 0;
    box-sizing: border-box;
    background: linear-gradient(180deg, white 0%, rgb(255 255 255/ 0.9) 100%);
    border-radius: 10px;
    transition: all 300ms ease-out allow-discrete;

    &:popover-open {
      transition: all 300ms ease-out allow-discrete;
      translate: calc(100vw - var(--navWidth) + 5% ) 0;
      /* padding is usefull when filters are displayed */
      padding: 48px 0;
      border: none;
    }
    & .navigation-menu__list {
      display: flex;
      flex-flow: column;
      justify-content: center;
      height: 100%;
    }

    @starting-style {
      &:popover-open {
        translate: 100vw 0;
      }
    }
  }
}
@keyframes isMenuActive {
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
@media screen and (767px < width <= 1024px) {
  header {
    --menuHeight: calc(100svh - 2 * (var(--bannerHeight)));

    border-image-width: 2px;
    border-image-source: linear-gradient(
      90deg,
      transparent 10%,
      rgb(128, 128, 128) 20% 80%,
      transparent 90%
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
      height: var(--menuHeight);
      width: var(--navWidth);
      border-radius: 0 0 0 var(--bannerHeight);
      background-color: rgb(255 255 255 / 1);

      &:popover-open {
        translate: calc(100vw - var(--navWidth)) 0;
      }
          @starting-style {
      &:popover-open {
        translate: 100vw 0;
      }
    }
    }
  }
}

/******LAPTOP ******/ /******LAPTOP ******/ /******LAPTOP ******/ /******LAPTOP ******/ /******LAPTOP ******/ /******LAPTOP ******/
@media screen and (1024px <= width) and (orientation: landscape) {
  header {
    --buttonSide: 30px;
    --buttonPadding: 9px;
    --menuHeight: calc(100svh - 2 * var(--bannerHeight));

    border-image-width: 2px;
    /*border-image is not displayed if width is under 2px */
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
      height: var(--menuHeight);
      width: var(--navWidth);
      border-radius: 0 0 0 var(--bannerHeight);

      &:popover-open {
        padding: 0 0 48px;
        translate: calc(100vw - var(--navWidth)) 0;
      }
    @starting-style {
      &:popover-open {
        translate: 100vw 0;
      }
    }
      &:is(a, .navigation-menu__button) {
        grid-area: 1/1/2/2;
        padding: 8px;
        transition: font-weight 0.2s ease;
        height: auto;
        box-sizing: border-box;
      }
    }
  }
}
</style>
