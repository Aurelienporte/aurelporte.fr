<template>
  <li class="navigation-menu__item">
    <slot></slot>
  </li>
</template>

<style scoped>
/****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/ /****** SMARTPHONE ******/
.navigation-menu__item {
  display: grid;
  grid-template-rows:
    10vh
    1fr;
  place-items: center;
  border-width: 1px;
  border-style: solid;
  border-image-source: linear-gradient(90deg, transparent 10%, gray 20% 80%, transparent 90%);
  border-image-slice: 0 0 1;
  border-image-width: 1px;
  border-bottom: 1px solid gray;

  &::after,
  &::before {
    content: '';
    grid-area: 1/1/2/2;
    height: 0vh;
    width: 4px;
    transition: height 0.4s ease;
  }
  &::before {
    justify-self: start;
    translate: 48px 0;
  }
  &::after {
    justify-self: end;
    translate: -48px 0;
  }
  &:hover {
    &::after,
    &::before {
      height: 10vh;
      transition: height 0.4s ease;
      background: linear-gradient(transparent 10%, black 20% 80%, transparent 90%);
    }
    & :slotted(:is(.navigation-menu__link, .navigation-menu__button)) {
      font-weight: 700;
      transition: font-weight 0.2s ease;
    }
  }
  &:last-child {
    border: none;
  }

  & :slotted(:is(.navigation-menu__link, .navigation-menu__button)) {
    grid-area: 1/1/2/2;
    padding: 8px;
    transition: font-weight 0.2s ease;
    height: auto;
    box-sizing: border-box;
    font-size: 1.25rem;
  }
  & :slotted(ol) {
    grid-area: 2/1/3/2;
  }
}

/***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/ /***** LAPTOP *****/
@media screen and (1024px <= width) and (orientation: landscape) {
  .navigation-menu__item {
    border-image-width: 2px;
    border-image-source: linear-gradient(
      90deg,
      transparent calc(0% + 48px),
      gray 20% 80%,
      transparent calc(100% - 48px)
    );

    & :slotted(:is(.navigation-menu__link, .navigation-menu__button)) {
      font-size: 1.5rem;
      line-height: 1.5rem;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    }
  }
}
</style>
