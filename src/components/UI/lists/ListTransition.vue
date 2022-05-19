<template>
  <transition-group
    tag="ul"
    name="list"
    id="list"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  el: "list",
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      const ELEMENT_DELAY = 50;
      const delay = el.dataset.index * ELEMENT_DELAY;
      setTimeout(() => {
        Velocity(el, {
          opacity: 1,
          complete: done,
        });
      }, delay);
    },
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      el.style.opacity = 0;
      done();
    },
  },
};
</script>
