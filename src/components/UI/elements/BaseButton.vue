<template>
  <button class="button" v-if="!link" :to="to" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      required: false,
      default: "",
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-flex;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--primary-color);
  color: var(--color-white);
  font-size: 20px;
  font-weight: 500;
  font-family: inherit;
  text-align: center;
  white-space: nowrap;
  border: 0;
  line-height: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: var(--global-transition);
}
.button:hover {
  opacity: 0.9;
}
.button:disabled {
  cursor: default;
  background-color: var(--tertiary-color);
}
.button.button--reset {
  padding: 0;
  border-radius: 0;
  background-color: transparent;
  white-space: inherit;
  text-align: inherit;
}
.button.button--reset:hover {
  background-color: transparent;
}
.button--nav {
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: var(--color-black);
  background-color: transparent;
  font-weight: 600;
  text-align: center;
  font-size: 0.875rem;
}
.button--nav:hover {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}
.button--nav-tertiary {
  display: inline-flex;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  font-weight: 600;
  text-align: center;
  font-size: 0.875rem;
}
.button--nav-tertiary:hover {
  color: var(--color-white);
}
.button--nav-tertiary:disabled {
  cursor: not-allowed;
  color: var(--primary-color);
  background: var(--secondary-color);
  opacity: 1;
}
.button--nav-secondary {
  display: inline-flex;
  padding: 0.75rem 1rem;
  white-space: nowrap;
  font-size: 0.875rem;
  background-color: white;
  color: var(--color-black);
  border-radius: 0;
  width: 100%;
  justify-content: flex-start;
}
.button--nav-secondary.active {
  background-color: var(--input-bg-color);
}
.button--nav-secondary:hover {
  background-color: var(--input-bg-color);
}
.button.footer--form-submit {
  position: absolute;
  left: auto;
  top: auto;
  right: 0;
  bottom: 0;
  font-size: 0.875rem;
  width: 70px;
  height: 52px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: var(--primary-color);
  -webkit-transition: 0.2s;
  transition: 0.2s;
  font-weight: 500;
}
.button--full {
  margin-right: 0 !important;
}
.button--mr-auto {
  margin-right: auto;
}
@media only screen and (max-width: 991px) {
  .button {
    padding: 8px 20px;
    font-size: 1rem;
  }
  .button--commit {
    position: fixed;
    top: auto;
    left: auto;
    bottom: 20px;
    right: 40px;
    z-index: 1000;
  }
}
</style>
