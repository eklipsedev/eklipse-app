export default {
  setUser(state, payload) {
    state.user = payload;
    state.didAutoLogout = false;
  },
  setUserRef(state, payload) {
    state.userRef = payload;
  },
  setAuth(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    return (state.didAutoLogout = true);
  },
  setIsAuthLoading(state, payload) {
    state.isAuthLoading = payload;
  },
  setLoginError(state, payload) {
    state.loginError = payload;
  },
  updateUserFirstName(state, payload) {
    state.user.user.firstName = payload;
    console.log(payload);
  },
  updateUserLastName(state, payload) {
    state.user.user.lastName = payload;
  },
  updateUserPhone(state, payload) {
    state.user.phone = payload;
  },
  updateUserCompanyName(state, payload) {
    state.user.company.name = payload;
  },
  updateUserPermissions(state, payload) {
    state.user.user.permissions.id = payload;
  },
};
