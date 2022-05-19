<template>
  <div>
    <hero-secondary
      ><h1 class="heading-container">
        <heading-to-move level="1" text="Changelog"></heading-to-move></h1
    ></hero-secondary>
    <base-section>
      <base-container class="container--vertical">
        <list-actions>
          <div class="space-between">
            <list-filter
              @click="setFilteredChangelogs"
              @remove-filters="setFilteredChangelogs"
              :filters="filters"
            ></list-filter>
            <base-button
              type="button"
              class="button--commit"
              @click="setModal('Add', index)"
              >Add Task</base-button
            >
          </div>
          <teleport to="body">
            <base-backdrop></base-backdrop>
            <base-modal>
              <base-heading>{{ setModalVerbiage() }} Task</base-heading>
              <changelog-form
                v-if="modalTypeCheck('Add') || modalTypeCheck('Edit')"
                :modalType="setModalVerbiage()"
              ></changelog-form>
              <div v-if="modalTypeCheck('Delete')">
                <p>
                  Are you sure you want to delete this task? This action can't
                  be undone.
                </p>
                <div class="button--actions">
                  <base-button
                    v-if="!getChangelogIsSending"
                    @click="deleteChangelog()"
                    type="submit"
                    class="button"
                    >Delete Task</base-button
                  >
                  <base-button
                    v-if="getChangelogIsSending"
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
          <list-cell class="long">Task</list-cell>
          <list-cell>Type</list-cell>
          <list-cell>Priority</list-cell>
          <list-cell
            >Created<font-awesome-icon
              :icon="['fas', 'arrows-alt-v']"
              class="fa-md ml-5 pointer"
              @click="getChangelogs('Desc')"
            ></font-awesome-icon
          ></list-cell>
          <list-cell>Status</list-cell>
          <list-cell class="last"></list-cell>
        </list-header>
        <list-transition>
          <list-row
            v-for="(changelog, index) in getChangelogs"
            :key="changelog"
            :data-index="index"
          >
            <list-cell class="long" mobileLabel="Details">
              <div class="user-details">
                <span>{{ changelog.title }}</span>
                <span>{{
                  changelog.userRef.firstName + " " + changelog.userRef.lastName
                }}</span>
              </div>
            </list-cell>
            <list-cell mobileLabel="Type"
              ><div class="pill" :class="setChangelogType(changelog.type)">
                {{ changelog.type }}
              </div></list-cell
            >
            <list-cell mobileLabel="Priority"
              ><div
                class="pill"
                :class="setChangelogPriority(changelog.priority)"
              >
                {{ changelog.priority }}
              </div></list-cell
            >
            <list-cell mobileLabel="Created On">{{
              getDate(changelog._fl_meta_.createdDate)
            }}</list-cell>
            <list-cell mobileLabel="Status"
              ><div class="pill" :class="setChangelogStatus(changelog.status)">
                {{ changelog.status }}
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
                        v-if="changelog.status === 'To-Do'"
                        class="button--nav-secondary"
                        @click="setModal('Edit', index)"
                        >View / Edit</base-button
                      >
                    </li>
                    <li>
                      <base-button
                        v-if="changelog.status === 'Done'"
                        class="button--nav-secondary"
                        @click="setModal('Archive', index)"
                        >Archive</base-button
                      >
                    </li>
                    <li>
                      <base-button
                        v-if="changelog.status === 'To-Do'"
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
        <div v-if="getChangelogsLoading" class="loading-block">
          <base-spinner class="lds-roller secondary"></base-spinner>
        </div>
        <base-empty-state
          v-if="getChangelogs.length === 0 && !getChangelogsLoading"
        >
          <span>No changelogs to be shown.</span>
        </base-empty-state>
        <base-button
          v-if="
            !getChangelogsLoading &&
              getChangelogsToFetch &&
              getChangelogs.length !== 0
          "
          @click="setFilteredChangelogs()"
          type="submit"
          class="button--nav-tertiary"
          >Load More</base-button
        >
      </base-container>
    </base-section>
  </div>
</template>

<script>
import ChangelogForm from "../../../components/UI/forms/ChangelogForm.vue";
import ListFilter from "../../../components/UI/lists/ListFilter.vue";
import ModalTypeCheck from "./ModalTypeCheck";
import SetModalType from "./SetModalType";
import SetModalVerbiage from "./SetModalVerbiage";

export default {
  components: {
    ChangelogForm,
    ListFilter,
  },
  mixins: [ModalTypeCheck, SetModalType, SetModalVerbiage],
  data() {
    return {
      modalType: "",
      filters: [
        { name: "type", method: "type", options: ["Bug", "Feature"] },
        {
          name: "priority",
          method: "priority",
          options: ["High", "Medium", "Low"],
        },
        {
          name: "status",
          method: "status",
          options: ["To-Do", "Doing", "Done"],
        },
      ],
    };
  },
  computed: {
    getChangelogs() {
      return this.$store.getters.getChangelogs;
    },
    getChangelogsLoading() {
      return this.$store.getters.getChangelogsLoading;
    },
    getChangelogIsSending() {
      return this.$store.getters.getChangelogIsSending;
    },
    getChangelogsToFetch() {
      return this.$store.getters.getChangelogsToFetch;
    },
  },
  methods: {
    setModal(type, index) {
      this.$store.dispatch("toggleModal");
      this.setModalType(type);
      if (this.modalType === "Add") {
        this.$store.commit("setActiveChangelog", [{}]);
      } else {
        this.$store.commit("setActiveChangelog", [
          { ...this.$store.getters.getChangelog(index), idx: index },
        ]);
      }
    },
    getDate(date) {
      const theDate = date.toDate();
      const theDateDay = theDate.getDate();
      const theDateMonth = theDate.getMonth() + 1;
      const theDateYear = theDate
        .getFullYear()
        .toString()
        .slice(2);
      return `${theDateMonth}/${theDateDay}/${theDateYear}`;
    },
    setChangelogType(type) {
      if (type === "Bug") {
        return "Bug";
      } else if (type === "Feature") {
        return "Feature";
      }
    },
    setChangelogPriority(priority) {
      if (priority === "High") {
        return "high";
      } else if (priority === "Medium") {
        return "medium";
      } else {
        return null;
      }
    },
    setChangelogStatus(status) {
      if (status === "To-Do") {
        return null;
      } else if (status === "Doing") {
        return "doing";
      } else {
        return "done";
      }
    },
    deleteChangelog() {
      this.$store.dispatch("deleteChangelog");
    },
    setFilteredChangelogs(filters) {
      this.$store.dispatch("setFilteredChangelogs", filters);
    },
    setChangelogs() {
      this.$store.dispatch("tryLogin").then(() => {
        this.$store.dispatch("setCompany").then(() => {
          this.$store.dispatch("setCompanyRef").then(() => {
            this.$store.dispatch("setFilteredChangelogs");
          });
        });
      });
    },
  },
  created() {
    this.setChangelogs();
  },
};
</script>

<style scoped>
.ml-5 {
  margin-left: 0.5rem;
}
.pointer {
  cursor: pointer;
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
.pill {
  padding: 0 8px;
  border-radius: 4px;
  background-color: lightgray;
  font-size: 0.75rem;
  font-weight: 600;
}
.medium,
.doing {
  color: var(--color-white);
  background-color: orange;
}
.high {
  color: var(--color-white);
  background-color: red;
}
.to-do {
  background-color: lightgray;
}
.done {
  color: var(--color-white);
  background-color: green;
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
