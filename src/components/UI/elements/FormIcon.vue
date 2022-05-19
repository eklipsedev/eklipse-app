<template>
  <div class="form-icon" :class="password ? 'password' : null">
    <img :src="src" width="16" height="16" :alt="alt" />
  </div>
</template>

<script>
export default {
  props: ["password", "src", "alt"],
};
</script>

<style scoped>
.form-icon {
  position: absolute;
  left: 12px;
  top: 42px;
  right: auto;
  bottom: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-icon.password {
  right: 0.75rem;
  left: auto;
  cursor: pointer;
}
</style>
