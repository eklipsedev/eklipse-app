<template>
  <div class="cell"><span class="mobile-label">{{ mobileLabel }}{{ mobileLabel ? ':' : null }}</span><slot></slot></div>
</template>

<script>
export default {
  props: ["mobileLabel"],
  computed: {
    classOrder() {
      if (this.$refs.cell) {
        return "long";
      } else if (this.$refs.cell) {
        return "last";
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
.cell {
  display: flex;
  width: 150px;
  padding: 5px 0.5rem;
  justify-content: flex-start;
  align-items: center;
  flex: 0 auto;
  font-size: 0.875rem;
}
.cell.long {
  width: 560px;
  justify-content: flex-start;
  white-space: nowrap;
  overflow: hidden;
}
.cell.long div {
  text-overflow: ellipsis; 
}
.cell.last {
  padding-right: 0.75rem;
  padding-left: 0;
  justify-content: flex-end;
  text-align: right;
}
.cell.paid {
  font-weight: 600;
  color: green;
}
.cell.pending {
  font-weight: 600;
  color: orange;
}
.mobile-label {
  display: none;
}
@media only screen and (max-width: 942px) {
  .mobile-label {
    display: inline-block;
    font-weight: 600;
    font-size: 0.75rem;
    margin-right: 0.75rem;
  }
  .cell {
    margin-bottom: 0.25rem;
  }
  .cell.last {
    position: absolute;
    top: 12px;
    left: auto;
    bottom: auto;
    right: 12px;
  }
}
</style>
