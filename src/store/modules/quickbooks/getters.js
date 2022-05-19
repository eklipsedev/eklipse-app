export default {
  getQbUser(state) {
    return state.qbUser;
  },
  getQbUserId(state) {
    return state.qbUser.Id;
  },
  getInvoicesLoading(state) {
    return state.invoicesLoading;
  },
  getQbInvoices(state) {
    console.log(state.qbInvoices)
    return state.qbInvoices;
  },
  getBankAccountsLoading(state) {
    return state.bankAccountsLoading;
  },
  getBankAccountsIsSending(state) {
    return state.bankAccountsIsSending;
  },
  getQbBankAccounts(state) {
    return state.qbBankAccounts;
  },
};
