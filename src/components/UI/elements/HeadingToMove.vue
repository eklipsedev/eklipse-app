<template>
  <div class="heading-to-move-container" :class="secondary ? 'secondary' : ''">
    <component
      :is="'h' + level"
      class="heading-to-move"
      :class="scrolled ? 'scrolled' : ''"
      ref="heading"
      >{{ text }}</component
    >
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    secondary: {
      type: Boolean,
      required: false,
      default: false,
    },
    level: {
      type: String,
      required: false,
      default: "2",
    },
  },
  data() {
    return {
      scrolled: false,
    };
  },
  methods: {
    elementInView(el, dividend = 1) {
      const elementTop = el.getBoundingClientRect().top;

      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    },
    elementOutOfView(el) {
      const elementTop = el.getBoundingClientRect().top;

      return (
        elementTop >
        (window.innerHeight || document.documentElement.clientHeight)
      );
    },
    handleScrollAnimation(el) {
      if (this.elementInView(el, 1.35)) {
        this.scrolled = true;
      } else if (this.elementOutOfView(el)) {
        this.scrolled = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.handleScrollAnimation(this.$refs.heading);
    });
    window.scrollBy(0, 1);
  },
  /* unmounted() {
    window.removeEventListener("scroll", this.handleScrollAnimation);
  }, */
};
</script>

<style scoped>
.heading-to-move-container {
  overflow: hidden;
  border-bottom: 10px solid var(--primary-color);
}
@media only screen and (max-width: 991px) {
  .heading-to-move-container {
    border-bottom: 1vw solid var(--primary-color);
  }
}
.heading-to-move-container.secondary {
  border-bottom-color: var(--color-white);
}
.heading-to-move {
  opacity: 0;
  transform: translateY(100%);
  transform-style: preserve-3d;
  transition: calc(var(--global-transition) * 2) ease;
}
.heading-to-move.scrolled {
  opacity: 1;
  transform: translateY(0%);
  transform-style: preserve-3d;
}
</style>
