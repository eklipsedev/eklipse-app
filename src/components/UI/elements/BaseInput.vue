<template>
  <label :for="placeholder">{{ placeholder }}{{ required ? '*' : '' }}</label>
  <input
    v-bind="$attrs"
    v-model="fieldValue"
    :type="type"
    :name="name"
    :id="id"
  />
  <div v-if="link && fieldValue" class="link-mask">
    <base-button @click.prevent="$emit('open-link')" class="button--nav">
      <font-awesome-icon
        :icon="['fad', 'external-link']"
        class="fa-md pointer"
      ></font-awesome-icon>
    </base-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldValue: this.value,
    };
  },
  props: {
    value: {
      required: false,
    },
    type: {
      type: String,
      required: true,
      default: "text",
    },
    name: {
      type: String,
      required: true,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    id: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: null,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
};
</script>

<style scoped>
label {
  font-size: 0.75rem;
  font-weight: 600;
  padding-left: 0.75rem;
}
input[type="text"],
input[type="email"],
input[type="password"],
input[type="phone"],
input[type="number"] {
  height: 52px;
  margin-bottom: 0;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: var(--input-bg-color);
  color: var(--input-text-color);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  width: 100%;
  padding: 0.5rem 0.75rem;
  outline: none;
}
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="phone"]:focus,
input[type="number"]:focus {
  border-color: var(--primary-color);
}
input[type="radio"],
input[type="file"] {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
input::placeholder {
  opacity: 0.5;
}
input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
input[type="text"].has-icon,
input[type="email"].has-icon,
input[type="password"].has-icon {
  padding-left: 40px;
}
.link-mask {
  position: absolute;
  top: auto;
  left: auto;
  bottom: 1px;
  right: 1px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  width: 180px;
  padding-right: 12px;
  z-index: 1;
  background-image: linear-gradient(
    to right,
    transparent 40%,
    var(--input-bg-color) 60%
  );
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
