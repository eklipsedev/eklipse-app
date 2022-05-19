<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-row">
      <base-input
        type="text"
        name="ACCOUNT_HOLDER_NAME"
        placeholder="Name of account holder"
        id="ACCOUNT_HOLDER_NAME"
        v-model.trim="accountHolderName.val"
        @blur="clearValidity('accountHolderName')"
      ></base-input>
      <base-form-error
        v-if="!accountHolderName.isValid"
        errorMessage="Account holder name is required"
      ></base-form-error>
    </div>
    <div class="form-row form-row__2-col">
      <div class="form-cell">
        <base-select
          fieldName="Account Type"
          default="Business Checking"
          :options="accountTypes"
          @selected-option="setSelectedAccountType($event)"
        ></base-select>
        <base-form-error
          v-if="!accountType.isValid"
          errorMessage="Account type is required"
        ></base-form-error>
      </div>
      <div class="form-cell">
        <base-input
          type="text"
          name="PHONE"
          placeholder="Phone"
          id="PHONE"
          v-model.trim="phone.val"
          @blur="clearValidity('phone')"
        ></base-input>
        <base-form-error
          v-if="!phone.isValid"
          errorMessage="Phone is required"
        ></base-form-error>
      </div>
    </div>
    <div class="form-row form-row__2-col">
      <div class="form-cell">
        <base-input
          type="text"
          name="ROUTING_NUMBER"
          placeholder="Routing number"
          id="ROUTING_NUMBER"
          v-model.trim="routingNumber.val"
          @blur="clearValidity('routingNumber')"
        ></base-input>
        <base-form-error
          v-if="!routingNumber.isValid"
          errorMessage="Routing number is required"
        ></base-form-error>
      </div>
      <div class="form-cell">
        <base-input
          type="text"
          name="ACCOUNT_NUMBER"
          placeholder="Account number"
          id="ACCOUNT_NUMBER"
          v-model.trim="accountNumber.val"
          @blur="clearValidity('accountNumber')"
        ></base-input>
        <base-form-error
          v-if="!accountNumber.isValid"
          errorMessage="Account number is required"
        ></base-form-error>
      </div>
    </div>
    <div class="form-row last">
      <base-checkbox
        title="Make default payment method"
        v-model="defaultPayment.checked"
        @change="defaultPayment.checked = !defaultPayment.checked"
      ></base-checkbox>
    </div>
    <div class="ticket--divider"></div>
    <base-button v-if="!getBankAccountIsSending" type="submit"
      >Add Account</base-button
    >
    <base-button
      v-if="getBankAccountIsSending"
      type="button"
      class="button--mr-auto"
      disabled
      >Adding...<base-spinner size="0.2"></base-spinner
    ></base-button>
    <div v-if="error" class="form--error">
      {{ error }}
    </div>
  </base-form>
</template>

<script>
export default {
  data() {
    return {
      accountHolderName: {
        val: "",
        isValid: true,
      },
      accountType: {
        val: "",
        isValid: true,
      },
      phone: {
        val: "",
        isValid: true,
      },
      routingNumber: {
        val: "",
        isValid: true,
      },
      accountNumber: {
        val: "",
        isValid: true,
      },
      defaultPayment: {
        checked: false,
      },
      isFormValid: true,
      error: "",
      accountTypes: [
        "Personal Checking",
        "Personal Savings",
        "Business Checking",
        "Business Savings",
      ],
    };
  },
  computed: {
    getBankAccountIsSending() {
      return this.$store.getters.getBankAccountIsSending;
    },
    getAccountType: {
      get() {
        return this.$store.getters.getAccountType;
      },
      set(value) {
        this.$store.commit("updateAccountType", value);
      },
    },
  },
  methods: {
    setSelectedAccountType(selectedAccountType) {
      this.getAccountType = selectedAccountType;
      this.clearValidity("accountType");
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const numRegex = /^[0-9]+$/;

      if (!this.accountHolderName.val.length > 0) {
        this.accountHolderName.isValid = false;
        this.isFormValid = false;
      }
      if (!this.accountType.val.length > 0) {
        this.accountType.isValid = false;
        this.isFormValid = false;
      }
      if (!this.phone.val.match(phoneRegex)) {
        this.phone.isValid = false;
        this.isFormValid = false;
      }
      if (!this.routingNumber.val.match(numRegex)) {
        this.routingNumber.isValid = false;
        this.isFormValid = false;
      }
      if (!this.accountNumber.val.match(numRegex)) {
        this.accountNumber.isValid = false;
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

      this.$store.dispatch("addQbBankAccount", {
        phone: this.phone.val,
        routingNumber: this.routingNumber.val,
        name: this.accountHolderName.val,
        accountType: this.accountType.val,
        accountNumber: this.accountNumber.val,
      });
    },
  },
};
</script>

<style scoped>
.ticket--divider {
  height: 1px;
  margin: 1.5rem 0;
  border-top: 2px dashed var(--input-bg-color);
}
</style>
