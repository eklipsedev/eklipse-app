<template>
  <div class="track">
    <div class="circle"></div>
  </div>
</template>

<style scoped>
.track {
  position: absolute;
  left: auto;
  top: auto;
  right: -20%;
  bottom: -30%;
  width: 50%;
  height: 50%;
  border-radius: 50px;
  -webkit-animation: rotate 30s linear infinite;
  animation: rotate 30s linear infinite;
}
.circle {
  position: absolute;
  top: -30%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--color-black);
}
@keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
