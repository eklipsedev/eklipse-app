<template>
  <transition name="pop">
    <div class="modal" v-if="getIsModalOpen"><slot></slot></div
  ></transition>
</template>

<script>
export default {
  props: ["modelValue"],
  computed: {
    getIsModalOpen() {
      return this.$store.getters.getIsModalOpen;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  width: fit-content;
  height: fit-content;
  background-color: var(--color-white);
  border-radius: 20px;
  padding: var(--spacing-secondary);
  z-index: 10001;
  width: 650px;
  max-width: 90vw;
  margin: auto;
  transform: none;
}
.pop-enter-active,
.pop-leave-active {
  transition: transform var(--global-transition) cubic-bezier(0.5, 0, 0.5, 1),
    opacity var(--global-transition) linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(-30%);
}
</style>
