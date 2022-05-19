<template>
  <div class="track">
    <div class="circle"></div>
  </div>
</template>

<style scoped>
.track {
  position: absolute;
  left: auto;
  top: -30%;
  right: -30%;
  bottom: auto;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  -webkit-animation: rotate 60s linear infinite;
  animation: rotate 60s linear infinite;
}
.circle {
  position: absolute;
  left: 0;
  top: -50%;
  right: 0;
  bottom: 0;
  width: 200%;
  height: 200%;
  border: 5px solid var(--tertiary-color);
  border-radius: 50%;
}
@keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>
