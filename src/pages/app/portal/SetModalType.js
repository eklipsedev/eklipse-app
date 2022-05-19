export default {
  methods: {
    setModalType(type) {
      type = type || null;
      switch (type) {
        case "Edit":
          this.modalType = "Edit";
          break;
        case "Delete":
          this.modalType = "Delete";
          break;
        default:
          this.modalType = "Add";
      }
    },
  },
};
