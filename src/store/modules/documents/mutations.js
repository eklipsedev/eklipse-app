export default {
  setDocuments(state, payload) {
    state.documents = payload.length > 0 ? state.documents.concat(payload) : [];
  },
  setDocumentsLoading(state, payload) {
    state.documentsLoading = payload;
  },
  setDocumentIsSending(state, payload) {
    state.documentIsSending = payload;
  },
  setDocumentsToFetch(state, payload) {
    state.documentsToFetch = payload;
  },
  setActiveDocument(state, payload) {
    state.activeDocument = payload;
  },
  addDocument(state, payload) {
    state.documents.unshift(payload);
  },
  removeDocument(state, payload) {
    state.documents = state.documents.filter(
      (document) => document.id !== payload
    );
  },
  updateDocumentName(state, payload) {
    state.activeDocument[0].metadata.name = payload.substring(payload.indexOf("_") + 1);
  },
};
