<template>
  <auth-container>
    <div class="auth--content">
      <h1 class="auth--heading">Let's get that password.</h1>
      <div class="auth--form-body">
        <div v-if="!emailSent" class="auth--form-wrapper">
          <base-form @submit.prevent="submitForm">
            <div class="form-row">
              <base-input
                type="email"
                name="loginEmail"
                class="has-icon"
                placeholder="Email"
                id="loginEmail"
                v-model="email.val"
                @blur="clearValidity('email')"
              ></base-input>
              <form-icon
                src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/60640bb0f507cb5d21227073_mail.svg"
                alt="email"
              ></form-icon>
              <div v-if="!email.isValid" class="auth--error">
                Email is invalid
              </div>
            </div>
            <base-button v-if="!emailSending" type="submit" class="button--full"
              >Send Reset Link</base-button
            >
            <base-button
              v-if="emailSending"
              type="button"
              class="button--full"
              disabled
              >Sending Email...<base-spinner size="0.2"></base-spinner
            ></base-button>
          </base-form>
        </div>
        <router-link v-if="!emailSent" to="/login" class="auth--lower-link"
          >← Back to login</router-link
        >
        <div v-if="emailSent" class="auth--success">
          Email sent! Please check your inbox.
        </div>
      </div>
    </div>
  </auth-container>
</template>

<script>
import { auth } from "../../../../db.js";

import AuthContainer from "../../../components/layouts/containers/AuthContainer.vue";
import FormIcon from "../../../components/UI/elements/FormIcon.vue";

export default {
  components: {
    AuthContainer,
    FormIcon,
  },
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      emailSending: false,
      emailSent: false,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateEmail() {
      if (!this.email.val.includes("@")) {
        this.email.isValid = false;
      }
    },
    submitForm() {
      this.validateEmail();

      if (!this.email.isValid) {
        return;
      }

      this.email.isValid = true;
      this.emailSending = true;

      auth
        .sendPasswordResetEmail(this.email.val)
        .then(() => {
          this.emailSent = true;
        })
        .catch(() => {
          this.emailSent = false;
          this.emailSending = false;
        });
    },
  },
};
</script>
