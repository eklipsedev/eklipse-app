<template>
  <div class="upload">
    <div class="upload-header">
      <div>{{ title }}</div>
    </div>
    <div class="upload-body">
      <font-awesome-icon :icon="icon" class="fa-sm"></font-awesome-icon>
      <div>{{ fileName }}</div>
    </div>
  </div>
</template>

<style scoped>
.upload {
  position: fixed;
  left: auto;
  top: auto;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 10000;
  overflow: hidden;
  border-radius: 10px;
  background-color: var(--color-white);
  box-shadow: 3px 3px 8px 0 #d7d7d7;
  font-size: 0.875rem;
}
.upload-header {
  display: flex;
  padding: 1rem 2rem;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: var(--color-black);
  color: var(--color-white);
  font-weight: 500;
}
.upload-body {
  display: flex;
  padding: 1rem 2rem;
  align-items: center;
}
</style>
