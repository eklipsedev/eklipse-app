<template>
  <div class="empty"><slot></slot></div>
</template>

<style scoped>
.empty {
  padding: var(--spacing-secondary);
  background-color: var(--input-bg-color);
  border-radius: 10px;
  width: 100%;
  text-align: center;
}
</style>
