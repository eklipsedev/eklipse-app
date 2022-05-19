<template>
  <header class="header--container">
    <h2 class="header--heading">
      <span class="underscore underscore--secondary"><slot></slot></span>
    </h2>
    <p v-if="subText" class="p--small">
      {{ subText }}
    </p>
  </header>
</template>

<script>
export default {
  props: ["subText"],
};
</script>

<style scoped>
.header--container {
  margin-bottom: 2rem;
}
.header--heading {
  font-size: 30px;
  line-height: 40px;
}
.underscore.underscore--secondary {
  border-bottom-width: 5px;
}
</style>
