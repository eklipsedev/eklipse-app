export default {
  getChangelogs(state) {
    return state.changelogs;
  },
  /* getSortedChangelogs: (state) => (sortOrder) => {
    return state.changelog.find(user => user.user.id === id)
  }, */
  getChangelogsLoading(state) {
    return state.changelogsLoading;
  },
  getChangelog: (state) => (index) => {
    return state.changelogs[index];
  },
  getChangelogTitle(state) {
    return state.activeChangelog.length ? state.activeChangelog[0].title : "";
  },
  getChangelogDescription(state) {
    return state.activeChangelog.length
      ? state.activeChangelog[0].description
      : "";
  },
  getChangelogLink(state) {
    return state.activeChangelog.length ? state.activeChangelog[0].link : "";
  },
  getChangelogType(state) {
    return state.activeChangelog[0].type;
  },
  getChangelogPriority(state) {
    return state.activeChangelog[0].priority;
  },
  getActiveChangelog(state) {
    return state.activeChangelog;
  },
  getActiveChangelogLength(state) {
    return state.activeChangelog.length;
  },
  getActiveChangelogIdx(state) {
    return state.activeChangelog[0].idx;
  },
  getActiveChangelogId(state) {
    return state.activeChangelog[0].id;
  },
  getChangelogIsSending(state) {
    return state.changelogIsSending;
  },
  getChangelogsToFetch(state) {
      return state.changelogsToFetch;
  }
};
