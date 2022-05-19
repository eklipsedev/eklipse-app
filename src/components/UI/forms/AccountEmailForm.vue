<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-row">
      <base-input
        type="email"
        name="EMAIL_EMAIL"
        placeholder="Current Email"
        id="EMAIL_EMAIL"
        :value="getUserEmail"
        disabled
      ></base-input>
    </div>
    <div class="form-row">
      <base-input
        type="email"
        name="EMAIL_NEW_EMAIL"
        placeholder="New Email"
        id="EMAIL_NEW_EMAIL"
        :value="newEmail.val"
        v-model.trim="newEmail.val"
        @blur="clearValidity('newEmail')"
      ></base-input>
      <base-form-error
        v-if="!newEmail.isValid"
        errorMessage="New email is required"
      ></base-form-error>
    </div>
    <div class="form-row">
      <base-input
        type="password"
        name="EMAIL_CONFIRM_PASSWORD"
        placeholder="Confirm Password"
        id="EMAIL_CONFIRM_PASSWORD"
        :value="confirmPassword.val"
        v-model.trim="confirmPassword.val"
        @blur="clearValidity('confirmPassword')"
      ></base-input>
      <base-form-error
        v-if="!confirmPassword.isValid"
        errorMessage="Password confirmation is required"
      ></base-form-error>
    </div>
    <base-button v-if="!isSending" type="submit"
      >Update</base-button
    >
    <base-button v-if="isSending" type="button" class="button--mr-auto" disabled
      >Updating...<base-spinner size="0.2"></base-spinner
    ></base-button>
    <div v-if="error" class="form--error">
      {{ error }}
    </div>
    <div v-if="isSent" class="success-message">
      Updated!
    </div>
  </base-form>
</template>

<script>
import { auth, provider } from "../../../../db.js";

export default {
  data() {
    return {
      newEmail: {
        val: "",
        isValid: true,
      },
      confirmPassword: {
        val: "",
        isValid: true,
      },
      isFormValid: true,
      isSending: false,
      isSent: false,
      updateEmailError: "",
      reauthenticateError: "",
    };
  },
  computed: {
    getUserEmail() {
      return this.$store.getters.getUserEmail;
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      if (!this.newEmail.val.length > 0) {
        this.newEmail.isValid = false;
        this.isFormValid = false;
      }
      if (!this.confirmPassword.val.length > 0) {
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

      this.isSending = true;

      const user = auth.currentUser;
      const credential = provider.EmailAuthProvider.credential(
        user.email,
        this.confirmPassword.val
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          this.reauthenticateError = "";
          user
            .updateEmail(this.newEmail.val)
            .then(() => {
              console.log("successfully updated email!");
              this.updateEmailError = "";
              this.isSending = false;
              this.isSent = true;
            })
            .catch((error) => {
              console.log(error);
              this.isSending = false;
              this.isSent = false;
              this.updateEmailError = error;
            });
        })
        .catch((error) => {
          console.log(error);
          this.reauthenticateError = error;
          this.isSending = false;
          this.isSent = false;
        });
    },
  },
};
</script>
