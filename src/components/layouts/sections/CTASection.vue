<template>
  <base-section class="section--black">
    <base-container class="container--center container--tight">
      <h2 class="heading-container">
        <span>Ready to</span
        ><heading-to-move text="level up"></heading-to-move>?
      </h2>
      <p>
        The journey to next-level growth starts here. If partnering with a team
        of strategic thought leaders sounds good to you, let's talk.
      </p>
      <div class="spacer-helper">
        <base-button link to="/contact" class="button">Contact Us</base-button>
      </div>
    </base-container>
  </base-section>
</template>

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
