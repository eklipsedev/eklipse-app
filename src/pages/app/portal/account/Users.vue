<template>
  <div>
    <hero-secondary
      ><heading-to-move level="1" text="Users"></heading-to-move
    ></hero-secondary>
    <base-section>
      <base-container class="container--vertical">
        <list-actions>
          <div class="space-between">
            <list-filter
              @click="setFilteredUsers"
              @remove-filters="setFilteredUsers"
              :filters="filters"
            ></list-filter>
            <base-button type="button" class="button" @click="setModal('Add')"
              >Add User</base-button
            >
          </div>
          <teleport to="body">
            <base-backdrop></base-backdrop>
            <base-modal>
              <base-heading :subText="null">{{ modalType }} User</base-heading>
              <add-user-form
                v-if="modalTypeCheck('Add') || modalTypeCheck('Edit')"
                :modalType="modalType"
              ></add-user-form>
              <div v-if="modalTypeCheck('Delete')">
                <p>
                  Are you sure you want to delete
                  <b>{{
                    getActiveUser.firstName + " " + getActiveUser.lastName
                  }}</b
                  >? This action can't be undone.
                </p>
                <div class="button--actions">
                  <base-button
                    v-if="!isSending"
                    @click="deleteUser()"
                    type="submit"
                    class="button"
                    >Delete {{ getActiveUser.firstName }}</base-button
                  >
                  <base-button
                    v-if="isSending"
                    type="button"
                    class="button"
                    disabled
                    >Deleting...<base-spinner size="0.2"></base-spinner
                  ></base-button>
                </div>
              </div>
            </base-modal>
          </teleport>
        </list-actions>
        <list-header>
          <list-cell class="long">User</list-cell>
          <list-cell>Phone</list-cell>
          <list-cell>Role</list-cell>
          <list-cell>Created</list-cell>
          <list-cell>Status</list-cell>
          <list-cell class="last"></list-cell>
        </list-header>
        <list-transition>
          <list-row
            v-for="(user, index) in getUsers"
            :key="user"
            :data-index="index"
          >
            <list-cell class="long"
              ><font-awesome-icon
                :icon="['fad', 'user-circle']"
                class="fa-2x mr-1"
              ></font-awesome-icon>
              <div class="user-details">
                <span>{{
                  user.userRef.firstName + " " + user.userRef.lastName
                }}</span>
                <span>{{ user.userRef.email }}</span>
              </div>
            </list-cell>
            <list-cell>{{ user.phone }}</list-cell>
            <list-cell>{{ user.userRef.permissions.name }}</list-cell>
            <list-cell>8/4/21</list-cell>
            <list-cell
              ><div class="pill">
                {{ user.enabled === "Yes" ? "Enabled" : "Disabled" }}
              </div>
            </list-cell>
            <list-cell class="last"
              ><base-dropdown
                ><template #toggle>
                  <base-button class="button--nav">
                    <font-awesome-icon
                      :icon="['fas', 'ellipsis-h']"
                      class="fa-lg icon-link"
                    ></font-awesome-icon>
                  </base-button>
                </template>
                <template #nav>
                  <base-list
                    ><li>
                      <base-button
                        class="button--nav-secondary"
                        @click="setModal('Edit', index)"
                        >Edit</base-button
                      >
                    </li>
                    <li>
                      <base-button
                        class="button--nav-secondary"
                        @click="setModal('Delete', index)"
                        >Delete</base-button
                      >
                    </li></base-list
                  >
                </template>
              </base-dropdown></list-cell
            >
          </list-row>
        </list-transition>
        <div v-if="getUsersLoading" class="loading-block">
          <base-spinner class="lds-roller secondary"></base-spinner>
        </div>
        <base-empty-state v-if="getUsers.length === 0 && !getUsersLoading">
          <span>No users to be shown.</span>
        </base-empty-state>
        <base-button
          v-if="!getUsersLoading && getUsersToFetch && getUsers.length !== 0"
          @click="setFilteredUsers()"
          type="submit"
          class="button--nav-tertiary"
          >Load More</base-button
        >
      </base-container>
    </base-section>
  </div>
</template>

<script>
import AddUserForm from "../../../../components/UI/forms/AddUserForm.vue";
import ListFilter from "../../../../components/UI/lists/ListFilter.vue";
import ModalTypeCheck from "../ModalTypeCheck";
import SetModalType from "../SetModalType";
import SetModalVerbiage from "../SetModalVerbiage";

export default {
  components: {
    AddUserForm,
    ListFilter,
  },
  mixins: [ModalTypeCheck, SetModalType, SetModalVerbiage],
  data() {
    return {
      modalType: "",
      filters: [
        {
          name: "role",
          method: "permissions.name",
          options: ["Super-Admin", "Admin", "Non-Admin"],
        },
        { name: "status", method: "enabled", options: ["Enabled", "Disabled"] },
      ],
    };
  },
  computed: {
    getUsers() {
      return this.$store.getters.getUsers;
    },
    getActiveUser() {
      return this.$store.getters.getActiveUser;
    },
    getUserIsSending() {
      return this.$store.getters.getUserIsSending;
    },
    getUsersLoading() {
      return this.$store.getters.getUsersLoading;
    },
    getUsersToFetch() {
      return this.$store.getters.getUsersToFetch;
    },
  },
  methods: {
    setModal(type, index) {
      this.$store.dispatch("toggleModal");
      this.setModalType(type);
      if (this.modalType === "Add") {
        this.$store.commit("setActiveUser", []);
      } else {
        this.$store.commit("setActiveUser", [
          { ...this.$store.getters.getUser(index), idx: index },
        ]);
      }
    },
    setFilteredUsers(filters) {
      this.$store.dispatch("setFilteredUsers", filters);
    },
  },
  created() {
    this.$store.dispatch("setFilteredUsers");
  },
};
</script>

<style scoped>
.pill {
  padding: 0 8px;
  border-radius: 4px;
  background-color: lightgray;
  font-size: 0.75rem;
  font-weight: 600;
}
.user-details {
  display: flex;
  flex-direction: column;
}
.user-details span:nth-child(1) {
  font-weight: 500;
  line-height: 1.5;
}
.user-details span:nth-child(2) {
  font-size: 0.75rem;
  line-height: 1.5;
}
.button--actions {
  margin-top: 2rem;
}
.loading-block {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}
.space-between {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}
.mr-1 {
  margin-right: 1rem;
}
.ml-5 {
  margin-left: 0.5rem;
}
.pointer {
  cursor: pointer;
}
.list-leave-active {
  position: absolute;
  transition: all 0.2s;
}
.list-leave-from {
  opacity: 1;
}
.list-leave-to {
  opacity: 0;
}
.list-move {
  transition: transform 0.2s;
}
</style>
