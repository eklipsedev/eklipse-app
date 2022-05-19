<template>
  <div>
    <label :for="fieldName"
      >{{ fieldPlaceholder }}{{ required ? "*" : "" }}</label
    >
    <textarea
      v-bind="$attrs"
      v-model="fieldValue"
      :name="fieldName"
      :id="fieldId"
    ></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldValue: this.value,
      fieldName: this.name,
      fieldPlaceholder: this.placeholder,
      fieldId: this.id,
    };
  },
  props: {
    value: {
      required: false,
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
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
label {
  font-size: 0.75rem;
  font-weight: 600;
  padding-left: 0.75rem;
  margin-bottom: 0.25rem;
}
textarea {
  height: 200px;
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
textarea:focus {
  border-color: var(--primary-color);
}
textarea::placeholder {
  opacity: 0.5;
}
</style>
