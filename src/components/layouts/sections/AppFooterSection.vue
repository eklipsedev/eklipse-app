<template>
  <footer>
    <base-section class="section--app-footer">
      <base-container class="container--center">
        <div>
          eklipse Development 2021 | <base-button
            link
            :to="`/account/${getUserId}/support`"
            >Support</base-button
          >
        </div>
      </base-container>
    </base-section>
  </footer>
</template>

<script>
export default {
  computed: {
    getUserId() {
      return this.$store.getters.getUserId;
    }
  }
}
</script>
