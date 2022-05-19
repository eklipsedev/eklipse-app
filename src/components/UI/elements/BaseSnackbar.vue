<template>
  <transition name="snacks">
    <div v-if="success" class="snackbar">
      <span>{{ title }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["title", "success"],
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  top: auto;
  left: auto;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  color: var(--color-white);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.125rem;
  background-color: var(--primary-color);
  width: 100%;
  padding: 8px 20px;
  margin-top: 0.5rem;
  min-height: 52px;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 1px 1px 29px 0 rgb(0 0 0 / 15%);
}
.snacks-enter-from,
.snacks-leave-to {
  opacity: 0.4;
  transform: scale(0.4);
}

.snacks-enter-active {
  transition: all 1s ease-in;
}
.snacks-leave-active {
  transition: all 1s ease-out;
}

.snacks-enter-to,
.snacks-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
