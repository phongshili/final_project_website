<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
    </div>
    <div class="filter">
      <div class="filter-menu">
         <button @click="$router.go(-1)" class="button is-danger">{{ $t("BackText") }}</button>
         <div class="spacer"></div>
        <filterButton :items="items"></filterButton>
         
      </div>
      <div class="btn-menu">
        <button class="button is-success" @click="$router.push({ name: 'JobPostManagement' })" >{{$t('PostJobText')}}</button>
        <button class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
    <div class="table-box">
      <table  >
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("FullnameText") }}</th>
            <th class="tb-medium">{{ $t("Province") }}</th>
            <th class="tb-medium tb-right">{{ $t("TelText") }}</th>
            <th class="tb-medium">{{ $t("EmailText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>

            <th class="tb-small tb-center">{{ $t("PostDateText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="$router.push({ name: 'Resume' })"
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
              <span> 99999999</span>
            </td>
                  <td class="tb-medium">
              <span>{{ postJob.email }}</span>
            </td>
              <td class="tb-small">
              <span> Pendding</span>
            </td>

            <td class="tb-small">
              <span> {{ postJob.startDate }}</span>
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
      value:"Pending"
    },
    {
      id:2,
      value:"Approve"
    },
    ]
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