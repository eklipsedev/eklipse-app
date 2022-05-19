"use strict";

import { auth, app } from "../../../../db.js";
import router from "@/router/index.js";

let timer;
let theUser;

export default {
  async login(context, payload) {
    return context.dispatch("tryAuth", {
      ...payload,
    });
  },

  async tryAuth({ commit, dispatch }, payload) {
    commit("setIsAuthLoading", true);

    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        const authUser = userCredential.user;
        if (authUser) {
          app.users
            .ref(authUser.uid)
            .get()
            .then((userRef) => {
              app.content
                .get({
                  schemaKey: "users",
                  populate: [
                    {
                      field: "user",
                      populate: [
                        {
                          field: "permissions",
                        },
                      ],
                    },
                    {
                      field: "company",
                      populate: [
                        {
                          field: "changelogsRef",
                        },
                        {
                          field: "id",
                        },
                      ],
                    },
                  ],
                  filters: [["userRef", "==", userRef.docs[0].ref]],
                })
                .then((user) => {
                  theUser = Object.values(user);
                  authUser
                    .getIdTokenResult()
                    .then((idTokenResult) => {
                      commit("setAuth", {
                        token: idTokenResult.token,
                        userId: authUser.uid,
                      });
                      commit("setUser", theUser);
                      commit("setUserRef", userRef.docs[0].ref)

                      localStorage.setItem("token", idTokenResult.token);
                      localStorage.setItem("userId", authUser.uid);

                      router.replace("/dashboard");
                      commit("setIsAuthLoading", false);
                      commit("setLoginError", "");
                    })
                    .catch((error) => {
                      console.log(error);
                      commit("setIsAuthLoading", false);
                      commit("setLoginError", error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                  commit("setIsAuthLoading", false);
                  commit("setLoginError", error);
                });
            });
        } else {
          commit("setIsAuthLoading", false);
          commit("setLoginError", "The user requested is not authenticated");
        }
      })
      .catch((error) => {
        console.log(error);
        commit("setIsAuthLoading", false);
        commit("setLoginError", error);
      });

    const expiresIn = 1000000000000000000000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(function() {
      dispatch("autoLogout");
    }, expiresIn);
  },

  tryLogin({ commit }) {
    return new Promise((resolve) => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      if (token && userId) {
        commit("setAuth", {
          token: token,
          userId: userId,
        });
        app.users
          .ref(userId)
          .get()
          .then((userRef) => {
            commit("setUserRef", userRef.docs[0].ref);
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
                    field: "company",
                    populate: [
                      {
                        field: "changelogs",
                      },
                    ],
                  },
                ],
                filters: [["userRef", "==", userRef.docs[0].ref]],
              })
              .then((user) => {
                theUser = Object.values(user);
                commit("setUser", theUser[0]);
                commit("setIsAuthLoading", false);
                resolve(theUser[0]);
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }

      const expiresIn = +tokenExpiration - new Date().getTime();
      console.log(expiresIn);

      /* if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn); */
    });
  },
  logout({ commit }) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    clearTimeout(timer);

    commit("setAuth", {
      token: null,
      userId: null,
    });
  },
  autoLogout({ commit, dispatch }) {
    dispatch("logout");
    commit("setAutoLogout");
  },
};


