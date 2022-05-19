<template>
  <base-section>
    <base-container class="container--vertical">
      <base-form @submit.prevent="submitForm">
        <div class="form-row form-row__2-col">
          <div class="form-cell">
            <base-input
              type="text"
              name="FIRSTNAME"
              placeholder="First Name"
              id="FIRSTNAME"
              required
              :value="firstName.val"
              v-model.trim="firstName.val"
              @blur="clearValidity('firstName')"
            ></base-input>
            <base-form-error
              v-if="!firstName.isValid"
              errorMessage="First name is required"
            ></base-form-error>
          </div>
          <div class="form-cell">
            <base-input
              type="text"
              name="LASTNAME"
              placeholder="Last Name"
              id="LASTNAME"
              required
              :value="lastName.val"
              v-model.trim="lastName.val"
              @blur="clearValidity('lastName')"
            ></base-input>
            <base-form-error
              v-if="!lastName.isValid"
              errorMessage="Last name is required"
            ></base-form-error>
          </div>
        </div>
        <div class="form-row">
          <base-input
            type="email"
            name="EMAIL"
            placeholder="Email"
            id="EMAIL"
            required
            :value="email.val"
            v-model.trim="email.val"
            @blur="clearValidity('email')"
          ></base-input>
          <base-form-error
            v-if="!email.isValid"
            errorMessage="A valid email is required"
          ></base-form-error>
        </div>
        <div class="form-row">
          <base-text-area
            name="MESSAGE"
            placeholder="What can we help you with?"
            id="MESSAGE"
            required
            :value="message.val"
            v-model.trim="message.val"
            @blur="clearValidity('message')"
          ></base-text-area>
          <base-form-error
            v-if="!message.isValid"
            errorMessage="A message is required"
          ></base-form-error>
        </div>
        <div class="form-row">
          <base-input
            type="text"
            name="LINK"
            placeholder="G-Suite Link (Docs, Sheets &amp; Slides)"
            id="LINK"
            link
            :value="link.val"
            v-model.trim="link.val"
            @blur="clearValidity('link')"
          ></base-input>
          <base-form-error
            v-if="!link.isValid"
            errorMessage="Link is invalid"
          ></base-form-error>
        </div>
        <base-button v-if="!isSending" type="submit">Send Message</base-button>
        <base-button
          v-if="isSending"
          type="button"
          class="button--mr-auto"
          disabled
          >Sending...<base-spinner size="0.2"></base-spinner
        ></base-button>
        <div v-if="error" class="form--error">
          {{ error }}
        </div>
        <div v-if="isSent" class="success-message">
          Your message has been sent!
        </div>
      </base-form></base-container
    >
  </base-section>
</template>

<script>
import { functions } from "../../../../db.js";

export default {
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      email: {
        val: "",
        isValid: true,
      },
      message: {
        val: "",
        isValid: true,
      },
      link: {
        val: "",
        isValid: true,
      },
      isFormValid: true,
      isSending: false,
      isSent: false,
      error: "",
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      if (!this.firstName.val.length > 0) {
        this.firstName.isValid = false;
        this.isFormValid = false;
      }
      if (!this.lastName.val.length > 0) {
        this.lastName.isValid = false;
        this.isFormValid = false;
      }
      if (!this.email.val.includes("@")) {
        this.email.isValid = false;
        this.isFormValid = false;
      }
      if (!this.message.val.length > 0) {
        this.message.isValid = false;
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

      // submit form data to MailChimp
      const sendMessage = functions.httpsCallable("sendMessage");

      this.isSending = true;

      sendMessage({
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        email: this.email.val,
        message: this.message.val,
      })
        .then(() => {
          this.isSending = false;
          this.isSent = true;

          this.firstName.val = "";
          this.lastName.val = "";
          this.email.val = "";
          this.message.val = "";
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.isSending = false;
        });
    },
  },
};
</script>
