import { app } from "../../../../db.js";

let lastVisible = "";
let limit = 11;

export default {
  // filter documents
  // payload is going to be the list of filters, if any
  setFilteredDocuments({ commit, getters }, filters) {
    return new Promise((resolve) => {
      commit("setDocumentsLoading", true);
      const rootFilter = [["companyRef", "==", getters.getCompanyRef]];
      // check if any filters exist — if so, add them to the root filter
      // if they exist, we set the documents to empty array as opposed to concatting while fetching more documents
      if (filters) {
        lastVisible = "";
        commit("setDocuments", []);
        filters.forEach((filter) => {
          if (filter.method !== null && filter.option !== null) {
            rootFilter.push([`${filter.method}`, "==", `${filter.option}`]);
          }
        });
      }
      app.storage
        .getFiles({
          mediaType: 'files',
          orderBy: "id",
          limit: limit,
          startAfter: lastVisible === "" ? null : lastVisible,
        })
        .then((filteredDocuments) => {
          let poppedDocument;
          if (filteredDocuments) {
            const documents = Object.values(filteredDocuments);
            if (documents.length == limit) {
              poppedDocument = documents.pop();
            }
            if (poppedDocument) {
              commit("setDocumentsToFetch", true);
            } else {
              commit("setDocumentsToFetch", false);
            }
            lastVisible = documents[documents.length - 1].title;
            const documentsArray = documents.map(async (document) => {
              try {
                const url = await app.storage.getURL({ fileId: document.id });
                const metadata = await app.storage.getMetadata({
                  fileId: document.id,
                });
                return {
                  ...document,
                  url: url,
                  metadata: metadata,
                };
              } catch (error) {
                return console.error(
                  "Something went wrong while retrieving the file URL. Details:",
                  error
                );
              }
            });
            Promise.all(documentsArray).then((result) => {
              commit("setDocuments", result);
              commit("setDocumentsLoading", false);
              resolve(result);
            });
          } else {
            commit("setDocumentsLoading", false);
            commit("setDocuments", []);
            return;
          }
        })
        .catch((error) => {
          console.log("couldn't get the documents:", error);
          commit("setDocumentsLoading", false);
        });
    });
  },

  // add document
  addDocument({ commit }, payload) {
    commit("setDocumentIsSending", true);
    const file = payload.file;
    app.storage
      .upload(file, {
        metadata: {
          name: payload.name,
        },
      })
      .then((theFile) => {
        console.log("Upload success!", theFile);
        commit("setDocumentIsSending", false);
        commit("toggleModal");
        setTimeout(() => {
          commit("addDocument", file);
        }, 500);
      })
      .catch((error) => {
        console.error("Upload failed. Details:", error);
        commit("setDocumentIsSending", false);
      });
  },

  // delete document
  deleteDocument({ commit, getters }) {
    commit("setDocumentIsSending", true);

    const id = getters.getActiveDocumentId;

    app.storage
      .deleteFile({ fileId: id })
      .then(() => {
        console.log("File successfully deleted!");
        commit("setDocumentIsSending", false);
        commit("toggleModal");
        setTimeout(() => {
          commit("removeDocument", id);
        }, 500);
      })
      .catch((error) => {
        console.error(
          "Something went wrong while deleting the file. Details:",
          error
        );
      });
  },
};
