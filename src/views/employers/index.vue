<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("EmployersManagementText") }}</label>
    </div>
    <div class="filter">
      <div class="filter-menu">
        <filterButton :items="items"></filterButton>
        <div class="input-group">
          <input class="input is-small" type="text" :placeholder="$t('SearchText')" />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div class="btn-menu">
        <button
          class="button is-success"
          @click="$router.push({ name: 'EmployerManagement' })"
        >
          {{ $t("AddEmployerText") }}
        </button>
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
          <tr @click="$router.push({ name: 'EmployerManagement' })"
          v-for="(emp, index) in employers" :key="index"
          >
            <td class="tb-ss tb-center"><span>{{index+1}}</span></td>
            <td class="tb-medium"><span>{{emp.companyName}}</span></td>
            <td class="tb-medium">
              <span>{{emp.provinceName}}</span>
            </td>
            <td class="tb-right"><span>{{emp.tel}}</span></td>
            <td class="tb-large"><span>{{emp.email}}</span></td>
            <td class="tb-small">
              <span>{{emp.status}}</span>
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
import filterButton from "../../components/filter.vue";
import { ref, reactive, toRefs } from "vue";
import axios from "axios";
import { useI18n } from 'vue-i18n'
export default {
  components: { filterButton },
  setup() {
    const {t} = useI18n()
    const dataSet = reactive({
      items: [
        {
          id: 1,
          value: "online",
          name: t('OnlineText'),
        },
        {
          id: 2,
          value: "office",
          name: t('OfflineText'),
        },
        {
          id: 3,
          value: "expired",
          name: t('ExpiredText'),
        },
      ],
      employers: [{}],

    });
    // need to refactor this code to hook
    const fetchEmployer = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/employee-get"
      );

      dataSet.employers = res.data.mapEmp; // 👈 get just results

    };
      fetchEmployer();

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