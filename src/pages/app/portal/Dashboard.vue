<template>
  <div>
    <hero-secondary
      ><h1 class="heading-container">
        <heading-to-move level="1" text="Dashboard"></heading-to-move></h1
    ></hero-secondary>
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
            v-for="(option, index) in computedList"
            :key="index"
            :data-index="index"
          >
            <base-button
              link
              class="button--reset"
              :to="
                option.title
                  .toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^\w-]+/g, '')
              "
            >
              <base-card
                :icon="option.icon"
                :title="option.title"
                :description="option.description"
              >
              </base-card
            ></base-button>
          </li> </transition-group></base-container
    ></base-section>
  </div>
</template>

<script>
import Velocity from "velocity-animate";
import BaseContainer from "../../../components/layouts/containers/BaseContainer.vue";
import ModalTypeCheck from "./ModalTypeCheck";
import SetModalType from "./SetModalType";
import SetModalVerbiage from "./SetModalVerbiage";

export default {
  components: { BaseContainer },
  mixins: [ModalTypeCheck, SetModalType, SetModalVerbiage],
  el: "#staggered-list",
  data() {
    return {
      query: "",
      modalType: "",
      options: [],
    };
  },
  created() {
    this.$store.dispatch("setMicroProjects");
    setTimeout(() => {
      this.options = [
        {
          title: "Time Tracker",
          description: "See how many hours you have left in your retainer",
          icon: ["fad", "stopwatch"],
        },
        {
          title: "Changelog",
          description: "Keep up-to-date with all changes made to your website.",
          icon: ["fad", "folder-tree"],
        },
        {
          title: "Documents",
          description: "A copy of our signed agreement for your reference.",
          icon: ["fad", "archive"],
        },
      ];
    }, 0);
  },
  computed: {
    computedList() {
      return this.options;
    },
    getMicroProjects() {
      return this.$store.getters.getMicroProjects;
    },
    getActiveMicroProject() {
      return this.$store.getters.getActiveMicroProject;
    },
    getApprovalIsSending() {
      return this.$store.getters.getApprovalIsSending;
    },
  },
  methods: {
    setModal(type, index) {
      this.$store.dispatch("toggleModal");
      this.setModalType(type);
      this.$store.commit("setActiveMicroProject", [
        { ...this.$store.getters.getMicroProject(index), idx: index },
      ]);
    },
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
    approveMicroProject() {
      this.$store.dispatch("approveMicroProject");
    },
  },
};
</script>

<style scoped>
.notification {
  display: flex;
  align-items: center;
  padding: 12px;
  font-weight: 600;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  border-radius: 10px;
}
.notification.margin-bottom {
  margin-bottom: 1rem;
}
.notification-text {
  margin-right: auto;
}
.ticket--divider {
  height: 1px;
  margin: 1.5rem 0;
  border-top: 2px dashed var(--input-bg-color);
}
</style>
