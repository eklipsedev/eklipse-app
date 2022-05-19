export default {
  setCompany(state, payload) {
    state.company = payload;
  },
  setCompanyRef(state, payload) {
    state.companyRef = payload;
  },
  updateCompanyName(state, payload) {
    state.company[0].name = payload;
  },
};
