<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("EmployersManagementText") }}</label>
    </div>
    <div class="filter">
      <div class="filter-menu">
        <filterButton :items="items"></filterButton>
          <div class="input-group">
          <input class="input is-small" type="text" placeholder="Small input" />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div class="btn-menu">
        <button class="button is-success"  @click="$router.push({ name: 'EmployerManagement' })">{{$t("AddEmployerText")}}</button>
        <button class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
    <div class="table-box">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("CompanyNameText") }}</th>
            <th class="tb-medium">{{ $t("LocationText") }}</th>
            <th class="tb-medium tb-right">{{ $t("TelText") }}</th>
            <th class="tb-large">{{ $t("EmailText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>
            <th class="tb-small tb-center">{{ $t("OptionsText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="$router.push({ name: 'EmployerManagement' })">
            <td class="tb-ss tb-center"><span>1</span></td>
            <td class="tb-medium"><span>company1</span></td>
            <td class="tb-medium">
              <span>ນະຄອນຫລວງວຽງຈັນ</span>
            </td>
            <td class="tb-right"><span>32365236</span></td>
            <td class="tb-large"><span>emp1@gmail.com</span></td>
            <td class="tb-small">
              <span>approve</span>
            </td>
            <td class="tb-small">
              <div class="tools">
                <i class="fa-solid fa-pen-to-square edit-tool"></i
                ><i class="fa-solid fa-xmark delete-tool"></i>
              </div>
            </td>
          </tr>
          <tr>
            <td class="tb-ss tb-center"><span>2</span></td>
            <td class="tb-medium"><span>company1</span></td>
            <td class="tb-medium">
              <span>ນະຄອນຫລວງວຽງຈັນ</span>
            </td>
            <td class="tb-right"><span>32365236</span></td>
            <td class="tb-large"><span>emp1@gmail.com</span></td>
            <td class="tb-small">
              <span>approve</span>
            </td>
            <td class="tb-small">
              <div class="tools">
                <i class="fa-solid fa-pen-to-square edit-tool"></i
                ><i class="fa-solid fa-xmark delete-tool"></i>
              </div>
            </td>
          </tr>
          <tr>
            <td class="tb-ss tb-center"><span>3</span></td>
            <td class="tb-medium"><span>company1</span></td>
            <td class="tb-medium">
              <span>ນະຄອນຫລວງວຽງຈັນ</span>
            </td>
            <td class="tb-right"><span>32365236</span></td>
            <td class="tb-large"><span>emp1@gmail.com</span></td>
            <td class="tb-small">
              <span>approve</span>
            </td>
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
      value:"Approve"
    },
    {
      id:2,
      value:"Pendding"
    },
    {
      id:1,
      value:"Reject"
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