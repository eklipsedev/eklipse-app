export default {
  getRootServices(state) {
    return state.services.filter((service) => service.rootService === true);
  },
  getMicroServices(state) {
    return state.services.filter((service) => service.rootService === false);
  },
};
