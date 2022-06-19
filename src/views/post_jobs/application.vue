<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("ApplicationApply") }}</label>
    </div>
    <div class="filter">
      <div class="filter-menu">
         <button @click="$router.go(-1)" class="button is-danger">{{ $t("BackText") }}</button>
         <div class="spacer"></div>
        <filterButton :items="items"></filterButton>
         
      </div>
      <div class="btn-menu">
        <button class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
    <div class="table-box">
      <table  >
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("FullNameText") }}</th>
            <th class="tb-medium">{{ $t("CurrentProvinceText") }}</th>
            <th class="tb-medium tb-right">{{ $t("TelText") }}</th>
            <th class="tb-medium">{{ $t("EmailText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>

            <th class="tb-small tb-center">{{ $t("PostDateText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="$router.push({ name: 'Resume',params: {id:application._id}})"
           v-for="(application, index) in applications" :key="index">
            <td class="tb-ss tb-center">
              <span>{{ index + 1 }}</span>
            </td>
            <td class="tb-medium">
              <span>{{application.name}} {{ application.lastname}}</span>
            </td>
            <td class="tb-medium">
              <span>{{ application.provinceName }}</span>
            </td>
            <td class="tb-right">
              <span> {{application.tel}}</span>
            </td>
                  <td class="tb-medium">
              <span>{{ application.email }}</span>
            </td>
              <td class="tb-small">
              <span style="text-transform: uppercase"> {{application.jobStatus}}</span>
            </td>

            <td class="tb-small">
              <span> {{ application.createdAt }}</span>
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
import { useI18n } from 'vue-i18n'
import store from "../../store";
import {useRoute,useRouter} from "vue-router"
export default {
  components: { filterButton },
  setup() {
    const {t} = useI18n()
    const baseUrl = "http://127.0.0.1:4000/";
    const auth = store.useAuthStore();
    let token = auth.getToken;
    const route = useRoute();
    const router = useRouter();
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
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
      applications: [],

    });
    // need to refactor this code to hook
    const fetchApplications = async () => {
      const res = await axios.get(
       baseUrl + "emp-api/jobapplication-find-id-jobpost/"+ route.params.id,{
        headers
       }
      );

      dataSet.applications = res.data.mapJobApplication; // 👈 get just results

    };

      fetchApplications();

    return {...toRefs(dataSet)};
  },
};
</script>

<style lang="scss" scoped>

</style>