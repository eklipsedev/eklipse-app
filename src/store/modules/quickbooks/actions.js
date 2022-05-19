import axios from "axios";

export default {
  // get quickbooks user
  setQbUser({ commit, getters }) {
    return new Promise((resolve) => {
      const customerEmail = getters.getUserEmail;
      axios
        .get(
          `https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/getCustomer?query=${customerEmail}`
        )
        .then((customer) => {
          console.log(customer);
          if (customer) {
            const customerInfo = customer.data.QueryResponse.Customer[0];
            console.log(customerInfo);
            commit("setQbUser", customerInfo);
            resolve(customerInfo);
          } else {
            return;
          }
        })
        .catch((error) => {
          this.error = error;
        });
    });
  },

  // get quickbooks invoices
  setQbInvoices({ commit, getters }) {
    return new Promise((resolve) => {
      commit("setInvoicesLoading", true);
      const customerId = getters.getQbUserId;
      axios
        .get(
          `https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/getInvoicesForCustomer?customerId=${customerId}`
        )
        .then((invoices) => {
          if (invoices) {
            const theInvoices = invoices.data.QueryResponse.Invoice;
            const invoicesArray = theInvoices.map(async (invoice) => {
              try {
                const pdf = await axios.get(
                  `https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/getPDFForInvoice?invoiceId=${invoice.Id}`
                );
                return {
                  ...invoice,
                  pdf: pdf,
                };
              } catch (error) {
                return console.error(
                  "Something went wrong while retrieving the pdf URL. Details:",
                  error
                );
              }
            });
            Promise.all(invoicesArray).then((result) => {
              commit("setQbInvoices", result);
              commit("setInvoicesLoading", false);
              resolve(invoices);
            });
          } else {
            commit("setInvoicesLoading", false);
            return;
          }
        })
        .catch((error) => {
          this.error = error;
          commit("setInvoicesLoading", false);
        });
    });
  },

  // get bank accounts
  setQbBankAccounts({ commit, getters }) {
    return new Promise((resolve) => {
      commit("setBankAccountsLoading", true);
      const customerId = getters.getQbUserId;
      axios
        .get(
          `https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/getCustomerBankAccounts?customerId=${customerId}`
        )
        .then((bankAccounts) => {
          console.log(bankAccounts);
          if (bankAccounts) {
            commit("setQbBankAccounts", bankAccounts);
            commit("setBankAccountsLoading", false);
            resolve(bankAccounts);
          } else {
            return;
          }
        })
        .catch((error) => {
          this.error = error;
          commit("setBankAccountsLoading", false);
        });
    });
  },

  // add bank account
  addQbBankAccount({ commit }) {
    return new Promise((resolve) => {
      commit("setBankAccountIsSending", true);
      axios
        .post(
          "https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/createCustomerBankAccount?customerId=5",
          {
            data: {
              phone: this.phone.val,
              routingNumber: this.routingNumber.val,
              name: this.accountHolderName.val,
              accountType: this.accountType.val,
              accountNumber: this.accountNumber.val,
            },
          }
        )
        .then((response) => {
          console.log(response);
          commit("setBankAccountIsSending", false);
          commit("toggleModal");
          resolve(response);
        })
        .catch((error) => {
          this.error = error;
          commit("setBankAccountIsSending", false);
        });
    });
  },

  // delete bank account
  deleteQbBankAccount({ commit, getters }, payload) {
    return new Promise((resolve) => {
      commit("setBankAccountIsSending", true);
      const customerId = getters.getQbUserId;
      axios
        .delete(
          `https://us-central1-eklipse-development.cloudfunctions.net/authenticateWithQuickbooks/deleteCustomerBankAccount?customerId=${customerId}&accountId=${payload.accountId}`
        )
        .then((response) => {
          console.log(response);
          commit("setBankAccountIsSending", false);
          commit("toggleModal");
          resolve(response);
        })
        .catch((error) => {
          this.error = error;
          commit("setBankAccountIsSending", false);
        });
    });
  },
};
