import { app } from "../../../../db.js";
import firebase from "firebase/app";

let lastVisible = "";
let limit = 11;

export default {
  // filter changelogs
  // payload is going to be the list of filters, if any
  setFilteredChangelogs({ commit, getters }, filters) {
    return new Promise((resolve) => {
      commit("setChangelogsLoading", true);
      const rootFilter = [["companyRef", "==", getters.getCompanyRef]];
      // check if any filters exist — if so, add them to the root filter
      // if they exist, we set the changelogs to empty array as opposed to concatting while fetching more changelogs
      if (filters) {
        lastVisible = "";
        commit("setChangelogs", []);
        filters.forEach((filter) => {
          if (filter.method !== null && filter.option !== null) {
            rootFilter.push([`${filter.method}`, "==", `${filter.option}`]);
          }
        });
      }
      app.content
        .get({
          schemaKey: "bugs",
          populate: [
            {
              fields: ["title", "description", "type", "priority", "status"],
            },
            {
              field: "userRef",
            },
            {
              field: "companyRef",
            },
          ],
          filters: rootFilter,
          orderBy: "title",
          limit: limit,
          startAfter: lastVisible === "" ? null : lastVisible,
        })
        .then((filteredChangelogs) => {
          let poppedChangelog;
          if (filteredChangelogs) {
            const changelogsArray = [];
            const changelogs = Object.values(filteredChangelogs);
            if (changelogs.length == limit) {
              poppedChangelog = changelogs.pop();
            }
            if (poppedChangelog) {
              commit("setChangelogsToFetch", true);
            } else {
              commit("setChangelogsToFetch", false);
            }
            lastVisible = changelogs[changelogs.length - 1].title;
            changelogs.forEach((changelog) => {
              changelogsArray.push(changelog);
            });
            commit("setChangelogs", changelogsArray);
            commit("setChangelogsLoading", false);
            resolve(changelogsArray);
          } else {
            commit("setChangelogsLoading", false);
            commit("setChangelogs", []);

            return;
          }
        })
        .catch((error) => {
          console.log("couldn't get the bugs:", error);
        });
    });
  },

  // add changelog
  addChangelog({ commit, getters }, payload) {
    return new Promise((resolve) => {
      let unsubscribe = () => {};
      commit("setChangelogIsSending", true);
      app.content
        .add({
          schemaKey: "bugs",
          data: {
            title: payload.title,
            description: payload.description,
            link: payload.link,
            type: payload.type,
            priority: payload.priority,
            status: "To-Do",
            userRef: getters.getUserRef,
            companyRef: getters.getCompanyRef,
          },
        })
        .then((changelog) => {
          app.content
            .ref(["bugs", changelog.id])
            .get()
            .then((changelogRef) => {
              getters.getCompanyRef
                .update({
                  changelogsRef: firebase.firestore.FieldValue.arrayUnion(
                    changelogRef.docs[0].ref
                  ),
                })
                .then(() => {
                  commit("setChangelogIsSending", false);
                  commit("toggleModal");
                  unsubscribe = app.content.subscribe({
                    schemaKey: "bugs",
                    entryId: changelog.id,
                    changeType: 'added',
                    callback(error, changelogToAdd) {
                      if (error) {
                        return console.error(
                          "Something went wrong while retrieving all the content. Details:",
                          error
                        );
                      }
                      setTimeout(() => {
                        commit("addChangelog", changelogToAdd);
                      }, 500);
                    },
                  });
                })
                .catch((error) => {
                  console.log(error);
                  commit("setChangelogIsSending", false);
                });
            })
            .catch((error) => {
              console.log(error);
              commit("setChangelogIsSending", false);
            });
        })
        .catch((error) => {
          console.log(error);
          commit("setChangelogIsSending", false);
        });
      resolve();
      unsubscribe();
    });
  },

  // update changelog
  updateChangelog({ commit, getters }, payload) {
    return new Promise((resolve) => {
      let unsubscribe = () => {};
      commit("setChangelogIsSending", true);
      const activeChangelogId = getters.getActiveChangelogId;
      app.content
        .update({
          schemaKey: "bugs",
          entryId: activeChangelogId,
          data: {
            title: payload.title,
            description: payload.description,
            link: payload.link,
            type: payload.type,
            priority: payload.priority,
          },
        })
        .then((updatedChangelog) => {
          console.log("updated successfully!", updatedChangelog);
          commit("setChangelogIsSending", false);
          commit("toggleModal");
          app.content.subscribe({
            schemaKey: "bugs",
            changeType: 'modified',
            callback(error, changelogs) {
              if (error) {
                console.error(
                  "Something went wrong while retrieving all the content. Details:",
                  error
                );
              }
              setTimeout(() => {
                commit("updateChangelog", changelogs);
                console.log(changelogs)
              }, 500);
            },
          });
          unsubscribe();
        })
        .catch((error) => {
          console.error(error);
          commit("setChangelogIsSending", false);
        });
      resolve();
      
    });
  },

  // delete changelog
  deleteChangelog({ commit, getters }) {
    return new Promise((resolve) => {
      commit("setChangelogIsSending", true);
      // get active changelog by ref
      console.log(getters.getActiveChangelogId);
      app.content
        .ref(["bugs", getters.getActiveChangelogId])
        .get()
        .then((changelog) => {
          const changelogRef = changelog.docs[0].ref;
          app.content
            .update({
              schemaKey: "companies",
              entryId: getters.getCompanyId,
              data: {
                changelogsRef: firebase.firestore.FieldValue.arrayRemove(
                  changelogRef
                ),
              },
            })
            .then(() => {
              const id = getters.getActiveChangelogId;
              app.content
                .remove({
                  schemaKey: "bugs",
                  entryId: id,
                })
                .then(() => {
                  commit("setChangelogIsSending", false);
                  commit("toggleModal");
                  this.modalOpen = false;
                  setTimeout(() => {
                    commit("removeChangelog", id);
                  }, 500);
                });
            })
            .catch((error) => {
              console.log("there was an error:", error);
            });
        });
      resolve();
    });
  },
};
