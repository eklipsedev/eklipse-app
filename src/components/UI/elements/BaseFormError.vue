<template>
  <div class="form--error">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  props: ["errorMessage"],
};
</script>

<style scoped>
.form--error {
  font-size: 0.75rem;
  color: var(--error-color);
  font-weight: 500;
  margin-left: 12px;
  margin-top: 5px;
}
</style>
