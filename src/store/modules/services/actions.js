import { app } from "../../../../db.js";

export default {
  setServices({ commit }) {
    return new Promise((resolve) => {
      app.content
        .get({
          schemaKey: "services",
          populate: ["microServices"],
        })
        .then((theServices) => {
          const services = Object.values(theServices);
          commit("setServices", services);
          console.log(services)
          resolve(services);
        });
    });
  },
};
