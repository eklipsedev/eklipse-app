export default {
  // toggle the state of the modal
  toggleModal({ commit, getters }) {
    commit("toggleModal", !getters.getIsModalOpen);
  },
  // toggle the state of the mobile menu
  toggleMenu({ commit }, payload) {
    commit("toggleMenu", payload.isMenuOpen);
    console.log(payload.isMenuOpen)
  },
};
