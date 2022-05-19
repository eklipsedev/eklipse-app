<template>
  <div class="square"></div>
</template>

<style scoped>
.square {
  position: absolute;
  left: 0;
  top: auto;
  right: 0;
  bottom: -70%;
  width: 40%;
  height: 40%;
  background-color: var(--color-black);
  transform: rotate(15deg);
  -webkit-animation: rotate 45s linear infinite;
  animation: rotate 45s linear infinite;
}
@keyframes rotate {
  from {
    -webkit-transform: rotate(10deg) translate(0px, 0px);
    transform: rotate(10deg) translate(0px, 0px);
  }
  50% {
    -webkit-transform: rotate(-90deg) translate(10px, -40px);
    transform: rotate(-90deg) translate(10px, -40px);
  }
  to {
    -webkit-transform: rotate(10deg) translate(0px, 0px);
    transform: rotate(10deg) translate(0px, 0px);
  }
}
</style>
