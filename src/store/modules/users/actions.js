import { app, functions } from "../../../../db.js";
import firebase from "firebase/app";

let lastVisible = "";
let limit = 11;

export default {
  // filter users
  // payload is going to be the list of filters, if any
  setFilteredUsers({ commit, getters }, filters) {
    return new Promise((resolve) => {
      commit("setUsersLoading", true);
      const rootFilter = [["companyRef", "==", getters.getCompanyRef]];
      // check if any filters exist — if so, add them to the root filter
      // if they exist, we set the users to empty array as opposed to concatting while fetching more users
      if (filters) {
        lastVisible = "";
        commit("setUsers", []);
        filters.forEach((filter) => {
          if (filter.method !== null && filter.option !== null) {
            rootFilter.push([`${filter.method}`, "==", `${filter.option}`]);
          }
        });
      }
      app.content
        .get({
          schemaKey: "users",
          populate: [
            {
              field: "userRef",
              populate: [
                {
                  field: "permissions",
                },
              ],
            },
            {
              field: "companyRef",
              populate: [
                {
                  fields: ["changelogsRef", "usersRef"],
                },
              ],
            },
          ],
          filters: rootFilter,
          orderBy: "phone",
          limit: limit,
          startAfter: lastVisible === "" ? null : lastVisible,
        })
        .then((filteredUsers) => {
          let poppedUser;
          if (filteredUsers) {
            const usersArray = [];
            const users = Object.values(filteredUsers);
            if (users.length == limit) {
              poppedUser = users.pop();
            }
            if (poppedUser) {
              commit("setUsersToFetch", true);
            } else {
              commit("setUsersToFetch", false);
            }
            lastVisible = users[users.length - 1].title;
            users.forEach((user) => {
              usersArray.push(user);
            });
            commit("setUsers", usersArray);
            commit("setUsersLoading", false);
            resolve(usersArray);
          } else {
            commit("setUsersLoading", false);
            commit("setUsers", []);

            return;
          }
        })
        .catch((error) => {
          console.log("couldn't get the users:", error);
        });
    });
  },

  // add new user
  addUser({ commit, getters }, payload) {
    commit("setUserIsSending", true);
    const createUser = functions.httpsCallable("createUser");

    createUser({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      companyId: getters.getUserCompanyId,
      enabled: payload.enabled,
      permissionId: payload.permissionId,
    })
      .then((result) => {
        const userId = result.data.id;

        app.users
          .ref(userId)
          .get()
          .then((newUserRef) => {
            app.users
              .get({
                uid: userId,
                populate: true,
              })
              .then((newUser) => {
                getters.getCompanyRef
                  .update({
                    userRef: firebase.firestore.FieldValue.arrayUnion(
                      newUserRef
                    ),
                  })
                  .then(() => {
                    commit("setUserIsSending", false);
                    commit("toggleModal");
                    setTimeout(() => {
                      commit("addUser", newUser);
                    }, 500);
                  })
                  .catch((error) => {
                    console.log(error);
                    commit("setUserIsSending", false);
                  });
              })
              .catch((error) => {
                console.log(error);
                commit("setUserIsSending", false);
              });
          });
      })
      .catch((error) => {
        console.log(error);
        this.error = error;
        this.isSending = false;
      });
  },

  // update a user
  updateUser({ commit, getters }, payload) {
    commit("setUserIsSending", true);
    const updateUser = functions.httpsCallable("updateUser");

    updateUser({
      userId: getters.getActiveUserId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      companyId: getters.getUserCompanyId,
      enabled: payload.enabled,
      permissionId: payload.permissionId,
    })
      .then((updatedUser) => {
        commit("setUserIsSending", false);
        commit("toggleModal");
        setTimeout(() => {
          commit("updateUser", {
            id: getters.getActiveUserId,
            users: getters.getUsers,
            updatedUser: updatedUser,
          });
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        this.error = error;
        commit("setUserIsSending", false);
      });
  },

  // delete a user from auth & firestore
  deleteUser({ commit, getters }) {
    commit("setUserIsSending", true);

    const deleteUser = functions.httpsCallable("deleteUser");
    const userRef = getters.getUserRef;

    app.content
      .get({
        schemaKey: "users",
        filters: [["user", "==", userRef]],
      })
      .then((user) => {
        const userId = user.id;
        app.content
          .update({
            schemaKey: "companies",
            entryId: getters.getUserCompanyId,
            data: {
              userRef: firebase.firestore.FieldValue.arrayRemove(userRef),
            },
          })
          .then(() => {
            deleteUser({
              userId: getters.getUserId,
              docId: userId,
            })
              .then(() => {
                commit("setUserIsSending", false);
                commit("toggleModal");
                setTimeout(() => {
                  commit("setNewUsers", userId);
                }, 500);
              })
              .catch((error) => {
                console.log(error);
                commit("setUserIsSending", false);
              });
          });
      });
  },
};
