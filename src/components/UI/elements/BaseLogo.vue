<template>
  <img
    :src="setMode"
    :height="height"
    :width="width"
    alt="eklipse logo"
  />
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: "light",
    },
    height: {
      type: String,
      required: false,
    },
    width: {
      type: String,
      required: false,
    },
  },
  computed: {
    setMode() {
      if (this.mode === "light") {
        return "https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/60f59823627b5a74057950c6_logo_black.png";
      } else {
        return "https://uploads-ssl.webflow.com/5bd882b916e1ea43875c4f9f/5f38436da5fdcb3eb7157670_logo-transparent-2.png";
      }
    },
  },
};
</script>
