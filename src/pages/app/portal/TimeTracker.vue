<template>
  <div>
    <hero-secondary
      ><heading-to-move level="1" text="Time Tracker"></heading-to-move>
      <p>
        Current Period: <b>{{ getTotalHours }}</b> Hours
      </p></hero-secondary
    >
    <base-section>
      <base-container class="container--vertical">
        <list-header>
          <list-cell class="long">Description</list-cell>
          <list-cell>Date</list-cell>
          <list-cell>Time</list-cell>
          <list-cell>Rate/Hr</list-cell>
          <list-cell class="last">Total</list-cell>
        </list-header>
        <list-transition>
          <list-row
            v-for="(times, index) in getTimes"
            :key="times"
            :data-index="index"
          >
            <list-cell class="long">{{ times.request }} </list-cell>
            <list-cell>{{ getDate(times._fl_meta_.createdDate) }}</list-cell>
            <list-cell>{{ times.hoursLogged }}</list-cell>
            <list-cell>$75</list-cell>
            <list-cell class="last">${{ times.hoursLogged * 75 }}</list-cell>
          </list-row>
        </list-transition>
        <div v-if="getTimesLoading" class="loading-block">
          <base-spinner class="lds-roller secondary"></base-spinner>
        </div>
        <base-empty-state v-if="getTimes.length === 0 && !getTimesLoading">
          <span>No retainer hours to be shown.</span>
        </base-empty-state>
      </base-container>
    </base-section>
  </div>
</template>

<script>
import ModalTypeCheck from "./ModalTypeCheck";
import SetModalType from "./SetModalType";
import SetModalVerbiage from "./SetModalVerbiage";

export default {
  mixins: [ModalTypeCheck, SetModalType, SetModalVerbiage],
  computed: {
    getTimes() {
      return this.$store.getters.getTimes;
    },
    getTimesLoading() {
      return this.$store.getters.getTimesLoading;
    },
    getTotalHours() {
      return this.$store.getters.getTotalHours;
    },
    getInvoiceIsSending() {
      return this.$store.getters.getInvoiceIsSending;
    },
  },
  methods: {
    setModal(type) {
      this.$store.dispatch("toggleModal");
      this.setModalType(type);
    },
    getDate(date) {
      const theDate = date.toDate();
      const theDateDay = theDate.getDate();
      const theDateMonth = theDate.getMonth() + 1;
      const theDateYear = theDate
        .getFullYear()
        .toString()
        .slice(2);
      return `${theDateMonth}/${theDateDay}/${theDateYear}`;
    },
    setTimes() {
      this.$store.dispatch("setTimes");
    },
    createInvoice() {
      this.$store.dispatch("createInvoice");
    },
  },
  created() {
    this.setTimes();
  },
};
</script>

<style scoped>
.loading-block {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}
.space-between {
  margin-bottom: 0.5rem;
}
.ticket--divider {
  height: 1px;
  margin: 1.5rem 0;
  border-top: 2px dashed var(--input-bg-color);
}
</style>
