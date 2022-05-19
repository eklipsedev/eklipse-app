export default {
  setUsers(state, payload) {
    state.users = payload;
  },
  setActiveUser(state, payload) {
    state.activeUser = payload;
  },
  setNewUsers(state, payload) {
    state.users = state.users.filter((user) => user.id !== payload);
  },
  addUser(state, payload) {
    state.users.unshift(payload);
  },
  updateUser(state, payload) {
    state.users = payload.users.splice(payload.id, 1, payload.updatedUser);
  },
  setUsersLoading(state, payload) {
    state.usersLoading = payload;
  },
  setUserIsSending(state, payload) {
    state.userIsSending = payload;
  },
  setUsersToFetch(state, payload) {
    state.usersToFetch = payload;
  },
};
