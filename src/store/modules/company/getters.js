export default {
  getCompany(state) {
    return state.company;
  },
  getCompanyDocuments(state) {
    return state.company[0].documentsRef;
  },
  getCompanyId(state) {
    return state.company[0].id;
  },
  getCompanyName(state) {
    return state.company[0].name;
  },
  getCompanyRef(state) {
    return state.companyRef;
  },
};
