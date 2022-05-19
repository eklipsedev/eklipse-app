<template>
  <section class="section">
    <slot></slot>
  </section>
</template>

<style scoped>
.section {
  flex: 1;
  position: relative;
  padding: calc(var(--spacing) * 2) 0;
  overflow: hidden;
}
.section.section--projects {
  padding-bottom: calc(var(--spacing) * 8);
}
@media only screen and (max-width: 1024px) {
  .section.section--projects {
    padding-bottom: calc(var(--spacing) * 2);
  }
}
.section.section--orange {
  background-color: var(--primary-color);
  color: var(--color-white);
}
.section.section--black {
  background-color: var(--color-black);
  color: var(--color-white);
}
.section.section--cream {
  background-color: var(--secondary-color);
}
.section.section--app-footer {
  padding: 20px 0;
  background-color: var(--input-bg-color);
}
</style>
