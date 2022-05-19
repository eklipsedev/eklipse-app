<template>
  <div>
    <label :for="fieldName">{{ fieldName }}</label>
    <div class="custom-select" @blur="open = false" v-bind="$attrs">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ selected }}
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('selectedOption', option);
          "
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fieldName: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  emits: ["selectedOption"],
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("selectedOption", this.selected);
  },
};
</script>

<style scoped>
label {
  font-size: 0.75rem;
  font-weight: 600;
  padding-left: 0.75rem;
}
.custom-select {
  position: relative;
  cursor: pointer;
}

.custom-select .selected {
  position: relative;
  display: flex;
  align-items: center;
  height: 52px;
  margin-bottom: 0;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: var(--input-bg-color);
  color: var(--input-text-color);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  padding: 0.5rem 0.75rem;
  outline: none;
}

.custom-select .selected.open {
  border: 1px solid var(--primary-color);
  border-radius: 10px 10px 0 0;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: var(--input-text-color) transparent transparent transparent;
}

.custom-select .items {
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid var(--primary-color);
  border-left: 1px solid var(--primary-color);
  border-bottom: 1px solid var(--primary-color);
  position: absolute;
  background-color: var(--input-bg-color);
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  padding: 0.5rem 0.75rem;
  min-height: 40px;
  cursor: pointer;
  user-select: none;
  color: var(--input-text-color);
  font-weight: 500;
}

.custom-select .items div:hover {
  background-color: var(--secondary-color);
}

.selectHide {
  display: none;
}
</style>
