export default {
  setMicroProjects(state, payload) {
    state.microProjects = payload;
  },
  setMicroProjectsLoading(state, payload) {
    state.microProjectsLoading = payload;
  },
  setActiveMicroProject(state, payload) {
    state.activeMicroProject = payload;
    console.log(state.activeMicroProject)
  },
  setApprovalIsSending(state, payload) {
    state.approvalIsSending = payload;
  },
};
