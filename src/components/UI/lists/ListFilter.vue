<template>
  <div class="filters-wrapper">
    <div class="filters">
      <base-dropdown
        v-for="(filter, filterIndex) in filters"
        :key="filterIndex"
        class="mr-5"
        ><template #toggle>
          <base-button class="button--nav-tertiary">
            {{ filter.name.charAt(0).toUpperCase() + filter.name.slice(1) }}
          </base-button>
        </template>
        <template #nav>
          <base-list
            ><li
              v-for="(option, optionIndex) in filter.options"
              :key="optionIndex"
            >
              <base-button
                class="button--nav-secondary"
                :class="
                  theFilters[filterIndex].option === option ? 'active' : null
                "
                @click="
                  setFiltersArray(
                    option,
                    filters[filterIndex].method,
                    filters[filterIndex].name,
                    filterIndex
                  );
                  $emit('click', theFilters);
                "
                >{{ option }}</base-button
              >
            </li>
          </base-list>
        </template>
      </base-dropdown>
    </div>
    <ul v-if="theFilters.length" class="filters ml-5">
      <li v-for="(filter, index) in theFilters" :key="index">
        <base-pill
          v-if="(filter.option !== null) & (filter.method !== null)"
          class="mb-0"
          :content="filter.option"
          @click="
            clearFiltersArray(index);
            $emit('removeFilters', theFilters);
          "
        ></base-pill>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["filters"],
  emits: ["click", "removeFilters"],
  data() {
    return {
      theFilters: [],
    };
  },
  methods: {
    setFiltersArray(option, method, name, filterIndex) {
      if (this.theFilters[filterIndex]) {
        this.theFilters.splice(filterIndex, 1, {
          name: name,
          option: option,
          method: method,
        });
      } else {
        this.theFilters.push({
          name: name,
          option: option,
          method: method,
        });
      }
    },
    clearFiltersArray(filterIndex) {
      if (this.theFilters[filterIndex]) {
        this.theFilters.splice(filterIndex, 1, {
          name: null,
          option: null,
          method: null,
        });
      }
      console.log(this.theFilters);
    },
    pushFilters() {
      this.filters.forEach(() => {
        this.theFilters.push({ option: null, name: null, method: null });
      });
      console.log(this.theFilters);
    },
  },
  created() {
    this.pushFilters();
  },
};
</script>

<style scoped>
.filters-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.filters {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.mb-0 {
  margin-bottom: 0;
}
.button--nav-tertiary.clear-filter {
  color: var(--color-black);
  background-color: transparent;
}
.button--nav-tertiary.clear-filter:hover {
  color: var(--color-black);
  background-color: var(--input-bg-color);
}
</style>
