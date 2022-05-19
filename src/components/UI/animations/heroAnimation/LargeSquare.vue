<template>
  <div class="square"></div>
</template>

<style scoped>
.square {
  position: absolute;
  left: -10%;
  top: auto;
  right: auto;
  bottom: 6%;
  width: 100%;
  height: 100%;
  border: 1rem solid var(--primary-color);
  transform: rotate(55deg);
  -webkit-animation: rotate 60s linear infinite;
  animation: rotate 60s linear infinite;
}
@keyframes rotate {
  from {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  to {
    -webkit-transform: rotate(405deg);
    transform: rotate(405deg);
  }
}
</style>
