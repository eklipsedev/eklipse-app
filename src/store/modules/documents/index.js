import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      documents: [],
      activeDocument: [],
      documentsLoading: true,
      documentIsSending: false,
      documentsToFetch: true,
    };
  },
  mutations,
  actions,
  getters,
};