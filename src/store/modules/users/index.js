import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      users: [],
      activeUser: [],
      userIsSending: false,
      usersLoading: false,
      usersToFetch: true,
    };
  },
  mutations,
  actions,
  getters,
};