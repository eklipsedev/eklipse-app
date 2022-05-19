<template>
  <div>
    <hero-secondary subtext="You know, the legal stuff."
      ><h1 class="heading-container">
        <span>Everything</span
        ><heading-to-move level="1" text="legal"></heading-to-move></h1
    ></hero-secondary>
    <base-section>
      <base-container class="container--vertical"
        ><article v-html="copy"></article
      ></base-container>
    </base-section>
    <cta-section></cta-section>
  </div>
</template>

<script>
import { app } from "../../../db.js";

export default {
  data() {
    return {
      copy: [],
    };
  },
  methods: {
    getLegalInfo() {
      app.content
        .get({
          schemaKey: "legal",
          populate: ["copy"],
        })
        .then((legal) => {
          this.copy = legal.copy;
        });
    },
  },
  created() {
    this.getLegalInfo();
  },
};
</script>

<style scoped>
.heading-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.heading-container span {
  margin-right: 10px;
}
</style>
