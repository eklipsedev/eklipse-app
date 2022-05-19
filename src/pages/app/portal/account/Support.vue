<template>
  <div>
    <hero-secondary
      ><h1 class="heading-container">
        <heading-to-move level="1" text="Support"></heading-to-move>
      </h1>
      <p>
        What can we help you with?
      </p>
    </hero-secondary>
    <support-form></support-form>
  </div>
</template>

<script>
import SupportForm from "../../../../components/UI/forms/SupportForm.vue"
export default {
  components: {
    SupportForm,
  }
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