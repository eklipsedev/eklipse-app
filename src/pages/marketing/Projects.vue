<template>
  <div>
    <hero-secondary
      ><h1 class="heading-container">
        <span>Our</span
        ><heading-to-move level="1" text="work"></heading-to-move>
      </h1>
      <p>
        From e-commerce to mobile apps.
      </p></hero-secondary
    >
    <projects></projects>
    <cta-section></cta-section>
  </div>
</template>

<script>
import Projects from "../../components/UI/Projects/ProjectsSection.vue";

export default {
  components: {
    Projects,
  },
};
</script>

<style scoped>
.heading-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.heading-container span {
  margin-right: 10px;
}
</style>
