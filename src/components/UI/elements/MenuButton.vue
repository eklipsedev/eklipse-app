<template>
  <div
    class="nav--burger"
    :class="getIsMenuOpen ? 'open' : null"
    @click="ToggleIsMenuOpen"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  computed: {
    getIsMenuOpen() {
      return this.$store.getters.getIsMenuOpen;
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      if (this.getIsMenuOpen) {
        return this.$store.dispatch("toggleMenu", {
          isMenuOpen: false,
        });
      }
    },
  },
  methods: {
    ToggleIsMenuOpen() {
      return this.$store.dispatch("toggleMenu", {
        isMenuOpen: !this.getIsMenuOpen,
      });
    },
  },
};
</script>

<style scoped>
.nav--burger {
  display: none;
  z-index: 2;
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  overflow: hidden;
  text-align: center;
  transform: rotate(0deg);
  transition: var(--global-transition) ease-in-out;
  cursor: pointer;
}
@media only screen and (max-width: 768px) {
  .nav--burger {
    display: block;
  }
}
.nav--burger:hover span {
  transition: var(--global-transition);
  background-color: var(--primary-color);
}
.nav--burger span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: var(--color-black);
  border-radius: 9px;
  opacity: 1;
  right: 0;
  transform: rotate(0deg);
  transition: var(--global-transition) ease-in-out;
}
.nav--burger.open span {
  background-color: var(--color-black);
}
.nav--burger span:nth-child(1) {
  top: 0px;
}

.nav--burger span:nth-child(2) {
  top: 8px;
  width: 80%;
}

.nav--burger span:nth-child(3) {
  top: 16px;
}

.nav--burger.open span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.nav--burger.open span:nth-child(2) {
  opacity: 0;
  left: -20px;
}

.nav--burger.open span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}
</style>
