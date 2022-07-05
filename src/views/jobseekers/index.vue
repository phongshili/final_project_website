<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("JobSeekersManagementText") }}</label>
    </div>
    <div class="filter" :class="{ fix_width: isReported }">
      <div class="filter-menu">
         <button v-if="userInfo.type === 'employee'" @click="$router.go(-1)" class="button is-danger">
          {{ $t("BackText") }}
        </button>
        <div class="spacer s"></div>
        <filterButton
          @getData="filterByStatus"
          v-model="status"
          :items="items"
        ></filterButton>
          <filterButton v-if="userInfo.type === 'admin'"  @getData="formatData" :items="reportItems"></filterButton>

        <div v-if="userInfo.type === 'admin'" class="datePicker">
          <Datepicker v-model="dateTime" />
        </div>
        <div class="input-group">
          <input
            class="input is-small"
            type="text"
            v-model="name"
            :placeholder="$t('SearchText')"
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div class="btn-menu">
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
          <br>
            {{$t('PositionText')}} : {{$route.params.position}}
          
        </div>
        <div class="line"></div>
        <div class="reportBody">
          <div class="detail">
            <label class="name" v-if="userInfo.type === 'employee'"
              >{{ $t("CompanyNameText") }} : {{ userInfo.companyName }}</label
            >
            <br />
            <label for="">{{ $t("TelText") }} : {{ userInfo.tel }}</label>
            <br />
            <label for="">{{ $t("EmailText") }} : {{ userInfo.email }}</label>
          </div>
          <div class="logo">
            <img :src="baseUrl + userInfo.image" alt="" />
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
              <th class="tb-medium">{{ $t("FullNameText") }}</th>
              <th class="tb-medium">{{ $t("DistrictMenuText") }}</th>
              <th class="tb-medium tb-right">{{ $t("TelText") }}</th>
              <th class="tb-large">{{ $t("EmailText") }}</th>
              <th class="tb-small">{{ $t("StatusText") }}</th>
              <th
                v-if="userInfo.type === 'employee' "
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
              v-for="(seeker, index) in filterSeekers"
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
                <span style="text-transform: uppercase">{{
                  seeker.status || seeker.jobStatus
                }}</span>
              </td>
              <td
                v-if="userInfo.type === 'employee'"
                class="tb-small"
              >
                <span> {{ seeker.createdAt }}</span>
              </td>
            </tr>
                 <tr  v-if=" filterSeekers.length ===0">
            {{$t('isEmpty')}}</tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import filterButton from "../../components/filter.vue";
import { reactive, toRefs, computed } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import store from "../../store";
import { useRoute } from "vue-router";
import useGetUser from "../../hooks/useGetUser";
import moment from "moment";
import printJS from "print-js";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  components: { filterButton,Datepicker },
  async setup() {
    const baseUrl = "http://127.0.0.1:4000/";
    const { t } = useI18n();
    const route = useRoute();
    const auth = store.useAuthStore();
    const userInfo = await useGetUser.getUserInfo();
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
         {
          id: 4,
          value: "isVerify",
          name: t("isVerifyText"),
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
      name: "",
      seekers: [],
      isReported: false,
      status: "",
      dateTime: new Date(),

      filterSeekers: computed(() => filtterData()),
      year: "",
      month: "",
      today: moment(new Date()).locale("lo").format("DD-MM-YYYY"),
    });
    // need to refactor this code to hook
    const fetchSeekers = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/seeker-get?status=" +
          dataSet.status +
          "&filterYear=" +
          dataSet.year +
          "&filterMonth=" +
          dataSet.month
      );

      dataSet.seekers = res.data.mapSeeker; // 👈 get just results
    };
    // need to refactor this code to hook
    // duplicate code
    const fetchSeekerEmp = async () => {
      const res = await axios.get(
        baseUrl +
          "emp-api/jobapplication-find-id-jobpost/" +
          route.params.id +
          "/?jobStatus=" +
          dataSet.status,
        {
          headers,
        }
      );

      dataSet.seekers = res.data.mapJobApplication; // 👈 get just results
    };

    const filtterData = () => {
      if (dataSet.name !== null) {
        return dataSet.seekers.filter((el) => {
          return el.name.match(dataSet.name);
        });
      } else {
        return dataSet.seekers;
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
    const formatData = async (event) => {
      if (event === "month") {
        const month = moment(dataSet.dateTime)
          .locale("lo")
          .format("YYYY-MM-DD")
          .substring(0, 7);

        dataSet.month = month;
        dataSet.year = "";
         if (userInfo.type === "admin") await fetchSeekers();
          if (userInfo.type === "employee" || userInfo.type === "employer")
       await fetchSeekerEmp();
      } else if (event === "year") {
        const year = moment(dataSet.dateTime)
          .locale("lo")
          .format("YYYY-MM-DD")
          .substring(0, 4);
        dataSet.year = year;
        dataSet.month = "";

         if (userInfo.type === "admin")await fetchSeekers();
          if (userInfo.type === "employee" || userInfo.type === "employer")
      await fetchSeekerEmp();
      } else {
        dataSet.year = "";
        dataSet.month = "";
         if (userInfo.type === "admin")await fetchSeekers();
          if (userInfo.type === "employee" || userInfo.type === "employer")
       await fetchSeekerEmp();
      }
    };

    const filterByStatus = async (value) => {
      dataSet.status = value;
      if (userInfo.type === "admin")await fetchSeekers();
      if (userInfo.type === "employee" || userInfo.type === "employer")
      await  fetchSeekerEmp();
    };

    if (userInfo.type === "admin" && !route.params.id)await fetchSeekers();
    if (userInfo.type === "employee" || userInfo.type === "employer")
     await fetchSeekerEmp();

    return {
      ...toRefs(dataSet),
      userInfo,
      filterByStatus,
      printPDF,
      baseUrl,
      formatData,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>