<template>
  <div class="test">
    <div
      class="dropdown"
      @click="isDropDown"
      :class="{ 'is-active': isActive }"
    >
      <div class="dropdown-trigger">
        <button
          class="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu3"
        >
          <div class="filterText">
            <span><i class="fa-solid fa-filter"></i><label>Filter By</label></span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </div>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu3" role="menu">
        <div class="dropdown-content">
          <a
            href="#"
            class="dropdown-item"
            v-for="item in items"
            :key="item.id"
          >
            {{ item.value }}
          </a>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    isActive: false,
    filteringBy: "",
  }),
  methods: {
    isDropDown() {
      this.isActive = !this.isActive;
    },
  },
  props: {
    items: {
      type: [Array, Object],
    },
  },

};
</script>

<style lang="scss" scoped>
.filterText{
    display:flex;
    label{
        padding-left: 10px;
    }
}
button {
  margin-right: 10px;
}
</style>