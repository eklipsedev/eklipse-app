export default {
  setChangelogs(state, payload) {
    state.changelogs =
      payload.length > 0 ? state.changelogs.concat(payload) : [];
  },
  setChangelogsLoading(state, payload) {
    state.changelogsLoading = payload;
  },
  setChangelogIsSending(state, payload) {
    state.changelogIsSending = payload;
  },
  setChangelogsToFetch(state, payload) {
    state.changelogsToFetch = payload;
  },
  setActiveChangelog(state, payload) {
    state.activeChangelog = payload;
  },
  removeChangelog(state, payload) {
    state.changelogs = state.changelogs.filter(
      (changelog) => changelog.id !== payload
    );
  },
  addChangelog(state, payload) {
    state.changelogs.unshift(payload);
  },
  updateChangelog(state, payload) {
    state.changelogs = payload;
    /* state.changelogs = state.changelogs.splice(
      state.activeChangelog[0].idx,
      1,
      payload
    ); */
  },
  updateChangelogTitle(state, payload) {
    state.activeChangelog[0].title = payload;
  },
  updateChangelogDescription(state, payload) {
    state.activeChangelog[0].description = payload;
  },
  updateChangelogLink(state, payload) {
    state.activeChangelog[0].link = payload;
  },
  updateChangelogType(state, payload) {
    state.activeChangelog[0].type = payload;
  },
  updateChangelogPriority(state, payload) {
    state.activeChangelog[0].priority = payload;
  },
};
