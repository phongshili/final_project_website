<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
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
        <button class="button is-success" @click="$router.push({ name: 'JobPostManagement' })" >POST JOB</button>
        <button class="button is-link">EXPORT</button>
      </div>
    </div>
    <div class="table-box">
      <table >
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("PositionText") }}</th>
            <th class="tb-medium">{{ $t("LocationText") }}</th>
            <th class="tb-medium tb-right">{{ $t("CompanyNameText") }}</th>
            <th class="tb-medium">{{ $t("TelText") }}</th>
            <th class="tb-medium">{{ $t("EmailText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>
            <th class="tb-small tb-center">{{ $t("PostDateText") }}</th>
            <th class="tb-small tb-center">{{ $t("ToolsText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
          
           v-for="(postJob, index) in postJobs" :key="index">
            <td class="tb-ss tb-center">
              <span>{{ index + 1 }}</span>
            </td>
            <td class="tb-medium">
              <span>{{ postJob.positionName }}</span>
            </td>
            <td class="tb-medium">
              <span>{{ postJob.provinceName }}</span>
            </td>
            <td class="tb-right">
              <span> {{ postJob.companyName }}</span>
            </td>
            <td class="tb-medium">
              <span>{{ postJob.tel }}</span>
            </td>
                  <td class="tb-medium">
              <span>{{ postJob.email }}</span>
            </td>
            <td class="tb-small">
              <span>{{ postJob.status }}</span>
            </td>
            <td class="tb-small">
              <span> {{ postJob.startDate }}</span>
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
    postJobs: {},
    postJobsTotal: 0,
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
  created() {
    this.fetchPostJob();
  },
  methods: {
    async fetchPostJob() {
      const res = await this.$axios.get(`${this.$api}/admin-api/postjob-get`);
      this.postJobs = res.data.mapPostJob;
      this.postJobsTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>