import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      times: [],
      activeTime: [],
      totalHours: "0",
      timesLoading: true,
      invoiceIsSending: false,
      timesToFetch: true,
    };
  },
  mutations,
  actions,
  getters,
};
