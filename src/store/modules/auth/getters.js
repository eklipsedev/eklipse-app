export default {
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
    isAuthLoading(state) {
      return state.isAuthLoading;
    },
    loginError(state) {
      return state.loginError;
    },
    getUser(state) {
      return state.user;
    },
    getUserRef(state) {
      return state.userRef;
    },
    getUserId(state) {
      return state.user.userId;
    },
    getUserCompanyId(state) {
      return state.user.company.id;
    },
    getUserFirstName(state) {
      return state.user.userRef.firstName;
    },
    getUserLastName(state) {
      return state.user.userRef.lastName;
    },
    getUserEmail(state) {
      return state.user.userRef.email;
    },
    getUserPhone(state) {
      return state.user.phone;
    },
    getUserPermission(state) {
      console.log(state.user)
      return state.user.userRef.permissions.name;
    },
  };