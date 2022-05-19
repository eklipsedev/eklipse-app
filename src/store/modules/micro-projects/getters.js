export default {
  getMicroProjects(state) {
    return state.microProjects;
  },
  getMicroProjectsLoading(state) {
    return state.microProjectsLoading;
  },
  getMicroProject: (state) => (index) => {
    return state.microProjects[index];
  },
  getActiveMicroProject(state) {
    return state.activeMicroProject;
  },
  getActiveMicroProjectId(state) {
    console.log(state.activeMicroProject[0].id);
    return state.activeMicroProject[0].id;
  },
  getApprovalIsSending(state) {
    return state.approvalIsSending;
  },
  getActiveMicroProjectIdx(state) {
    return state.activeMicroProject[0].idx;
  },
};
