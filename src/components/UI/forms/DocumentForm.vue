<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="form-row">
      <base-input
        type="text"
        name="FILE_NAME"
        placeholder="File name"
        id="FILE_NAME"
        link
        :value="getDocumentName"
        v-model.trim="fileName.val"
        @blur="clearValidity('fileName')"
      ></base-input>
      <div v-if="fileName.val" class="modeledText">
        File name: <b>{{ convertToRegex }}</b>
      </div>
      <base-form-error
        v-if="!fileName.isValid"
        errorMessage="File name is required"
      ></base-form-error>
    </div>
    <div v-if="modalType === 'Add'" class="ticket--upload">
      <base-button
        class="button--nav-tertiary"
        :disabled="file.file.length ? 'disabled' : null"
        @click.prevent="triggerFileInput()"
      >
        <font-awesome-icon
          :icon="['fad', 'file-upload']"
          class="fa-lg mr-5"
        ></font-awesome-icon>
        <span>Add file</span>
      </base-button>
      <input type="file" id="file" ref="file" @change="handleFileUpload()" />
      <div v-if="file.file.length" class="ticket--uploads">
        <base-pill
          :content="file.file[0].name"
          @click="removeFile($event)"
        ></base-pill>
      </div>
    </div>
    <base-form-error
      v-if="isFileTooBig"
      errorMessage="The maximum file size is 2MB"
    ></base-form-error>
    <base-form-error
      v-if="!file.isValid"
      errorMessage="A file is required"
    ></base-form-error>
    <div class="ticket--divider"></div>
    <base-button v-if="!getDocumentIsSending" type="submit"
      >{{ modalType }} Document</base-button
    >
    <base-button
      v-if="getDocumentIsSending"
      type="button"
      class="button--mr-auto"
      disabled
      >Uploading...<base-spinner size="0.2"></base-spinner
    ></base-button>
    <div v-if="error" class="form--error">
      There was an error!
    </div>
  </form>
</template>

<script>
import BasePill from "../elements/BasePill.vue";

export default {
  components: {
    BasePill,
  },
  props: {
    modalType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fileName: {
        val: "",
        convertedVal: "",
        isValid: true,
      },
      file: {
        file: [],
        isValid: true,
      },
      isFormValid: true,
      isFileTooBig: false,
      error: "",
    };
  },
  computed: {
    getDocumentIsSending() {
      return this.$store.getters.getDocumentIsSending;
    },
    getDocumentName: {
      get() {
        return this.$store.getters.getDocumentName;
      },
      set(value) {
        this.$store.commit("updateDocumentName", value);
      },
    },
    convertToRegex() {
      if (this.fileName.val) {
        return this.fileName.val.replace(/ /g, "_");
      } else {
        return "";
      }
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      let file = this.$refs.file.files[0];
      // check if the file size exceedes the 2MB limit imposed by ME
      if (file.size <= 2000000) {
        this.file.file.push(file);
        console.log(file);
      } else {
        this.isFileTooBig = true;
        console.log("the file is too big!");
        return;
      }
    },
    removeFile(result) {
      this.file.file = result;
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateCreds() {
      if (!this.fileName.val.length > 0) {
        this.fileName.isValid = false;
        this.isFormValid = false;
      }
      if (!this.file.file.length) {
        this.file.isValid = false;
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

      this.$store.dispatch("addDocument", {
        file: this.$refs.file.files[0],
        name: this.convertToRegex,
      });
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
  min-width: 0;
  margin-left: 2rem;
  align-items: center;
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
.modeledText {
  padding-top: 0.5rem;
  margin-left: 12px;
}
</style>
