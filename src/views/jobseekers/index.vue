<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("JobSeekersManagementText") }}</label>
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
  
        <button class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
    <div class="table-box">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("FullNameText") }}</th>
            <th class="tb-medium">{{ $t("DistrictMenuText") }}</th>
            <th class="tb-medium tb-right">{{ $t("TelText") }}</th>
            <th class="tb-large">{{ $t("EmailText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>

          </tr>
        </thead>
        <tbody>
          <tr 
             @click="$router.push({ name: 'JobSeekersManagement',params:{id:seeker._id} })"
            v-for="(seeker,index) in seekers" :key="index"
            >
            <td class="tb-ss tb-center"><span>{{index +1}}</span></td>
            <td class="tb-medium"><span>{{seeker.name}} {{seeker.lastname}}</span></td>
            <td class="tb-medium">
              <span>{{seeker.districtName}}</span>
            </td>
            <td class="tb-right"><span>{{seeker.tel}}</span></td>
            <td class="tb-large"><span>{{seeker.email}}</span></td>
            <td class="tb-small">
              <span style="text-transform: uppercase;" >{{seeker.status}}</span>
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
          value: "pending",
          name: t('PendingText'),
        },
        {
          id: 2,
          value: "approve",
          name: t('ApproveText'),
        },
        {
          id: 3,
          value: "reject",
          name: t('RejectText'),
        },
      ],
      seekers: [],

    });
    // need to refactor this code to hook
    const fetchSeekers = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/seeker-get"
      );

      dataSet.seekers = res.data.mapSeeker; // 👈 get just results

    };

      fetchSeekers();

    return {...toRefs(dataSet)};
  },
};
</script>

<style lang="scss" scoped>

</style>