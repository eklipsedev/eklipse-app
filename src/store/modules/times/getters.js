export default {
  getTimes(state) {
    return state.times;
  },
  getTimesLoading(state) {
    return state.timesLoading;
  },
  getTotalHours(state) {
    return state.totalHours;
  },
  getInvoiceIsSending(state) {
    return state.invoiceIsSending;
  }
};
