<template>
  <auth-container>
    <div class="auth--content">
      <h1 class="auth--heading">Make it a good one!</h1>
      <div class="auth--form-body">
        <div class="auth--form-wrapper">
          <base-form @submit.prevent="submitForm">
            <div class="form-row">
              <base-input
                :type="password.hidden ? 'password' : 'text'"
                class="has-icon"
                name="password"
                placeholder="New Password"
                id="password"
                v-model="password.val"
                @blur="clearValidity('password')"
              ></base-input>
              <form-icon
                src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/60640bb0f507cb4fe0227072_lock.svg"
                alt="new password"
              ></form-icon>
              <form-icon
                @click="togglePassword('password')"
                :src="
                  password.hidden
                    ? 'https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/612d77cf9e12501c6d53b368_visibility.svg'
                    : 'https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/612d77238052f4c794a8642f_invisible.svg'
                "
                alt="toggle password"
                password="true"
              ></form-icon>
              <div v-if="!password.isValid" class="auth--error">
                Password must be at least 6 characters
              </div>
            </div>
            <div class="form-row">
              <base-input
                :type="confirmPassword.hidden ? 'password' : 'text'"
                class="has-icon"
                name="confirmPassword"
                placeholder="Confirm Password"
                id="confirmPassword"
                v-model="confirmPassword.val"
                @blur="clearValidity('confirmPassword')"
              ></base-input>
              <form-icon
                src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/60640bb0f507cb4fe0227072_lock.svg"
                alt="confirm password"
              ></form-icon>
              <form-icon
                @click="togglePassword('confirmPassword')"
                :src="
                  confirmPassword.hidden
                    ? 'https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/612d77cf9e12501c6d53b368_visibility.svg'
                    : 'https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/612d77238052f4c794a8642f_invisible.svg'
                "
                alt="toggle password"
                password="true"
              ></form-icon>
              <div
                v-if="password.val !== confirmPassword.val"
                class="auth--error"
              >
                Password's don't match
              </div>
            </div>
            <base-button v-if="!isLoading" type="submit" class="button--full"
              >Save &amp; Login</base-button
            >
            <base-button
              v-if="isLoading"
              type="button"
              class="button--full"
              disabled
              >Saving Password...<base-spinner size="0.2"></base-spinner
            ></base-button>
          </base-form>
        </div>
      </div>
    </div>
  </auth-container>
</template>

<script>
import { auth } from "../../../../db.js";
import router from "@/router/index.js";

import AuthContainer from "../../../components/layouts/containers/AuthContainer.vue";
import FormIcon from "../../../components/UI/elements/FormIcon.vue";

export default {
  components: {
    AuthContainer,
    FormIcon,
  },
  data() {
    return {
      password: {
        val: "",
        hidden: true,
        isValid: true,
      },
      confirmPassword: {
        val: "",
        hidden: true,
        isValid: true,
      },
      isFormValid: true,
      isLoading: false,
      error: "",
      code: new URLSearchParams(window.location.search).get("oobCode"),
    };
  },
  methods: {
    togglePassword(input) {
      this[input].hidden = !this[input].hidden;
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      if (this.password.val.length < 6) {
        this.password.isValid = false;
        this.isFormValid = false;
      }
      if (this.confirmPassword.val.length < 6) {
        this.confirmPassword.isValid = false;
        this.isFormValid = false;
      }
      if (this.password.val !== this.confirmPassword.val) {
        this.confirmPassword.isValid = false;
        this.isFormValid = false;
      } else {
        this.isFormValid = true;
      }
    },
    submitForm() {
      this.validateCreds();

      if (!this.isFormValid) {
        return;
      }

      this.isLoading = true;

      // confirm password reset
      auth
        .confirmPasswordReset(this.code, this.password.val)
        .then(() => {
          setTimeout(function() {
            router.replace("/login");
          }, 1000);
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error;
        });
    },
  },
};
</script>
