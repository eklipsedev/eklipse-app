<template>
  <auth-container>
    <div class="auth--content">
      <router-link to="/" class="auth--logo"
        ><base-logo mode="dark" width="120"></base-logo
      ></router-link>
      <h1 class="auth--heading">Welcome back!</h1>
      <div class="auth--form-body">
        <div class="auth--form-wrapper">
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
            <div class="form-row">
              <base-input
                :type="password.hidden ? 'password' : 'text'"
                name="loginPassword"
                class="has-icon"
                placeholder="Password"
                id="loginPassword"
                v-model="password.val"
                @blur="clearValidity('password')"
              ></base-input>
              <form-icon
                src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/60640bb0f507cb4fe0227072_lock.svg"
                alt="password"
              ></form-icon>
              <form-icon
                @click="togglePassword()"
                :src="
                  password.hidden
                    ? 'https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/612d77cf9e12501c6d53b368_visibility.svg'
                    : 'https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/612d77238052f4c794a8642f_invisible.svg'
                "
                alt="toggle password"
                password="true"
              ></form-icon>
              <div v-if="!password.isValid" class="auth--error">
                Password is invalid
              </div>
              <div
                v-if="loginError.code === 'auth/wrong-password'"
                class="auth--error"
              >
                {{ loginError.message }}
              </div>
            </div>
            <base-button
              v-if="!isAuthLoading"
              type="submit"
              class="button--full"
              >Login</base-button
            >
            <base-button v-else type="button" class="button--full" disabled
              >Logging in...<base-spinner size="0.2"></base-spinner
            ></base-button>
            <div
              v-if="loginError.code === 'auth/too-many-requests'"
              class="auth--error"
            >
              {{ loginError.message }}
            </div>
          </base-form>
        </div>
        <router-link to="/reset-password" class="auth--lower-link"
          >Forgot Password?</router-link
        >
      </div>
      <div class="login__actions">
        <div>
          <div>
            Interested in working with us?<br />
            <router-link to="/contact">Reach out →</router-link>
          </div>
        </div>
      </div>
    </div>
  </auth-container>
</template>

<script>
import AuthContainer from "../../../components/layouts/containers/AuthContainer.vue";
import FormIcon from "../../../components/UI/elements/FormIcon.vue";

export default {
  components: {
    AuthContainer,
    FormIcon,
  },
  data() {
    return {
      signingIn: false,
      email: {
        val: "",
        isValid: true,
      },
      password: {
        val: "",
        hidden: true,
        isValid: true,
      },
      isFormValid: true,
    };
  },
  computed: {
    isAuthLoading() {
      return this.$store.getters.isAuthLoading;
    },
    loginError() {
      return this.$store.getters.loginError;
    },
  },
  methods: {
    togglePassword() {
      this.password.hidden = !this.password.hidden;
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      console.log(this.email.val);
      if (!this.email.val.includes("@")) {
        this.email.isValid = false;
        this.isFormValid = false;
      }
      if (!this.password.val.length) {
        this.password.isValid = false;
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

      // send http request to login user
      this.$store.dispatch("login", {
        email: this.email.val,
        password: this.password.val,
      });
    },
  },
};
</script>
