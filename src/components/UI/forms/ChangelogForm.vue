<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-row">
      <base-input
        type="text"
        name="ISSUE_TITLE"
        placeholder="Title*"
        id="ISSUE_TITLE"
        :value="getChangelogTitle"
        v-model.trim="getChangelogTitle"
        @blur="clearValidity('title')"
      ></base-input>
      <base-form-error
        v-if="!issue.title.isValid"
        errorMessage="A title is required"
      ></base-form-error>
    </div>
    <div class="form-row">
      <base-text-area
        name="ISSUE_DESC"
        placeholder="Description"
        id="ISSUE_DESC"
        :value="getChangelogDescription"
        v-model.trim="getChangelogDescription"
        @blur="clearValidity('description')"
      ></base-text-area>
    </div>
    <div class="form-row">
      <base-input
        type="text"
        name="ISSUE_LINK"
        placeholder="Google Suite Link (Docs, Sheets or Slides)"
        id="ISSUE_LINK"
        link
        :value="getChangelogLink"
        v-model.trim="getChangelogLink"
        @open-link="openLink()"
        @blur="clearValidity('link')"
      ></base-input>
    </div>
    <div class="form-row form-row__2-col">
      <div class="form-cell">
        <base-select
          :default="getActiveChangelogLength ? getChangelogType : 'Bug'"
          fieldName="Type*"
          @selected-option="setSelected($event, 'type')"
          :options="['Bug', 'Feature']"
        ></base-select>
        <base-form-error
          v-if="!issue.type.isValid"
          errorMessage="A type is required"
        ></base-form-error>
      </div>
      <div class="form-cell">
        <base-select
          :default="getActiveChangelogLength ? getChangelogPriority : 'Low'"
          @selected-option="setSelected($event, 'priority')"
          fieldName="Priority*"
          :options="['Low', 'Medium', 'High']"
        ></base-select>
        <base-form-error
          v-if="!issue.priority.isValid"
          errorMessage="A priority is required"
        ></base-form-error>
      </div>
    </div>
    <div class="ticket--divider"></div>
    <base-button v-if="!getChangelogIsSending" type="submit"
      >{{ modalType }} Task</base-button
    >
    <base-button
      v-if="getChangelogIsSending"
      type="button"
      class="button--mr-auto"
      disabled
      >{{ modalType === "Add" ? "Logging" : "Updating" }}...<base-spinner
        size="0.2"
      ></base-spinner
    ></base-button>
    <div v-if="error" class="form--error">
      There was an error!
    </div>
  </base-form>
</template>

<script>
import FileUploadHandler from "./FileUploadHandler";

export default {
  mixins: [FileUploadHandler],
  props: {
    modalType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      issue: {
        title: {
          isValid: true,
        },
        description: {
          isValid: true,
        },
        type: {
          val: "",
          isValid: true,
        },
        priority: {
          val: "",
          isValid: true,
        },
        link: {
          val: "",
          isValid: true,
        },
      },
      isFormValid: true,
      error: "",
    };
  },
  computed: {
    getChangelogTitle: {
      get() {
        return this.$store.getters.getChangelogTitle;
      },
      set(value) {
        this.$store.commit("updateChangelogTitle", value);
      },
    },
    getChangelogDescription: {
      get() {
        return this.$store.getters.getChangelogDescription;
      },
      set(value) {
        this.$store.commit("updateChangelogDescription", value);
      },
    },
    getChangelogLink: {
      get() {
        return this.$store.getters.getChangelogLink;
      },
      set(value) {
        this.$store.commit("updateChangelogLink", value);
      },
    },
    getChangelogType: {
      get() {
        return this.$store.getters.getChangelogType;
      },
      set(value) {
        this.$store.commit("updateChangelogType", value);
      },
    },
    getChangelogPriority: {
      get() {
        return this.$store.getters.getChangelogPriority;
      },
      set(value) {
        this.$store.commit("updateChangelogPriority", value);
      },
    },
    getChangelogIsSending() {
      return this.$store.getters.getChangelogIsSending;
    },
    getActiveChangelogLength() {
      return this.$store.getters.getActiveChangelogLength;
    },
  },
  methods: {
    openLink() {
      window.open(this.getChangelogLink, "_blank");
    },
    setSelected(selected, input) {
      this.issue[input].val = selected;
      this.clearValidity(input);
    },
    setValue(arg, alt = "") {
      this.getActiveChangelogLength ? arg : alt;
    },
    clearValidity(input) {
      this.issue[input].isValid = true;
    },
    validateCreds() {
      if (!this.getChangelogTitle) {
        this.issue.title.isValid = false;
        this.isFormValid = false;
      } else {
        this.isFormValid = true;
      }
    },
    submitForm() {
      this.validateCreds();

      if (!this.isFormValid) {
        return;
      }

      if (this.modalType === "Add") {
        this.$store.dispatch("addChangelog", {
          title: this.getChangelogTitle ? this.getChangelogTitle : "",
          description: this.getChangelogDescription
            ? this.getChangelogDescription
            : "",
          link: this.getChangelogLink ? this.getChangelogLink : "",
          type: this.issue.type.val,
          priority: this.issue.priority.val,
        });
      } else {
        this.$store.dispatch("updateChangelog", {
          title: this.getChangelogTitle ? this.getChangelogTitle : "",
          description: this.getChangelogDescription
            ? this.getChangelogDescription
            : "",
          link: this.getChangelogLink ? this.getChangelogLink : "",
          type: this.issue.type.val,
          priority: this.issue.priority.val,
        });
      }
    },
  },
};
</script>

<style scoped>
.ticket--upload {
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
}
.ticket--uploads {
  display: flex;
  flex-wrap: wrap;
  margin-left: 2rem;
  align-items: center;
  align-content: flex-start;
  flex: 1;
}
.ticket--required {
  font-size: 0.875rem;
  font-weight: 500;
}
.ticket--divider {
  height: 1px;
  margin: 1.5rem 0;
  border-top: 2px dashed var(--input-bg-color);
}
input[type="file"] {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.nav--link {
  border-radius: 10px;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  font-weight: 600;
  text-align: center;
  font-size: 0.875rem;
}
.nav--link:hover {
  background-color: var(--secondary-color);
}
.mr-5 {
  margin-right: 0.5rem;
}
</style>
