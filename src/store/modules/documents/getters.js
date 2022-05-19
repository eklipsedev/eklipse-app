export default {
  getDocuments(state) {
    return state.documents;
  },
  getDocument: (state) => (index) => {
    return state.documents[index];
  },
  getDocumentsLoading(state) {
    return state.documentsLoading;
  },
  getDocumentIsSending(state) {
    return state.documentIsSending;
  },
  getActiveDocumentId(state) {
    return state.activeDocument[0].id;
  },
  getActiveDocument(state) {
    return state.activeDocument;
  },
  getDocumentName(state) {
    return state.activeDocument.length ? state.activeDocument[0].file : "";
  },
};
