import { app } from "../../../../db.js";

export default {
  // get times
  setMicroProjects({ commit, getters }) {
    return new Promise((resolve) => {
      commit("setMicroProjectsLoading", true);
      app.content
        .get({
          schemaKey: "microProjects",
          populate: [
            {
              fields: "companyRef",
            },
          ],
          filters: [
            ["companyRef", "==", getters.getCompanyRef],
            ["status", "==", "Pending"],
          ],
        })
        .then((theMicroProjects) => {
          const microProjects = Object.values(theMicroProjects);
          const microProjectsArray = [];
          microProjects.forEach((microProject) => {
            microProjectsArray.push(microProject);
          });
          commit("setMicroProjects", microProjectsArray);
          commit("setMicroProjectsLoading", false);
          resolve(microProjectsArray);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },

  // approve micro-project
  approveMicroProject({ commit, getters }) {
    commit("setApprovalIsSending", true);
    const activeMicroProjectId = getters.getActiveMicroProjectId;
    console.log(activeMicroProjectId)
    app.content.update({
      schemaKey: "microProjects",
      entryId: activeMicroProjectId,
      data: {
        status: "Approved",
      },
    }).then(() => {
        commit("setApprovalIsSending", false);
        commit("toggleModal");
          setTimeout((updatedMicroProject) => {
            const newMicroProjects = getters.getMicroProjects.splice(
              getters.getActiveMicroProjectIdx,
              1,
              updatedMicroProject
            );
            commit("updateMicroProjects", newMicroProjects);
          }, 500);
    }).catch((error) => {
        console.log(error)
        commit("setApprovalIsSending", false);
    });
  },
};
