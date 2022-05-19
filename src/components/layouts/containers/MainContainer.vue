<template>
  <main class="main--wrapper">
    <div class="body--wrapper">
      <div class="body--overlay" :class="getIsMenuOpen ? 'open' : null"></div>
      <slot></slot>
    </div>

  </main>
</template>

<script>
export default {

  computed: {
    getIsMenuOpen() {
      return this.$store.getters.getIsMenuOpen;
    },
  },
};
</script>

<style scoped>
.main--wrapper {
  display: flex;
  overflow: hidden;
  min-height: calc(100vh + 1px);
}
.body--wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-width: 100vw;
  transform: translateX(0px);
  transition: var(--global-transition) ease-in-out;
}
.body--wrapper.open {
  transform: translateX(-400px);
}
.body--overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(var(--black), 0.9);
  opacity: 0;
  z-index: -1;
  transition: var(--global-transition) ease-in-out;
}
.body--overlay.open {
  opacity: 1;
  z-index: 500;
}
</style>
