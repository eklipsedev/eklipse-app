<template>
  <form class="form"><slot></slot></form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  flex: 1;
}
::v-deep(.form-cell) {
  page-break-inside: avoid;
}
::v-deep(.form-row__2-col .form-cell) {
    width: 47%;
}
::v-deep(.form-row) {
  position: relative;
  text-align: left;
  margin-bottom: 1rem;
}
::v-deep(.form-row.last) {
  position: relative;
  text-align: left;
  margin: 1rem auto 0 0;
}
::v-deep(.form-row.form-row__2-col) {
    display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 600px) {
  ::v-deep(.form-row.form-row__2-col) {
    flex-direction: column;
    margin-bottom: 0;
  }
  ::v-deep(.form-row__2-col .form-cell) {
    width: 100%;
    margin-bottom: 1rem;
  }
}
::v-deep(.form-icon) {
  position: absolute;
  left: 12px;
  top: 42px;
  right: auto;
  bottom: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.form-icon.password) {
  right: 12px;
  left: auto;
  cursor: pointer;
}
::v-deep(button[type="submit"]) {
    margin-right: auto;
}
::v-deep(button[type="submit"].full) {
    margin-right: auto;
}
.container--vertical {
  max-width: 1024px;
  flex-direction: column;
  align-items: stretch;
}
</style>
