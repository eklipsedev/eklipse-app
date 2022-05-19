<template>
  <div>
    <hero-secondary
      ><heading-to-move
        level="1"
        text="Billing &amp; Invoicing"
      ></heading-to-move
    ></hero-secondary>
    <base-section>
      <base-container class="container--vertical container--margin-bottom">
        <base-button
          @click="
            launchPopup(
              'https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/authUri'
            )
          "
          type="button"
          class="button"
          style="margin-right:auto;margin-bottom: 0.5rem"
          >Set Token</base-button
        >
        <base-button
          @click="
            launchPopup(
              'https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/refreshAccessToken'
            )
          "
          type="button"
          class="button"
          style="margin-right:auto;margin-bottom: 0.5rem"
          >Refresh Token</base-button
        >
        <base-button
          @click="
            launchPopup(
              'https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/revokeAccessToken'
            )
          "
          type="button"
          class="button"
          style="margin-right:auto;margin-bottom: 0.5rem"
          >Revoke Token</base-button
        >
      </base-container>
      <base-container class="container--vertical container--margin-bottom">
        <base-heading>Payment Methods</base-heading>
        <div class="form-row">
          <div
            class="account"
            v-for="(bankAccount, index) in getQbBankAccounts"
            :key="index"
          >
            <font-awesome-icon
              :icon="['fad', 'university']"
              class="fa-2x mr-1"
            ></font-awesome-icon>
            <div class="account--content">
              <div class="account--active">
                Bank Account ending in
                <strong>{{
                  bankAccount.accountNumber.substring(
                    bankAccount.accountNumber.length - 4
                  )
                }}</strong>
              </div>
              <div>{{ bankAccount.name }}</div>
              <div class="account--type">
                <b>{{ bankAccount.accountType }}</b>
              </div>
            </div>
            <font-awesome-icon
              :icon="['fas', 'trash']"
              class="fa-md icon-link"
              @click="
                setModal('Delete', index)
                //setAccountId(bankAccount.id);
              "
            ></font-awesome-icon>
          </div>
          <teleport to="body">
            <base-backdrop></base-backdrop>
            <base-modal>
              <base-heading
                subText="We use Quickbooks behind the scenes, so your sensitive data
                    is safe with us."
                >{{ modalType === "Add" ? "Add" : "Delete" }} Bank
                Account</base-heading
              >
              <div v-if="modalType === 'Delete'">
                <p>
                  Are you sure you want to delete account
                  <b>{{ bankAccount.accountNumber }}</b
                  >? This action can't be undone.
                </p>
                <div class="button--actions">
                  <base-button
                    v-if="!isSending"
                    @click="deleteAccount()"
                    type="submit"
                    class="button"
                    >Delete Account</base-button
                  >
                  <base-button
                    v-if="isSending"
                    type="button"
                    class="button"
                    disabled
                    >Deleting...<base-spinner size="0.2"></base-spinner
                  ></base-button>
                </div>
              </div>
              <bank-account-form
                v-if="modalTypeCheck('Add') || modalTypeCheck('Edit')"
                :modalType="setModalVerbiage()"
              ></bank-account-form
            ></base-modal>
          </teleport>
          <p class="mt-0" v-if="!getQbBankAccounts.length">
            No bank accounts are connected.
          </p>
        </div>
        <base-button
          type="button"
          class="button"
          style="margin-right:auto;margin-bottom: 0.5rem"
          @click="setModal('Add', index)"
          >{{
            !getQbBankAccounts.length ? "Add" : "Replace"
          }}
          Account</base-button
        >
      </base-container>
      <base-container class="container--vertical">
        <div class="ticket--header">
          <h2 class="ticket--heading">
            <span class="underscore underscore--secondary">Invoices</span>
          </h2>
        </div>
        <list-header>
          <list-cell class="long">Invoice ID</list-cell>
          <list-cell>Created</list-cell>
          <list-cell>Due</list-cell>
          <list-cell>Total</list-cell>
          <list-cell>Status</list-cell>
          <list-cell class="last"></list-cell>
        </list-header>
        <base-list>
          <list-transition
            ><list-row v-for="(invoice, index) in getQbInvoices" :key="index">
              <list-cell class="long">{{ `Invoice #${index + 1}` }}</list-cell>
              <list-cell>{{ getDate(invoice.TxnDate) }}</list-cell>
              <list-cell>{{ getDate(invoice.DueDate) }}</list-cell>
              <list-cell>{{ "$" + invoice.TotalAmt.toFixed(2) }}</list-cell>
              <list-cell
                :class="
                  !invoice.Balance === invoice.TotalAmt ? 'paid' : 'pending'
                "
                >{{
                  !invoice.Balance === invoice.TotalAmt ? "Paid" : "Pending"
                }}</list-cell
              >
              <list-cell
                ><base-button
                  class="button--nav"
                  @click="openPDF(invoice.pdf.data.body)"
                  >View
                  <font-awesome-icon
                    :icon="['fad', 'external-link']"
                    class="fa-md ml-5 pointer"
                  ></font-awesome-icon> </base-button
              ></list-cell>
            </list-row>
          </list-transition>
        </base-list>
        <div v-if="getInvoicesLoading" class="loading-block">
          <base-spinner class="lds-roller secondary"></base-spinner>
        </div>
        <base-empty-state
          v-if="getQbInvoices.length === 0 && !getInvoicesLoading"
        >
          <span>No invoices to be shown.</span>
        </base-empty-state>
      </base-container>
    </base-section>
  </div>
</template>

<script>
import BankAccountForm from "../../../../components/UI/forms/BankAccountForm.vue";
import ModalTypeCheck from "../ModalTypeCheck";
import SetModalType from "../SetModalType";
import SetModalVerbiage from "../SetModalVerbiage";

export default {
  data() {
    return {
      modalType: "",
      accountId: "",
    };
  },
  mixins: [ModalTypeCheck, SetModalType, SetModalVerbiage],
  components: {
    BankAccountForm,
  },
  computed: {
    getQbBankAccounts() {
      return this.$store.getters.getQbBankAccounts;
    },
    getQbInvoices() {
      return this.$store.getters.getQbInvoices;
    },
    getUserEmail() {
      return this.$store.getters.email;
    },
    getQbUserId() {
      return this.$store.getters.getQbUserId;
    },
    getInvoicesLoading() {
      return this.$store.getters.getInvoicesLoading;
    },
  },
  methods: {
    openPDF(pdf) {
      const blob = new Blob([pdf]);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    },
    base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64); // Comment this if not using base64
      const bytes = new Uint8Array(binaryString.length);
      return bytes.map((byte, i) => binaryString.charCodeAt(i));
    },
    getDate(date) {
      const theDate = new Date(date);
      const theDateDay = theDate.getDate();
      const theDateMonth = theDate.getMonth() + 1;
      const theDateYear = theDate
        .getFullYear()
        .toString()
        .slice(2);
      return `${theDateMonth}/${theDateDay}/${theDateYear}`;
    },
    launchPopup(path) {
      var parameters = "location=1,width=800,height=650";
      parameters +=
        ",left=" +
        (screen.width - 800) / 2 +
        ",top=" +
        (screen.height - 650) / 2;
      // Launch Popup
      window.open(path, "connectPopup", parameters);
    },
    setModal(type, index) {
      this.$store.dispatch("toggleModal");
      this.setModalType(type);
      if (this.modalType === "Add") {
        this.$store.commit("setActivePaymentMethod", [{}]);
      } else {
        this.$store.commit("setActivePaymentMethod", [
          { ...this.$store.getters.getPaymentMethod(index), idx: index },
        ]);
      }
    },
    setAccountId(accountId) {
      this.accountId = accountId;
    },
    deleteAccount() {
      this.$store.dispatch("deleteQbBankAccount", {
        accountId: this.accountId,
        customerId: this.getQuickbooksCustomerId,
      });
    },
    setData() {
      this.$store.dispatch("setQbUser").then(() => {
        this.$store.dispatch("setQbInvoices");
        this.$store.dispatch("setQbBankAccounts");
      });
    },
  },
  created() {
    this.setData();
  },
};
</script>

<style scoped>
.ticket--heading {
  font-size: 30px;
  line-height: 40px;
}
.ticket--header {
  margin-bottom: 2rem;
}
.flex {
  display: flex;
  align-items: center;
}
.mt-0 {
  margin-top: 0;
}
.ml-1 {
  margin-left: 1rem;
}
.mr-1 {
  margin-right: 1rem;
}
.icon-link {
  transition: var(--global-transition);
  cursor: pointer;
}
.icon-link:hover {
  color: var(--primary-color);
}
.form-row {
  margin-bottom: 2rem;
}
.account {
  display: flex;
  padding: 1.5rem 2rem;
  align-items: flex-start;
  border: 3px solid var(--primary-color);
  border-radius: 10px;
  background-color: var(--secondary-color);
}
.account--content {
  flex: 1;
}
.account--active {
  font-size: 1.25rem;
}
.button--actions {
  margin-top: 2rem;
}
.loading-block {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}
</style>
