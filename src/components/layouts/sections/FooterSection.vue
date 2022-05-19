<template>
  <footer>
    <base-section>
      <base-container class="container--hero">
        <div class="footer--grid">
          <div class="footer--col">
            <router-link to="/" aria-current="page" class="nav--logo"
              ><base-logo></base-logo
            ></router-link>
            <div class="footer--copy">
              Copyright © eklipse Development 2021 &nbsp;| &nbsp;<router-link
                link
                to="/privacy-cookies"
                >Legal</router-link
              >
            </div>
          </div>
          <div class="footer--col footer-col__flex-col">
            <div class="footer--col-half">
              <h4>Agency</h4>
              <base-list>
                <li>
                  <base-button link to="/projects" class="footer--link"
                    >Projects</base-button
                  >
                </li>
                <li>
                  <base-button link to="/services" class="footer--link"
                    >Services</base-button
                  >
                </li>
                <li>
                  <base-button link to="/contact" class="footer--link"
                    >Contact</base-button
                  >
                </li>
              </base-list>
            </div>
            <div class="footer--col-half">
              <h4>App</h4>
              <base-list>
                <li>
                  <base-button link to="/login" class="footer--link"
                    >Login</base-button
                  >
                </li>
              </base-list>
            </div>
          </div>
          <div class="footer--col">
            <div class="footer--form">
              <div class="footer--form-container">
                <newsletter-form></newsletter-form>
              </div>
              <div class="text-block-51">
                Don't worry, we
                <span class="underscore underscore--tiny">never</span> send spam
              </div>
            </div>
          </div>
        </div>
      </base-container>
    </base-section>
  </footer>
</template>

<script>
import NewsletterForm from "../../UI/forms/NewsletterForm.vue";

export default {
  components: {
    NewsletterForm,
  },
  computed: {
    getRootServices() {
      return this.$store.getters.getRootServices;
    },
  },
};
</script>

<style scoped>
.footer--grid {
  display: grid;
  flex: 1;
  grid-auto-columns: 1fr;
  grid-column-gap: 5rem;
  grid-row-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
}
@media only screen and (max-width: 767px) {
  .footer--grid {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
}
.footer--col {
  flex: 0 33.333333333333336%;
}
.footer--col.footer-col__flex-col {
  display: flex;
}
.footer--col-half {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0 50%;
}
.footer--link {
  display: block;
  width: 100%;
  margin-bottom: 5px;
  opacity: 0.5;
  color: var(--color-black);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}
.footer--link:hover {
  opacity: 1;
  color: var(--primary-color);
}
.footer--form-container {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
  font-size: 0.875rem;
}
.input--newsletter {
  padding-top: 8px;
  padding-right: 100px;
  padding-bottom: 8px;
}
.text-block-51 {
  padding-left: 12px;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
}
.underscore--tiny {
  border-bottom-width: 2px;
}
.nav--logo {
  display: flex;
  max-width: 100px;
  justify-content: center;
  align-items: center;
}
.footer--copy {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
</style>
