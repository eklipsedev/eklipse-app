import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      qbUser: [],
      qbBankAccounts: [],
      qbInvoices: [],
      bankAccountsLoading: true,
      bankAccountsIsSending: false,
      invoicesLoading: true,
      activePaymentMethod: [],
    };
  },
  mutations,
  actions,
  getters,
};
