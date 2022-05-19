<template>
  <transition name="fade">
    <div class="backdrop" v-if="getIsModalOpen" @click="close()">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    getIsModalOpen() {
      return this.$store.getters.getIsModalOpen;
    },
  },
  methods: {
    close() {
      this.$store.dispatch("toggleModal");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(var(--black), 0.9);
  cursor: pointer;
}
.not-allowed {
  cursor: not-allowed;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--global-transition) linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
