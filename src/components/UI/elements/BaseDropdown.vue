<template>
  <div
    class="dd"
    :class="hovered ? 'active' : null"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div>
      <slot name="toggle"></slot>
    </div>
    <transition name="move">
      <nav class="dd-list" v-if="hovered">
        <slot name="nav"></slot>
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hovered: false,
    };
  },
};
</script>

<style scoped>
.dd {
  position: relative;
  display: flex;
  margin-bottom: -0.5rem;
  padding-bottom: 0.5rem;
  text-align: left;
  z-index: 900;
}
.active {
  z-index: 901;
}

.dd-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 90%;
  z-index: 901;
  background-color: var(--color-white);
  box-shadow: 1px 1px 29px 0 rgb(0 0 0 / 15%);
  border-radius: 10px;
  min-width: 160px;
  transition: var(--global-transition);
}
.move-enter-active,
.move-leave-active {
  transition: transform var(--global-transition) cubic-bezier(0.5, 0, 0.5, 1),
    opacity var(--global-transition) linear;
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
