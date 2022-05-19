<template>
  <div>
    <hero-secondary
      ><h1 class="heading-container">
        <span>Let's</span
        ><heading-to-move level="1" text="connect"></heading-to-move>
      </h1>
      <p>
        We'd love to hear from you!
      </p>
    </hero-secondary>
    <contact-form></contact-form>
    <cta-section></cta-section>
  </div>
</template>

<script>
import ContactForm from "../../components/UI/forms/ContactForm.vue";

export default {
  components: {
    ContactForm,
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
