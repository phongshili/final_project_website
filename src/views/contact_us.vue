<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
    </div>

    <div class="filter" :class="{ fix_width: isReported }">
      <div class="filter-menu">
        <filterButton
          @getData="filterByStatus"
          v-model="status"
          :items="items"
        ></filterButton>

        <filterButton @getData="formatData" :items="reportItems"></filterButton>

        <div class="datePicker">
          <Datepicker v-model="dateTime" />
        </div>
        <div class="input-group">
          <input
            class="input is-small"
            type="text"
            v-model="position"
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
        <button @click="printPDF" class="button is-link">
          {{ $t("ExportText") }}
        </button>
      </div>
    </div>

    <div class="printPdf" id="printPDF">
      <div class="pdfHeader" v-if="isReported">
        <div class="header">
          <label for="">{{ $t("first") }}</label>
          <br />
          <label for="">{{ $t("second") }}</label>
        </div>
        <div class="reportTitle">
          {{ $t("ReportPostJobText") }}
        </div>
        <div class="line"></div>
        <div class="reportBody">
          <div class="detail">
            <label class="name" for=""
              >{{ $t("CompanyNameText") }} : {{ userInfo.companyName }}</label
            >
            <br />
            <label for="">{{ $t("TelText") }} : {{ userInfo.tel }}</label>
            <br />
            <label for="">{{ $t("EmailText") }} : {{ userInfo.email }}</label>
          </div>
          <div class="logo">
            <img src="../assets/jibjib_icon.png" alt="" />
            <p for="">{{ $t("DateText") }} : {{ today }}</p>
          </div>
        </div>
        <div class="line"></div>

      </div>

      <div class="table-box" :class="{ fix_width: isReported }">
        <table>
          <thead>
            <tr>
              <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
              <th class="tb-medium">{{ $t("PositionText") }}</th>
              <th class="tb-medium">{{ $t("LocationText") }}</th>
              <th v-if="userInfo.type === 'admin'" class="tb-medium tb-right">
                {{ $t("CompanyNameText") }}
              </th>

              <th class="tb-small">{{ $t("ApplicationText") }}</th>
              <th class="tb-small">{{ $t("StatusText") }}</th>
              <th class="tb-small tb-center">{{ $t("PostDateText") }}</th>
              <th v-if="!isReported" class="tb-small tb-center">
                {{ $t("OptionsText") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(job, index) in filterPosition" :key="index">
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

              <td class="tb-small tb-center">
                <span>{{ job.totalJobApp }}</span>
              </td>
              <td class="tb-small">
                <span style="text-transform: uppercase">{{ job.status }}</span>
              </td>
              <td class="tb-small">
                <span> {{ job.startDate }}</span>
              </td>
              <td
                class="tb-small"
                v-if="userInfo.type === 'admin' && !isReported"
              >
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
                v-if="userInfo.type === 'employee' && !isReported"
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
  </div>
</template>
<script>
import printJS from "print-js";
import filterButton from "../components/filter.vue";
import { reactive, toRefs, computed } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import store from "../store";
import useGetUser from "../hooks/useGetUser";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

export default {
  components: { filterButton, Datepicker },

  async setup() {
    const { t } = useI18n();
    const auth = store.useAuthStore();
    let token = auth.getToken;

    const userInfo = await useGetUser.getUserInfo();

    const dataSet = reactive({
      items: [
        {
          id: 1,
          value: "online",
          name: t("OnlineText"),
        },
        {
          id: 2,
          value: "offline",
          name: t("OfflineText"),
        },
        {
          id: 3,
          value: "expired",
          name: t("ExpiredText"),
        },
      ],
      reportItems: [
        {
          id: 1,
          value: "month",
          name: t("MonthText"),
        },
        {
          id: 2,
          value: "year",
          name: t("YearText"),
        },
      ],
      dateTime: new Date(),
      status: "",
      jobposts: [],
      position: "",
      filterPosition: computed(() => filtterData()),
      isReported: false,
      year: "",
      month: "",
      today: moment(new Date()).locale("lo").format("DD-MM-YYYY"),
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
      const res = await axios.get(
        "http://127.0.0.1:4000/emp-api/postjob-get?status=" +
          dataSet.status +
          "&filterYear=" +
          dataSet.year +
          "&filterMonth=" +
          dataSet.month,

        {
          headers,
        }
      );

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

    const filtterData = () => {
      if (dataSet.position !== null) {
        return dataSet.jobposts.filter((el) => {
          return el.positionName.match(dataSet.position);
        });
      } else {
        return dataSet.jobposts;
      }
    };

    const openReport = async () => {
      dataSet.isReported = !dataSet.isReported;
    };
    const printPDF = async () => {
      await openReport();

      printJS({
        printable: "printPDF",
        type: "html",
        targetStyles: ["*"],
        targetStyle: ["*"],
      });
      await openReport();
    };

    const filterByStatus = async (value) => {
      dataSet.status = value;
      if (userInfo.type === "admin") fetchJobPostAdmin();
      if (userInfo.type === "employee" || userInfo.type === "employer")
        fetchJobPostEmp();
    };

    const formatData = async (event) => {
      if (event === "month") {
        const month = moment(dataSet.dateTime)
          .locale("lo")
          .format("YYYY-MM-DD")
          .substring(0, 7);
        dataSet.month = month;
        dataSet.year = "";

        await fetchJobPostEmp();
      } else if (event === "year") {
        const year = moment(dataSet.dateTime)
          .locale("lo")
          .format("YYYY-MM-DD")
          .substring(0, 4);
        dataSet.year = year;
        dataSet.month = "";

        await fetchJobPostEmp();
      } else {
        dataSet.year = "";
        dataSet.month = "";
        await fetchJobPostEmp();
      }
    };

    if (userInfo.type === "admin") fetchJobPostAdmin();
    if (userInfo.type === "employee" || userInfo.type === "employer")
      fetchJobPostEmp();

    return {
      ...toRefs(dataSet),
      deletePost,
      userInfo,
      printPDF,
      filterByStatus,
      formatData,
    };
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;
}





</style>