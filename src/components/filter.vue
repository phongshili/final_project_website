<template>
  <div class="input-form">
    <div class="input-group">
      <div class="input-area">
        <div class="select" >
          <select class="dropdown" @change="getData" v-model="filteringBy">
            <option value="">{{$t('SelectAllText')}}</option>
            <option
              selected
              v-for="item in items"
              :key="item.value"
              :value="item.value"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    filteringBy: "",
  }),
  methods: {
    getData() {
      this.$emit("getData", this.filteringBy);

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
.input-form{
  padding-right: 10px;
}
</style>