<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-row">
      <base-input
        :type="newPassword.type"
        name="PASSWORD_NEW_PASSWORD"
        placeholder="New Password"
        id="PASSWORD_NEW_PASSWORD"
        class="has-icon"
        v-model.trim="newPassword.val"
        @blur="clearValidity('newPassword')"
      ></base-input>
      <form-icon
        src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/60640bb0f507cb4fe0227072_lock.svg"
        alt="password"
      ></form-icon>
      <form-icon
        @click="toggleInputType('newPassword')"
        src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/61008e8f43c208eb1e628b61_eye%20(4).svg"
        alt="toggle password"
        password="true"
      ></form-icon>
      <base-form-error
        v-if="!newPassword.isValid"
        errorMessage="New Password is required"
      ></base-form-error>
    </div>
    <div class="form-row">
      <base-input
        :type="confirmNewPassword.type"
        name="PASSWORD_CONFIRM_NEW_PASSWORD"
        placeholder="Confirm Password"
        id="PASSWORD_CONFIRM_NEW_PASSWORD"
        class="has-icon"
        v-model.trim="confirmNewPassword.val"
        @blur="clearValidity('confirmNewPassword')"
      ></base-input>
      <form-icon
        src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/60640bb0f507cb4fe0227072_lock.svg"
        alt="password"
      ></form-icon>
      <form-icon
        @click="toggleInputType('confirmNewPassword')"
        src="https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/61008e8f43c208eb1e628b61_eye%20(4).svg"
        alt="toggle password"
        password="true"
      ></form-icon>
      <base-form-error
        v-if="!confirmNewPassword.isValid"
        errorMessage="Passwords must match"
      ></base-form-error>
      <base-form-error
        v-if="updatePasswordError"
        :errorMessage="updatePasswordError.message"
      ></base-form-error>
    </div>
    <base-button v-if="!isSending" type="submit">Update</base-button>
    <base-button v-if="isSending" type="button" class="button--mr-auto" disabled
      >Updating...<base-spinner size="0.2"></base-spinner
    ></base-button>
    <div v-if="isSent" class="success-message">
      Updated!
    </div>
  </base-form>
</template>

<script>
import { auth, provider } from "../../../../db.js";

import FormIcon from "../../../components/UI/elements/FormIcon.vue";

export default {
  components: {
    FormIcon,
  },
  data() {
    return {
      newPassword: {
        val: "",
        isValid: true,
        type: "password",
      },
      confirmNewPassword: {
        val: "",
        isValid: true,
        type: "password",
        isMatching: true,
      },
      isFormValid: true,
      isSending: false,
      isSent: false,
      updatePasswordError: "",
      reauthenticateError: "",
    };
  },
  methods: {
    toggleInputType(input) {
      console.log(this[input].type);
      this[input].type = this[input].type === "password" ? "text" : "password";
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      if (!this.newPassword.val.length > 0) {
        this.newPassword.isValid = false;
        this.isFormValid = false;
      }
      if (!this.confirmNewPassword.val.length > 0) {
        this.confirmNewPassword.isValid = false;
        this.isFormValid = false;
      }
      if (!this.confirmNewPassword.val === this.newPassword.val) {
        this.confirmNewPassword.isMatching = false;
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
        this.currentPassword.val
      );

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          this.reauthenticateError = "";
          user
            .updatePassword(this.confirmNewPassword.val)
            .then(() => {
              console.log("successfully updated password!");
              this.updatePasswordError = "";
              this.isSending = false;
              this.isSent = true;
            })
            .catch((error) => {
              console.log(error);
              this.isSending = false;
              this.isSent = false;
              this.updatePasswordError = error;
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
