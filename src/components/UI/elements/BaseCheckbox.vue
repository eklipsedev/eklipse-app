<template>
  <label>
    <div :class="modelValue ? 'checked' : null"></div>
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue ? 'checked' : null"
      :value="title"
      :disabled="disabled"
      @change="$emit('change', !modelValue)"
    />
    <span :class="mode">{{ title }}</span>
  </label>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
    },
  },
  emits: ["change"],
};
</script>

<style scoped>
label {
  display: flex;
  margin-right: 15px;
  padding-left: 20px;
  cursor: pointer;
  
}
div {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  margin-left: -20px;
  margin-top: 0;
  border: 1px solid #dedfe0;
  border-radius: 5px;
  width: 20px;
  min-width: 20px;
  height: 20px;
  transition: var(--global-transition);
  background-position: center;
  background-size: 0%;
}
input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
span {
  display: inline-block;
  cursor: pointer;
  margin-bottom: 5px;
  margin-left: 15px;
  font-size: 0.875rem;
  font-weight: 600;

}
.checked {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  background-image: url("https://uploads-ssl.webflow.com/5ef3e3a7c461c21cad3df40e/5f4aa6e58f8984ec13c241d0_foursquare-check-in%20(1).svg");
  background-size: 60%;
  background-repeat: no-repeat;
}
</style>
