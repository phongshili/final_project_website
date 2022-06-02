<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
    </div>
    <div class="form-container">
      <div class="table-box is-small-tb">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("PositionText") }}</th>    
            <th class="tb-small tb-center">{{ $t("ToolsText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tb-ss tb-center"><span>1</span></td>
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
.home{
   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        border-radius: 5px;
  
}
</style>