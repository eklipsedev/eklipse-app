import { app } from "../../../../db.js";

export default {
  setProjects({ commit }) {
    return new Promise((resolve) => {
      app.content
        .get({
          schemaKey: "projects",
          populate: ["projectThumbnail"],
        })
        .then((theProjects) => {
          const projects = Object.values(theProjects);
          commit("setProjects", projects);
          console.log(projects)
          resolve(projects);
        });
    });
  },
};