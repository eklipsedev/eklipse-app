<template>
  <div class="pill">
    <div class="pill--text">{{ content }}</div>
    <font-awesome-icon
      class="remove"
      icon="times"
      @click="remove()"
    ></font-awesome-icon>
  </div>
</template>

<script>
export default {
  props: ["content"],
  emits: ["click"],
  methods: {
    remove() {
      this.$emit("click", []);
    },
  },
};
</script>

<style scoped>
.pill {
  position: relative;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 0.5rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  align-items: center;
  border-radius: 30px;
  background-color: var(--input-bg-color);
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--global-transition);
}
.pill--text {
  display: inline;
  margin-right: 0.75rem;
  max-width: 90%;
}
.remove {
  position: absolute;
  top: 13px;
  left: auto;
  bottom: auto;
  right: 1rem;
  cursor: pointer;
}
</style>
