import { app } from "../../../../db.js";

export default {
  // get the company filtered by the authenticated user
  setCompany({ commit, getters }) {
    return new Promise((resolve) => {
      app.content
        .get({
          schemaKey: "companies",
          populate: [
            {
              field: "usersRef",
              populate: ["permissions"],
            },
            {
              field: "changelogsRef",
              populate: ["userRef"],
            },
            {
              field: "documentsRef",
              populate: ["folderId"],
            },
          ],
          filters: [["usersRef", "array-contains", getters.getUserRef]],
        })
        .then((theCompany) => {
          const company = Object.values(theCompany);
          commit("setCompany", company);
          console.log(company)
          resolve(company);
        });
    });
  },

  // get the company reference to populate other functions
  setCompanyRef({ commit, getters }) {
    return new Promise((resolve) => {
      app.content
        .ref(["companies", getters.getCompanyId])
        .get()
        .then((company) => {
          const companyRef = company.docs[0].ref;
          commit("setCompanyRef", companyRef);
          resolve(companyRef);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
