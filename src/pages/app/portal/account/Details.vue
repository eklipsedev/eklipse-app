<template>
  <div>
    <hero-secondary
      ><heading-to-move level="1" text="Account Details"></heading-to-move
    ></hero-secondary>
    <base-section>
      <base-container class="container--vertical container--margin-bottom">
        <base-heading>Profile Info</base-heading>
        <account-profile-info-form></account-profile-info-form>
      </base-container>
      <base-container class="container--vertical container--margin-bottom">
        <base-heading>Email</base-heading>
        <div class="flex">
          <p class="mt-0">
            Email is <b>{{ getUserEmail }}</b>
          </p>
          <font-awesome-icon
            :icon="['fad', 'edit']"
            class="fa-lg ml-1 icon-link"
            @click="setModal('Email')"
          ></font-awesome-icon>
        </div>
      </base-container>
      <base-container class="container--vertical container--margin-bottom">
        <base-heading>Password</base-heading>
        <div class="flex">
          <p class="mt-0">
            Password is private and there are no details to display.
          </p>
          <font-awesome-icon
            :icon="['fad', 'edit']"
            class="fa-lg ml-1 icon-link"
            @click="setModal('Password')"
          ></font-awesome-icon>
        </div>
        <teleport to="body">
          <base-backdrop @click="toggleModal"></base-backdrop>
          <base-modal>
            <base-heading
              subText="You will be sent an email to confirm upon submission."
              >Change
              {{ modalType === "Email" ? "Email" : "Password" }}</base-heading
            >
            <account-email-form
              v-if="modalType === 'Email'"
            ></account-email-form
            ><account-password-form
              v-if="modalType === 'Password'"
            ></account-password-form
          ></base-modal>
        </teleport>
      </base-container>
    </base-section>
  </div>
</template>

<script>
import AccountProfileInfoForm from "../../../../components/UI/forms/AccountProfileInfoForm.vue";
import AccountEmailForm from "../../../../components/UI/forms/AccountEmailForm.vue";
import AccountPasswordForm from "../../../../components/UI/forms/AccountPasswordForm.vue";

export default {
  components: {
    AccountProfileInfoForm,
    AccountEmailForm,
    AccountPasswordForm,
  },
  data() {
    return {
      modalType: "",
    };
  },
  computed: {
    getUserEmail() {
      return this.$store.getters.getUserEmail;
    },
    getIsModalOpen() {
      return this.$store.getters.getIsModalOpen;
    },
  },
  methods: {
    setModal(type) {
      this.$store.dispatch("toggleModal");
      this.setModalType(type);
    },
    setModalType(type) {
      type = type || null;
      switch (type) {
        case "Email":
          this.modalType = "Email";
          break;
        case "Password":
          this.modalType = "Password";
          break;
      }
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
.mt-0 {
  margin-top: 0;
}
.ml-1 {
  margin-left: 1rem;
}
.icon-link {
  transition: var(--global-transition);
  cursor: pointer;
}
.icon-link:hover {
  color: var(--primary-color);
}
</style>
