<template>
  <base-form @submit.prevent="submitForm">
    <div class="form-row form-row__2-col">
      <div class="form-cell">
        <base-input
          type="text"
          name="USER_FIRST_NAME"
          placeholder="First Name"
          id="USER_FIRST_NAME"
          :value="getUserFirstName"
          v-model.trim="user.firstName.val"
          @blur="clearValidity('firstName')"
        ></base-input>
        <base-form-error
          v-if="!user.firstName.isValid"
          errorMessage="First name is required"
        ></base-form-error>
      </div>
      <div class="form-cell">
        <base-input
          type="text"
          name="USER_LAST_NAME"
          placeholder="Last Name"
          id="USER_LAST_NAME"
          :value="getUserLastName"
          v-model.trim="user.lastName.val"
          @blur="clearValidity('lastName')"
        ></base-input>
        <base-form-error
          v-if="!user.lastName.isValid"
          errorMessage="Last name is required"
        ></base-form-error>
      </div>
    </div>
    <div class="form-row form-row__2-col">
      <div class="form-cell">
        <base-input
          type="text"
          name="USER_EMAIL"
          placeholder="Email"
          id="USER_EMAIL"
          :value="getUserEmail"
          v-model.trim="user.email.val"
          @blur="clearValidity('email')"
        ></base-input>
        <base-form-error
          v-if="!user.email.isValid"
          errorMessage="Email is required"
        ></base-form-error>
      </div>
      <div class="form-cell">
        <base-input
          type="text"
          name="USER_PHONE"
          placeholder="Phone"
          id="USER_Phone"
          :value="getUserPhone"
          v-model.trim="user.phone.val"
          @blur="clearValidity('phone')"
        ></base-input>
        <base-form-error
          v-if="!user.phone.isValid"
          errorMessage="Phone is required"
        ></base-form-error>
      </div>
    </div>
    <div class="form-row form-row__2-col">
      <div class="form-cell">
        <base-input
          type="text"
          name="USER_COMPANY"
          placeholder="Company"
          id="USER_COMPANY"
          :value="getUserCompanyName"
          disabled
        ></base-input>
      </div>
      <div class="form-cell">
        <base-select
          fieldName="Role"
          :default="isActiveUserSet(user.permission.val)"
          :options="permissions"
          @selected-option="setSelectedRole($event)"
        ></base-select>
        <base-form-error
          v-if="!user.permission.isValid"
          errorMessage="Role is required"
        ></base-form-error>
      </div>
    </div>
    <div class="form-row last">
      <base-checkbox
        title="Enabled"
        v-model="getUserEnabled"
        @change="checkboxChange()"
      ></base-checkbox>
    </div>
    <div class="ticket--divider"></div>
    <base-button v-if="!isSending" type="submit"
      >{{ modalType }} User</base-button
    >
    <base-button v-if="isSending" type="button" class="button--mr-auto" disabled
      >{{ modalType === "Add" ? "Adding" : "Updating" }}...<base-spinner
        size="0.2"
      ></base-spinner
    ></base-button>
    <div v-if="error" class="form--error">
      There was an error!
    </div>
  </base-form>
</template>

<script>
import { db } from "../../../../db.js";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeItem: {
      type: Array,
      required: false,
    },
    company: {
      type: Object,
      required: true,
    },
    modalType: {
      type: String,
      required: true,
    },
  },
  emits: ["isModalOpen", "addToList", "updateItem", "addItem"],
  data() {
    return {
      user: {
        firstName: {
          val: "",
          isValid: true,
        },
        lastName: {
          val: "",
          isValid: true,
        },
        email: {
          val: "",
          isValid: true,
        },
        phone: {
          val: "",
          isValid: true,
        },
        permission: {
          val: "",
          isValid: true,
        },
        enabled: {
          checked:  this.getActiveUserength
            ? this.getUserEnabled === "Yes"
              ? true
              : false
            : true, 
        },
      },
      permissions: [],
      isSending: false,
      isSent: false,
      error: "",
    };
  },
  computed: {
    getUserFirstName: {
      get() {
        return this.$store.getters.getUserFirstName;
      },
      set(value) {
        this.$store.commit("updateUserFirstName", value);
      },
    },
    getUserLastName: {
      get() {
        return this.$store.getters.getUserLastName;
      },
      set(value) {
        this.$store.commit("updateUserLastName", value);
      },
    },
    getUserEmail: {
      get() {
        return this.$store.getters.getUserEmail;
      },
      set(value) {
        this.$store.commit("updateUserEmail", value);
      },
    },
    getUserPhone: {
      get() {
        return this.$store.getters.getUserPhone;
      },
      set(value) {
        this.$store.commit("updateUserPhone", value);
      },
    },
    getUserPermission: {
      get() {
        return this.$store.getters.getUserPermission;
      },
      set(value) {
        this.$store.commit("updateUserPermission", value);
      },
    },
    getUserEnabled: {
      get() {
        return this.$store.getters.getUserEnabled;
      },
      set(value) {
        this.$store.commit("updateUserEnabled", value);
      },
    },
    getActiveUser() {
      return this.$store.getters.getActiveUser;
    },
    getActiveUserLength() {
      return this.$store.getters.getActiveUserLength;
    },
  },
  methods: {
    getPermissions() {
      db.collection("fl_permissions")
        .get()
        .then((permissions) => {
          permissions.forEach((doc) => {
            const name = doc.data().name;
            if (name !== "Super Admin") {
              this.permissions.push(name);
            }
          });
        });
    },
    checkboxChange() {
      this.user.enabled.checked = !this.user.enabled.checked;
    },
    setSelectedRole(selectedRole) {
      this.getUserPermission = selectedRole;
      this.clearValidity("permission");
    },
    setValue(prop, val) {
      return prop ? prop : val;
    },
    isActiveUserSet(arg, alt = "") {
      return this.getActiveUserLength ? arg : alt;
    },
    clearValidity(input) {
      this.user[input].isValid = true;
    },
    formCheck(arg, input) {
      if (arg) {
        this.user[input].isValid = false;
        return false;
      } else {
        return true;
      }
    },
    validateCreds() {
      this.formCheck(!this.getUserFirstName.length > 0, "firstName");
      this.formCheck(!this.getUserLastName.length > 0, "lastName");
      this.formCheck(!this.getUserEmail.length > 0, "email");
      this.formCheck(!this.getUserPhone.length > 0, "phone");
      this.formCheck(this.getUserPermission === null, "permission");

      if (
        this.formCheck(!this.getUserFirstName.length > 0, "firstName") &&
        this.formCheck(!this.getUserLastName.length > 0, "lastName") &&
        this.formCheck(!this.getUserEmail.length > 0, "email") &&
        this.formCheck(!this.getUserPhone.length > 0, "phone") &&
        this.formCheck(this.getUserPermission === null, "permission")
      ) {
        return true;
      } else {
        return false;
      }
    },
    submitForm() {
      this.validateCreds();

      if (!this.validateCreds()) {
        return;
      }

      this.isSending = true;

      let permission;

      if (this.user.permission.val === "Admin") {
        permission = "khbnZauzUMGeYy8fqnQu";
      } else if (this.user.permission.val === "Non-Admin") {
        permission = "IScFcVwkfBGzSnVdhJlH";
      } else {
        permission = "1";
      }

      if (this.modalType === "Add") {
        this.$store.dispatch("addUser", {
          firstName: this.user.firstName.val,
          lastName: this.user.lastName.val,
          email: this.user.email.val,
          phone: this.user.phone.val,
          enabled: this.user.enabled.checked,
          permissionId: permission,
        });
      } else {
        this.$store.dispatch("updateUser", {
          firstName: this.user.firstName.val,
          lastName: this.user.lastName.val,
          email: this.user.email.val,
          phone: this.user.phone.val,
          enabled: this.user.enabled.checked,
          permissionId: permission,
        });
      }
    },
  },
  created() {
    this.getPermissions();
  },
};
</script>

<style scoped>
.ticket--upload {
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
}
.ticket--uploads {
  display: flex;
  flex-wrap: wrap;
  margin-left: 2rem;
  align-items: center;
  align-content: flex-start;
  flex: 1;
}
.ticket--required {
  font-size: 0.875rem;
  font-weight: 500;
}
.ticket--divider {
  height: 1px;
  margin: 1.5rem 0;
  border-top: 2px dashed var(--input-bg-color);
}
input[type="file"] {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.nav--link {
  border-radius: 10px;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  font-weight: 600;
  text-align: center;
  font-size: 0.875rem;
}
.nav--link:hover {
  background-color: var(--secondary-color);
}
.mr-5 {
  margin-right: 0.5rem;
}
</style>
