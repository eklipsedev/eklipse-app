<template>
  <div class="card">
    <div class="card--header-wrapper">
      <div class="icon-container">
        <font-awesome-icon :icon="icon" class="fa-lg"></font-awesome-icon>
      </div>
      <h3 class="card--heading">{{ title }}</h3>
    </div>
    <p class="p--small">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "icon"],
};
</script>

<style scoped>
.card {
  position: relative;
  height: 100%;
  padding: var(--spacing-secondary);
  border: 3px solid transparent;
  border-radius: 20px;
  background-color: var(--input-bg-color);
  color: var(--color-black);
  cursor: pointer;
  transition: var(--global-transition);
}
.card:hover {
  color: var(--tertiary-color);
  border-color: var(--tertiary-color);
}
.card.card--active {
  color: var(--primary-color);
  border-color: var(--primary-color);
}
.card--header-wrapper {
  display: flex;
  margin-bottom: var(--spacing-secondary);
  align-items: center;
}
.card--heading {
  margin-bottom: 0;
  margin-left: calc(var(--spacing-secondary) / 2);
}
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: var(--primary-color);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin-right: 0.5rem;
}
@media only screen and (max-width: 991px) {
  .icon-container {
    height: 2rem;
    width: 2rem;
    font-size: 0.7rem;
  }
}
</style>
