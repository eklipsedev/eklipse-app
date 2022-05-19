export default {
  methods: {
    setModalVerbiage() {
      switch (this.modalType) {
        case "Delete":
          return "Delete";
        case "Edit":
          return "Edit";
        default:
          return "Add";
      }
    },
  },
};
