export default {
    setTimes(state, payload) {
      state.times = payload.length > 0 ? state.times.concat(payload) : [];
    },
    setTimesLoading(state, payload) {
      state.timesLoading = payload;
    },
    setTotalHours(state, payload) {
        state.totalHours = payload;
    },
    setInvoiceIsSending(state, payload) {
      state.invoiceIsSending = payload;
    },
    setTImesToFetch(state, payload) {
      state.timesToFetch = payload;
    },
    setActiveTime(state, payload) {
      state.activeTime = payload;
    },
  };