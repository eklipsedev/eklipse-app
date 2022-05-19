<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-row form-row__2-col">
      <div class="form-cell">
        <base-input
          type="text"
          name="FIRSTNAME"
          placeholder="First Name"
          id="FIRSTNAME"
          :value="getUserFirstName"
          v-model.trim="getUserFirstName"
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
          :value="getUserLastName"
          v-model.trim="getUserLastName"
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
        type="phone"
        name="PHONE"
        placeholder="Phone"
        id="PHONE"
        :value="getUserPhone"
        v-model.trim="getUserPhone"
        @blur="clearValidity('phone')"
      ></base-input>
      <base-form-error
        v-if="!phone.isValid"
        errorMessage="Phone is required"
      ></base-form-error>
    </div>
    <div class="form-row">
      <base-input
        type="text"
        name="COMPANY"
        placeholder="Company"
        id="COMPANY"
        :value="getCompanyName"
        v-model.trim="getCompanyName"
        @blur="clearValidity('company')"
        :disabled="getUserPermission === 'Non-Admin' ? 'disabled' : null"
      ></base-input>
      <base-form-error
        v-if="!company.isValid"
        errorMessage="Company is required"
      ></base-form-error>
    </div>
    <div class="form-row">
      <base-input
        type="text"
        name="ROLE"
        placeholder="Role"
        id="ROLE"
        :value="getUserPermission"
        v-model.trim="getUserPermission"
        @blur="clearValidity('permissions')"
        disabled
      ></base-input>
      <base-form-error
        v-if="!permissions.isValid"
        errorMessage="Role is required"
      ></base-form-error>
    </div>
    <base-button v-if="!isSending" type="submit">Update</base-button>
    <base-button v-if="isSending" type="button" class="button--mr-auto" disabled
      >Updating...<base-spinner size="0.2"></base-spinner
    ></base-button>
    <div v-if="error" class="form--error">
      {{ error }}
    </div>
    <teleport to="body">
      <base-snackbar
        v-if="isSent"
        title="Updated successfully!"
        :success="isSent"
      ></base-snackbar>
    </teleport>
  </base-form>
</template>

<script>
import { app } from "../../../../db.js";

export default {
  computed: {
    getUserFirstName: {
      get() {
        return this.$store.getters.getUserFirstName;
      },
      set(value) {
        this.$store.commit("updateUserFirstName", value);
      },
    },
    getUserLastName: {
      get() {
        return this.$store.getters.getUserLastName;
      },
      set(value) {
        this.$store.commit("updateUserLastName", value);
      },
    },
    getUserPhone: {
      get() {
        return this.$store.getters.getUserPhone;
      },
      set(value) {
        this.$store.commit("updateUserPhone", value);
      },
    },
    getCompanyName: {
      get() {
        return this.$store.getters.getCompanyName;
      },
      set(value) {
        this.$store.commit("updateCompanyName", value);
      },
    },
    getUserPermission: {
      get() {
        return this.$store.getters.getUserPermission;
      },
      set(value) {
        this.$store.commit("updateUserPermission", value);
      },
    },
  },
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
      phone: {
        val: "",
        isValid: true,
      },
      company: {
        val: "",
        isValid: true,
      },
      permissions: {
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
    setValue(prop, val) {
      return prop ? prop : val;
    },
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
      if (!this.phone.val.length > 0) {
        this.phone.isValid = false;
        this.isFormValid = false;
      }
      if (!this.company.val.length > 0) {
        this.company.isValid = false;
        this.isFormValid = false;
      }
      if (!this.permissions.val.length > 0) {
        this.permissions.isValid = false;
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

      const userPayload = {
        displayName: this.firstName.val + " " + this.lastName.val,
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        phone: this.phone.val,
      };
      const companyPayload = {
        company: {
          name: this.company.val,
          id: this.userCompanyId,
        },
      };

      // update user in database
      app.users
        .updateInDB({
          uid: this.userId,
          data: userPayload,
        })
        .then((result) => {
          console.log("updated successfully!", result);
          this.isSending = false;
          this.isSent = true;
          const userInfo = localStorage.getItem("userInfo");
          const parsedUserInfo = JSON.parse(userInfo);
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...parsedUserInfo,
              ...userPayload,
              ...companyPayload,
            })
          );
        })
        .catch((error) => {
          console.log("an error occured.", error);
          this.isSending = false;
        });

      // update company name
      app.content
        .update({
          schemaKey: "companies",
          entryId: this.userCompanyId,
          data: {
            name: this.company.val,
          },
        })
        .then((result) => {
          console.log("updated company!", result);
        })
        .catch((error) => {
          console.log("error updating company:", error);
        });
    },
  },
};
</script>
