export default {
  toggleModal(state) {
    if (state.isModalOpen) {
      state.isModalOpen = false;
      document.body.classList.remove("modal-open");
    } else {
      state.isModalOpen = true;
      document.body.classList.add("modal-open");
    }
  },
  toggleMenu(state) {
    if (state.isMenuOpen) {
      state.isMenuOpen = false;
    } else {
      state.isMenuOpen = true;
    }
  },
};
