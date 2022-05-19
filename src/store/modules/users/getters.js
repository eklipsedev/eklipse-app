export default {
  getUsers(state) {
    return state.users;
  },
  filterUsers: (state) => (id) => {
    return state.users.find(user => user.user.id === id)
  },
  getUserIsSending(state) {
    return state.userIsSending;
  },
  getUsersLoading(state) {
    return state.usersLoading;
  },
  getUsersToFetch(state) {
    return state.usersToFetch;
}
};
