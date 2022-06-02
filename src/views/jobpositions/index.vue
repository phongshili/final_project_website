<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("JobPositionsManagementText") }}</label>
    </div>
    <div class="filter is-small-tb">
      <div class="filter-menu">
        <filterButton :items="items"></filterButton>
          <div class="input-group">
          <input class="input is-small" type="text" placeholder="Small input" />
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
    
            <th class="tb-small tb-center">{{ $t("ToolsText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tb-ss tb-center"><span>1</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>company1</span></td>
           
            <td class="tb-small">
              <div class="tools">
                <i class="fa-solid fa-pen-to-square edit-tool"></i
                ><i class="fa-solid fa-xmark delete-tool"></i>
              </div>
            </td>
          </tr>
          <tr>
            <td class="tb-ss tb-center"><span>2</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>company1</span></td>
           
            <td class="tb-small">
              <div class="tools">
                <i class="fa-solid fa-pen-to-square edit-tool"></i
                ><i class="fa-solid fa-xmark delete-tool"></i>
              </div>
            </td>
          </tr>
          <tr>
            <td class="tb-ss tb-center"><span>3</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>company1</span></td>
        
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
import filterButton from "../../components/filter.vue"
export default {
    components: {
    filterButton,
  },
    data: () => ({
    items:[{
      id:1,
      value:"IT"
    },
    {
      id:2,
      value:"Dev"
    },
    {
      id:1,
      value:"WebDev"
    }]
  }),
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;

}
</style>