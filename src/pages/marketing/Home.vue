<template>
  <div>
    <hero></hero>
    <about-section></about-section>
    <services-section></services-section>
    <projects-section></projects-section>
    <cta-section></cta-section>
  </div>
</template>

<script>
import Hero from "../../components/layouts/Hero.vue";
import AboutSection from "../../components/layouts/sections/AboutSection.vue";
import ServicesSection from "../../components/layouts/sections/ServicesSection.vue";
import ProjectsSection from "../../components/layouts/sections/ProjectsSection.vue";

export default {
  components: {
    Hero,
    AboutSection,
    ServicesSection,
    ProjectsSection,
  },
};
</script>
