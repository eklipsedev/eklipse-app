<template>
  <nav class="side-drawer" :class="getIsMenuOpen ? 'open' : null">
    <h3 class="heading-21">Menu</h3>
    <base-button link to="/projects" class="button--nav">Projects</base-button>
    <base-button link to="/services" class="button--nav">Services</base-button>
    <base-button link to="/contact" class="button--nav">Contact</base-button>
    <base-button link to="/login" class="button--nav">Login</base-button>
  </nav>
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
.side-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: auto;
  right: -400px;
  z-index: 1;
  display: flex;
  width: 400px;
  min-width: 400px;
  height: 100vh;
  padding: 100px 3rem 3.6rem 3rem;
  background-color: var(--color-white);
  flex-direction: column;
  transform: translateX(0px);
  transition: var(--global-transition) ease-in-out;
}
.side-drawer.open {
  transform: translateX(-400px);
}
.heading-21 {
  margin-right: auto;
  margin-bottom: var(--spacing-secondary);
  margin-left: auto;
  border-bottom: 4px solid var(--primary-color);
  text-align: center;
}
</style>
