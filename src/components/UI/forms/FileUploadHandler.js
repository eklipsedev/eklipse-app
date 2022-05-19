export default {
  methods: {
    triggerFileInput() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      let file = this.$refs.file.files[0];
      // check if the file size exceedes the 2MB limit imposed by ME
      if (file.size <= 2000000) {
        this.issue.file.file.push(file);
        console.log(file);
      } else {
        this.isFileTooBig = true;
        console.log("the file is too big!");
        return;
      }
    },
    removeFile() {
        this.issue.file.file = [];
      },
  },
};
