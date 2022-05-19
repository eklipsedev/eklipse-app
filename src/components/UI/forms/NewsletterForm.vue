<template>
  <base-form
    @submit.prevent="subscribeToNewsletter"
    v-if="!email.isSent"
    class="footer--form"
  >
    <div class="footer--input-wrapper">
      <base-input
        type="email"
        class="input--newsletter"
        name="NEWSLETTER_EMAIL"
        placeholder="Join our newsletter"
        id="NEWSLETTER_EMAIL"
        v-model="email.val"
        @blur="clearValidity('email')"
      ></base-input>
      <base-button
        v-if="!email.isSending"
        type="submit"
        class="footer--form-submit"
        >Join</base-button
      >
      <base-button
        v-if="email.isSending"
        type="button"
        class="footer--form-submit"
        disabled
        ><base-spinner class="m1-0" size="0.2"></base-spinner
      ></base-button>
    </div>
  </base-form>
  <div v-if="email.isSent" class="success-message">
    <div>Thank you for subscribing!</div>
  </div>
  <base-form-error
    v-if="email.failed"
    errorMessage="Oops! Something went wrong. Try again."
  ></base-form-error>
  <base-form-error
    v-if="!email.isValid"
    errorMessage="Email is invalid"
  ></base-form-error>
</template>

<script>
import { functions } from "../../../../db.js";

export default {
  data() {
    return {
      email: {
        val: "",
        isValid: true,
        isSending: false,
        isSent: false,
        failed: false,
      },
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      if (!this.email.val.includes("@")) {
        this.email.isValid = false;
      } else {
        this.email.isValid = true;
      }
    },
    subscribeToNewsletter() {
      this.validateCreds();

      if (!this.email.isValid) {
        return;
      }

      const subscribeToNewsletter = functions.httpsCallable(
        "subscribeToNewsletter"
      );

      this.email.isSending = true;

      subscribeToNewsletter({ email: this.email.val })
        .then(() => {
          this.email.isSending = false;
          this.email.isSent = true;
          this.email.val = "";
        })
        .catch((error) => {
          console.log("error subscribing:", error);
          this.email.failed = true;
          this.email.isSending = false;
        });
    },
  },
};
</script>

<style scoped>
.footer--form {
  flex: 1;
}
.footer--form-label {
  display: none;
  padding-left: 0.75rem;
}
.footer--input-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}
</style>
