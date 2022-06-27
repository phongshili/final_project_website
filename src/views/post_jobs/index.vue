<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
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
        <button
          class="button is-success"
          @click="$router.push({ name: 'JobPostManagement' })"
        >
          {{ $t("PostJobText") }}
        </button>
        <button class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
    <div class="table-box">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("PositionText") }}</th>
            <th class="tb-medium">{{ $t("LocationText") }}</th>
            <th v-if="userInfo.type === 'admin'" class="tb-medium tb-right">
              {{ $t("CompanyNameText") }}
            </th>

            <!-- <th class="tb-medium">{{ $t("EmailText") }}</th> -->
            <th class="tb-small">{{ $t("ApplicationText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>
            <th class="tb-small tb-center">{{ $t("PostDateText") }}</th>
            <th class="tb-small tb-center">{{ $t("OptionsText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(job, index) in jobposts" :key="index">
            <td class="tb-ss tb-center">
              <span>{{ index + 1 }}</span>
            </td>
            <td class="tb-medium">
              <span style="text-transform: uppercase">{{
                job.positionName
              }}</span>
            </td>
            <td class="tb-medium">
              <span>{{ job.provinceName }}</span>
            </td>
            <td v-if="userInfo.type === 'admin'" class="tb-right">
              <span> {{ job.companyName }}</span>
            </td>

            <!-- <td class="tb-medium">
              <span>{{ job.email }}</span>
            </td> -->
            <td class="tb-small tb-center">
              <span>{{ job.totalJobApp }}</span>
            </td>
            <td class="tb-small">
              <span style="text-transform: uppercase">{{ job.status }}</span>
            </td>
            <td class="tb-small">
              <span> {{ job.startDate }}</span>
            </td>
            <td class="tb-small" v-if="userInfo.type === 'admin'">
              <div class="tools">
                <i
                  @click="
                    $router.push({
                      name: 'JobPostManagement',
                      params: { id: job._id },
                    })
                  "
                  class="fa-solid fa-pen-to-square edit-tool"
                ></i
                ><i
                  @click="deletePost(job._id)"
                  class="fa-solid fa-xmark delete-tool"
                ></i>
              </div>
            </td>
            <td
              class="tb-large"
              v-if="
                userInfo.type === 'employee' || userInfo.type === 'employer'
              "
            >
              <div class="tools">
                <button
                  class="button apply-btn"
                  @click="
                    $router.push({
                      name: 'JobseekersIndex',
                      params: { id: job._id },
                    })
                  "
                >
                  {{ $t("ApplymentButtonText") }}
                </button>
                <div class="spacer s"></div>
                <button
                  @click="
                    $router.push({
                      name: 'JobPostManagement',
                      params: { id: job._id },
                    })
                  "
                  class="button is-link"
                >
                  {{ $t("EditButtonText") }}
                </button>
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
import { reactive, toRefs } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import store from "../../store";
import useGetUser from "../../hooks/useGetUser";

export default {
  components: { filterButton },
  async setup() {
    const { t } = useI18n();
    const auth = store.useAuthStore();
    const userInfo = await useGetUser.getUserInfo();

    let token = auth.getToken;
    const dataSet = reactive({
      items: [
        {
          id: 1,
          value: "online",
          name: t("OnlineText"),
        },
        {
          id: 2,
          value: "office",
          name: t("OfflineText"),
        },
        {
          id: 3,
          value: "expired",
          name: t("ExpiredText"),
        },
      ],
      jobposts: [],
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    // need to refactor this code to hook
    const fetchJobPostAdmin = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/postjob-get"
      );

      dataSet.jobposts = res.data.mapPostJob; // 👈 get just results
    };
    // need to refactor this code to hook
    const fetchJobPostEmp = async () => {
      const res = await axios.get("http://127.0.0.1:4000/emp-api/postjob-get", {
        headers,
      });

      dataSet.jobposts = res.data.mapPostJob; // 👈 get just results
    };
    // need to refactor this code to hook
    const deletePost = async (id) => {
      await Swal.fire({
        position: "center",
        icon: "warning",
        title: t("SuccessText"),
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (userInfo.type === "admin") {
            await axios.delete(
              "http://127.0.0.1:4000/admin-api/postjob-delete/" + id
            );
            fetchJobPostAdmin();
          }
          if (userInfo.type === "employee") {
            await axios.delete(
              "http://127.0.0.1:4000/emp-api/postjob-delete" + id
            );
            fetchJobPostEmp();
          }
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: t("SuccessText"),
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    };

    if (userInfo.type === "admin") fetchJobPostAdmin();
    if (userInfo.type === "employee" || userInfo.type === "employer")
      fetchJobPostEmp();

    return {
      ...toRefs(dataSet),
      deletePost,
      userInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>