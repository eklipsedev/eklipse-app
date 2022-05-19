<template>
  <div class="auth--container">
    <slot></slot>
  </div>
</template>

<style scoped>
.auth--container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black);
}
::v-deep(.auth--content) {
  display: flex;
  width: 400px;
  max-width: 90vw;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: center;
}
::v-deep(.auth--logo) {
  display: flex;
  width: 120px;
  margin-right: auto;
  margin-bottom: var(--spacing-secondary);
  margin-left: auto;
  justify-content: center;
  align-items: center;
}
::v-deep(.auth--heading) {
  margin-bottom: 20px;
  font-size: 30px;
  line-height: 38px;
  color: var(--color-white);
}
::v-deep(.auth--form-body) {
  display: flex;
  width: 100%;
  margin-bottom: var(--spacing-secondary);
  padding: var(--spacing-secondary);
  flex-direction: column;
  border-radius: 20px;
  background-color: var(--color-white);
}
::v-deep(.auth--form-wrapper) {
  max-width: 24rem;
  margin-bottom: 0;
}
::v-deep(.auth--form) {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
}
::v-deep(.auth--error) {
  margin-top: 5px;
  padding-left: 10px;
  color: var(--error-color);
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
}
::v-deep(.auth--lower-link) {
  margin-top: var(--spacing-secondary);
  color: var(--color-black);
  font-size: 0.75rem;
}
::v-deep(.login__actions) {
  display: flex;
  padding-right: var(--spacing-secondary);
  padding-left: var(--spacing-secondary);
  flex-direction: column;
  align-items: center;
  color: var(--color-white);
}
::v-deep(input[type="email"], input[type="password"]) {
  padding-left: 40px;
}
</style>
