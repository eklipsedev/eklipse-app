<template>
  <div class="square"></div>
</template>

<style scoped>
.square {
  position: absolute;
  left: 0;
  top: -55%;
  right: auto;
  bottom: auto;
  width: 30%;
  height: 30%;
  border: 5px solid var(--color-black);
  transform: rotate(-10deg);
  -webkit-animation: rotate 90s linear infinite;
  animation: rotate 90s linear infinite;
}
@keyframes rotate {
  from {
    -webkit-transform: rotate(10deg);
    transform: rotate(10deg);
  }
  to {
    -webkit-transform: rotate(-370deg);
    transform: rotate(-370deg);
  }
}
</style>
