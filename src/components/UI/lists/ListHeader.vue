<template>
  <div class="top-header">
    <slot></slot>
  </div>
</template>

<style scoped>
.top-header {
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
  border-radius: 6px;
  background-color: var(--color-black);
  color: var(--color-white);
  font-weight: 500;
}
@media only screen and (max-width: 942px) {
  .top-header {
    display: none;
  }
}
</style>
