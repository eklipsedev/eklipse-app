export default {
  setQbUser(state, payload) {
    state.qbUser = payload;
  },
  setQbBankAccounts(state, payload) {
    state.qbBankAccounts = payload;
  },
  setQbInvoices(state, payload) {
    state.qbInvoices = payload;
  },
  setBankAccountsLoading(state, payload) {
    state.bankAccountsLoading = payload;
  },
  setInvoicesLoading(state, payload) {
    state.invoicesLoading = payload;
  },
  setActivePaymentMethod(state, payload) {
    state.activePaymentMethod = payload;
  },
  updateAccountType(state, payload) {
    state.activePaymentMethod[0].accountType = payload;
  }
};
