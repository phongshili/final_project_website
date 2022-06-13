<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("JobPositionsManagementText") }}</label>
    </div>
    <div class="filter is-small-tb">
      <div class="filter-menu">
          <div class="input-group">
          <input class="input is-small" type="text" :placeholder="$t('AddPositionInputText')" />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div class="btn-menu">
        <button class="button is-success">{{$t("AddPositionText")}}</button>
        <button class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
    <div class="table-box is-small-tb">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("PositionText") }}</th>
              <th class="tb-small">{{ $t("TotalPositionPosted") }}</th>
    
            <th class="tb-small tb-center">{{ $t("OptionsText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(position,index) in positions" :key="index">
            <td class="tb-ss tb-center"><span>{{index+1}}</span></td>
            <td class="tb-small"><span>{{position.name}}</span></td>
            <td class="tb-small"><span>{{position.__v}}</span></td>
            <td class="tb-small">
              <div class="tools">
                <i class="fa-solid fa-pen-to-square edit-tool"></i
                ><i class="fa-solid fa-xmark delete-tool"></i>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import filterButton from "../../components/filter.vue";
import { ref, reactive, toRefs } from "vue";
import axios from "axios";
export default {
  components: { filterButton },
  setup() {
    const dataSet = reactive({
     
      positions: [{}],

    });
    // need to refactor this code to hook
    const fetchPositions = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/position-get"
      );

      dataSet.positions = res.data.getPosition; // 👈 get just results

    };
      fetchPositions();

    return {...toRefs(dataSet)};
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;

}
</style>