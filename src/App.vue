<template>
  <div>
    <router-view name="nav"></router-view>
    <main-container>
      <router-view name="default" v-slot="slotProps">
        <component :is="slotProps.Component"></component>
      </router-view>
      <router-view name="footer"></router-view>
    </main-container>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("tryLogin").then(() => {
      this.$store.dispatch("setCompany").then(() => {
        this.$store.dispatch("setCompanyRef");
      });
    });
    this.$store.dispatch("setServices");
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(currentValue, oldValue) {
      if (currentValue & (currentValue !== oldValue)) {
        this.$router.replace("/login");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

* {
  box-sizing: border-box;
}
:root {
  --color: 245, 91, 35;
  --black: 49, 49, 49;
  --primary-color: rgb(var(--color));
  --secondary-color: rgba(var(--color), 0.1);
  --tertiary-color: rgba(var(--color), 0.5);
  --color-white: #fff;
  --color-black: rgb(var(--black));
  --input-bg-color: #f7f7f7;
  --input-text-color: #797979;
  --error-color: red;
  --success-color: green;
  --global-transition: 0.25s;
  --spacing: 4rem;
  --spacing-secondary: calc(var(--spacing) / 2);
}
body {
  display: block;
  font-family: Poppins, sans-serif;
  color: var(--color-black);
  font-size: 100%;
  line-height: normal;
  cursor: default;
  margin: 0;
}
h1, h2 {
  margin: 0;
  margin-block-start: 0em;
  margin-block-end: 0em;
  font-size: 3vw;
  line-height: normal;
  font-weight: 700;
}
h3 {
  margin: 0;
  font-size: 1.5rem;
  line-height: normal;
  font-weight: 700;
}
p {
  margin-top: var(--spacing-secondary);
  margin-bottom: 0;
  font-size: 1.25rem;
  line-height: normal;
}
.number-text {
  position: absolute;
  left: -45px;
  top: -25px;
  right: auto;
  bottom: auto;
  color: var(--secondary-color);
  font-size: 70px;
  line-height: 80px;
  font-weight: 900;
}
.number-text.number-text--secondary {
  color: var(--color-white);
  opacity: 0.1;
}
@media only screen and (max-width: 991px) {
  :root {
    --spacing: 2rem;
  }
  h1, h2 {
    font-size: 7vw;
  }
  h3 {
    font-size: 5vw;
  }
  p {
    font-size: 1rem;
  }
  .number-text {
    left: -25px;
    top: -27px;
    font-size: 50px;
  }
}
h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 500;
}
a {
  background-color: transparent;
  transition: var(--global-transition);
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}
img {
  border: 0;
  vertical-align: middle;
  display: inline-block;
  max-width: 100%;
}
li,
ul {
  margin: 0;
  padding-left: 0;
}
li {
  list-style: none;
}
ul {
  list-style: none;
}
form {
  margin: 0;
}
footer {
  margin-top: auto;
}
.underscore {
  border-bottom: 10px solid var(--primary-color);
}
.underscore.underscore--secondary {
  border-bottom-width: 5px;
}
.spacer-helper {
  margin-top: var(--spacing-secondary);
}
.grid {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-row-gap: var(--spacing);
  grid-column-gap: var(--spacing);
}
.grid.grid-small {
  grid-row-gap: calc(var(--spacing) / 1.25);
  grid-column-gap: calc(var(--spacing) / 1.25);
}
@media only screen and (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.p--secondary {
  opacity: 0.8;
}
.p--small {
  margin-top: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
}
.mt-0 {
  margin-top: 0;
}
.mr-5 {
  margin-right: 0.5rem;
}
.mr-1 {
  margin-right: 1rem;
}
.ml-5 {
  margin-left: 0.5rem;
}
.red {
  color: red;
}
.pointer {
  cursor: pointer;
}
.modal-open {
  overflow: hidden;
}
.relative {
  position: relative;
}
.form--error {
  font-size: 0.75rem;
  color: var(--error-color);
  font-weight: 500;
  margin-left: 12px;
  margin-top: 5px;
}
.success-message {
  padding: 15px 20px;
  border-radius: 10px;
  background-color: var(--secondary-color);
}
nav.dd-list a.router-link-active {
  background-color: var(--input-bg-color);
}
</style>
