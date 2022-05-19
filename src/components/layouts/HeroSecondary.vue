<template>
  <header class="hero--header">
    <div class="hero--center">
      <slot></slot>
      <p v-if="subtext" class="hero--subtext"><slot name="subtext"></slot></p>
    </div>
  </header>
</template>

<script>
export default {
  props: ["title", "subtext", "hasLinks"],
};
</script>

<style scoped>
.hero--header {
  position: relative;
  display: flex;
  overflow: hidden;
  height: 40vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
}
@media only screen and (max-width: 991px) {
  .hero--header {
    height: auto;
    padding-top: 80px;
    padding-bottom: var(--spacing);
  }
}
.hero--center {
  position: relative;
  z-index: 5;
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 70vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.hero--subtext {
  max-width: 60ch;
  margin-bottom: 0;
  font-weight: 400;
}
</style>
