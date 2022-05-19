<template>
  <div>
    <hero-secondary
      ><heading-to-move level="1" text="Documents"></heading-to-move
    ></hero-secondary>
    <base-section
      ><base-container class="container--vertical">
        <list-actions>
          <div class="space-between">
            <list-filter
              @click="setFilteredDocuments"
              @remove-filters="setFilteredDocuments"
              :filters="filters"
            ></list-filter>
            <base-button
              type="button"
              class="button--commit"
              @click="setModal('Add', index)"
              >Add Document</base-button
            >
          </div>
          <teleport to="body">
            <base-backdrop></base-backdrop>
            <base-modal>
              <base-heading
                :subText="
                  modalType === 'Add' ? 'Accepted file types include PDF, Word & Excel' : null
                "
                >{{ setModalVerbiage() }} Document</base-heading
              >
              <div v-if="modalType === 'Delete'">
                <p>
                  Are you sure you want to delete this document ? This action
                  can't be undone.
                </p>
                <div class="button--actions">
                  <base-button
                    v-if="!getDocumentIsSending"
                    @click="deleteDocument()"
                    type="submit"
                    class="button"
                    >Delete Document</base-button
                  >
                  <base-button
                    v-if="getDocumentIsSending"
                    type="button"
                    class="button"
                    disabled
                    >Deleting...<base-spinner size="0.2"></base-spinner
                  ></base-button>
                </div>
              </div>
              <document-form
                v-else
                :modalType="setModalVerbiage()"
              ></document-form
            ></base-modal>
          </teleport>
        </list-actions>
        <list-header>
          <list-cell class="long">Document Name</list-cell>
          <list-cell>Type</list-cell>
          <list-cell>Size</list-cell>
          <list-cell>Created</list-cell>
          <list-cell class="last">Actions</list-cell>
        </list-header>
          <list-row
            v-for="(document, index) in getCompanyDocuments[0].documentsRef"
            :key="index"
          >
            <list-cell class="long"
              ><base-button link :to="document.url" target="_blank"
                >{{ setFileName(index)
                }}<font-awesome-icon
                  :icon="['fad', 'external-link']"
                  class="fa-sm ml-5"
                ></font-awesome-icon></base-button
            ></list-cell>

            <list-cell
              ><font-awesome-icon
                :icon="[
                  'fad',
                  'external-link'
                ]"
                class="fa-md mr-5"
              ></font-awesome-icon
              >{{
                contentTypeTranslation(document.contentType).name
              }}</list-cell
            >
            <list-cell
              >{{ Math.round(document.metadata.size / 1000) }} KB</list-cell
            >
            <list-cell>{{ getDate(document._fl_meta_.createdDate) }}</list-cell>
            <list-cell class="last"
              ><base-dropdown
                ><template #toggle>
                  <base-button class="button--nav">
                    <font-awesome-icon
                      :icon="['fas', 'ellipsis-h']"
                      class="fa-lg icon-link"
                    ></font-awesome-icon>
                  </base-button>
                </template>
                <template #nav>
                  <base-list
                    ><li>
                      <base-button
                        class="button--nav-secondary"
                        @click="setModal('Edit', index)"
                        >Edit</base-button
                      >
                    </li>
                    <li>
                      <base-button
                        class="button--nav-secondary"
                        link
                        :to="document.url"
                        download
                        >Download</base-button
                      >
                    </li>
                    <li>
                      <base-button
                        class="button--nav-secondary"
                        @click="setModal('Delete', index)"
                        >Delete</base-button
                      >
                    </li></base-list
                  >
                </template>
              </base-dropdown></list-cell
            >
          </list-row>
        <div v-if="getDocumentsLoading" class="loading-block">
          <base-spinner class="lds-roller secondary"></base-spinner>
        </div>
        <base-empty-state
          v-if="getDocuments.length === 0 && !getDocumentsLoading"
        >
          <span>No documents to be shown.</span>
        </base-empty-state>
        <base-button
          v-if="
            !getDocumentsLoading &&
              getDocumentsToFetch &&
              getDocuments.length !== 0
          "
          @click="setFilteredDocuments()"
          type="submit"
          class="button--nav-tertiary"
          >Load More</base-button
        >
      </base-container>
    </base-section>
  </div>
</template>

<script>
import DocumentForm from "../../../components/UI/forms/DocumentForm.vue";
import ListFilter from "../../../components/UI/lists/ListFilter.vue";
import SetModalType from "./SetModalType";
import SetModalVerbiage from "./SetModalVerbiage";

export default {
  components: {
    DocumentForm,
    ListFilter,
  },
  mixins: [SetModalType, SetModalVerbiage],
  data() {
    return {
      modalType: "",
      filters: [{ name: "type", method: "type", options: ["PDF", "Document"] }],
    };
  },
  computed: {
    getCompanyDocuments() {
      return this.$store.getters.getCompany;
    },
    getDocuments() {
      return this.$store.getters.getDocuments;
    },
    getDocumentsLoading() {
      return this.$store.getters.getDocumentsLoading;
    },
    getDocumentIsSending() {
      return this.$store.getters.getDocumentIsSending;
    },
    getDocumentsToFetch() {
      return this.$store.getters.getDocumentsToFetch;
    },
  },
  methods: {
    contentTypeTranslation(contentType) {
      if (contentType === "application/pdf") {
        return {
          name: "PDF",
          icon: "file-pdf",
        };
      } else if (
        contentType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return {
          name: "Word",
          icon: "file-word",
        };
      } else if (contentType === "application/vnd.ms-excel") {
        return {
          name: "Excel",
          icon: "file-excel",
        };
      } else {
        return {
          name: "Unknown",
          icon: "file-excel",
        }
      }
    },
    setModal(type, index) {
      this.$store.dispatch("toggleModal");
      this.setModalType(type);
      if (this.modalType === "Add") {
        this.$store.commit("setActiveDocument", [{}]);
      } else {
        this.$store.commit("setActiveDocument", [
          { ...this.$store.getters.getDocument(index), idx: index },
        ]);
      }
    },
    getDate(date) {
      const theDate = date.toDate();
      const theDateDay = theDate.getDate();
      const theDateMonth = theDate.getMonth() + 1;
      const theDateYear = theDate
        .getFullYear()
        .toString()
        .slice(2);
      return `${theDateMonth}/${theDateDay}/${theDateYear}`;
    },
    setFileName(index) {
      let file = this.$store.getters.getDocument(index).file;
      return file.substring(file.indexOf("_") + 1);
    },
    setFilteredDocuments(filters) {
      this.$store.dispatch("setFilteredDocuments", filters);
    },
    deleteDocument() {
      this.$store.dispatch("deleteDocument");
    },
  },
  created() {
    this.$store.dispatch("setFilteredDocuments");
  },
};
</script>

<style scoped>
input[type="file"] {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.loading-block {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}
.button--actions {
  margin-top: 2rem;
}
.space-between {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}
</style>
