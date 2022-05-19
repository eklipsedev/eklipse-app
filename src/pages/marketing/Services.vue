<template>
  <div>
    <hero-secondary
      hasLinks="true"
      ><h1 class="heading-container">
        <span>Our</span
        ><heading-to-move level="1" text="services"></heading-to-move>
      </h1>
      <p>
        Some of the things we can do for you.
      </p>
    </hero-secondary>
    <base-section>
      <base-container class="container--vertical" id="staggered-list">
        <transition-group
          tag="ul"
          name="staggered-fade"
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
          class="grid"
        >
          <li
            v-for="(service, index) in computedList"
            :key="index"
            :data-index="index"
          >
            <base-card
              :icon="['fad', service.icon]"
              :title="service.serviceName"
              :description="service.description"
            >
            </base-card></li></transition-group></base-container
    ></base-section>
    <cta-section></cta-section>
  </div>
</template>

<script>
import Velocity from "velocity-animate";
import BaseSection from "../../components/layouts/containers/BaseSection.vue";

export default {
  components: { BaseSection },
  el: "#staggered-list",
  computed: {
    computedList() {
      return this.$store.getters.getMicroServices;
    },
    getRootServices() {
      return this.$store.getters.getRootServices;
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      const ELEMENT_DELAY = 100;
      const delay = el.dataset.index * ELEMENT_DELAY;
      setTimeout(() => {
        Velocity(el, {
          opacity: 1,
          complete: done,
        });
      }, delay);
    },
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
