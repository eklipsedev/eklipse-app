<template>
  <li class="row">
    <slot></slot>
  </li>
</template>

<style scoped>
.row {
  display: inline-flex;
  width: 100%;
  min-height: 60px;
  margin-bottom: 0.5rem;
  align-items: stretch;
  align-content: flex-start;
  border-radius: 10px;
  background-color: var(--input-bg-color);
  color: var(--color-black);
}
@media only screen and (max-width: 942px) {
  .row {
    position: relative;
    display: block;
    padding: 0.75rem;
  }
}
</style>
