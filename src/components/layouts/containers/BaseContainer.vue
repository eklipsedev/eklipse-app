<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  width: 90vw;
  max-width: 1224px;
  margin: 0 auto;
}
.container.container--hero {
  max-width: 1400px;
}
.container.container--vertical {
  max-width: 1024px;
  flex-direction: column;
  align-items: stretch;
}
.container.container--center {
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
.container.container--center.container--tight {
  max-width: 600px;
}
.container.container--half {
  flex: 0 50%;
}
.container.container--half.container--center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container--margin-bottom {
  margin-bottom: 75px;
}
.container.container--overflow-hidden {
  overflow: hidden;
}
.container.container--overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-image: linear-gradient(
    90deg,
    var(--color-white),
    transparent 50%,
    transparent 0,
    var(--color-white)
  );
}
@media only screen and (max-width: 991px) {
  .container.container--hero {
    flex-direction: column;
  }
}
</style>
