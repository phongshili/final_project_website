<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("JobSeekersManagementText") }}</label>
    </div>
    <div class="filter">
      <div class="filter-menu">
        <filterButton :items="items"></filterButton>
        <div class="input-group">
          <input
            class="input is-small"
            type="text"
            :placeholder="$t('SearchText')"
          />
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
            <th
              v-if="
                userInfo.type === 'employee' || userInfo.type === 'employer'
              "
              class="tb-small tb-center"
            >
              {{ $t("SubmitDateText") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="
              $router.push({ name: 'Resume', params: { id: seeker._id } })
            "
            v-for="(seeker, index) in seekers"
            :key="index"
          >
            <td class="tb-ss tb-center">
              <span>{{ index + 1 }}</span>
            </td>
            <td class="tb-medium">
              <span>{{ seeker.name }} {{ seeker.lastname }}</span>
            </td>
            <td class="tb-medium">
              <span>{{ seeker.districtName }}</span>
            </td>
            <td class="tb-right">
              <span>{{ seeker.tel }}</span>
            </td>
            <td class="tb-large">
              <span>{{ seeker.email }}</span>
            </td>
            <td class="tb-small">
              <span style="text-transform: uppercase">{{ seeker.status || seeker.jobStatus }}</span>
            </td>
            <td
              v-if="
                userInfo.type === 'employee' || userInfo.type === 'employer'
              "
              class="tb-small"
            >
              <span> {{ seeker.createdAt }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import filterButton from "../../components/filter.vue";
import {  reactive, toRefs } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import store from "../../store";
import { useRoute } from "vue-router";
import useGetUser from "../../hooks/useGetUser";


export default {
  components: { filterButton },
 async setup() {
    const baseUrl = "http://127.0.0.1:4000/";
    const { t } = useI18n();
    const route = useRoute();
    const auth = store.useAuthStore();
    const userInfo = await useGetUser.getUserInfo()  
    let token = auth.getToken;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const dataSet = reactive({
      items: [
        {
          id: 1,
          value: "pending",
          name: t("PendingText"),
        },
        {
          id: 2,
          value: "approve",
          name: t("ApproveText"),
        },
        {
          id: 3,
          value: "reject",
          name: t("RejectText"),
        },
      ],
      seekers: [],
    });
    // need to refactor this code to hook
    const fetchSeekers = async () => {
      const res = await axios.get("http://127.0.0.1:4000/admin-api/seeker-get");

      dataSet.seekers = res.data.mapSeeker; // 👈 get just results
    };
    // need to refactor this code to hook
    // duplicate code
    const fetchSeekerEmp = async () => {
      const res = await axios.get(
       baseUrl + "emp-api/jobapplication-find-id-jobpost/"+ route.params.id,{
        headers
       }
      );

      dataSet.seekers = res.data.mapJobApplication; // 👈 get just results
    };

    if (userInfo.type === "admin" && !route.params.id) fetchSeekers();
    if (userInfo.type === "employee" || userInfo.type === "employer")
      fetchSeekerEmp();

    return { ...toRefs(dataSet),userInfo };
  },
};
</script>

<style lang="scss" scoped>
</style>