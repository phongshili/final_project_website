<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
    </div>
    <div class="form-container">
      <div class="detail-form-display">
        <div class="box-detail">
          <div class="box-body">
            <div class="box-title">{{ $t("TotalPostText") }}</div>
            <div class="box-count">{{ countTotal.totalPost }}</div>
          </div>
        </div>
        <div class="spacer left" v-if="$userInfo.type === 'admin'"></div>
        <div class="box-detail" v-if="$userInfo.type === 'admin'">
          <div class="box-body">
            <div class="box-title">{{ $t("TotalEmployersText") }}</div>
            <div class="box-count">{{ countTotal.totalEmp }}</div>
          </div>
        </div>
        <div class="spacer left" v-if="$userInfo.type === 'admin'"></div>
        <div class="box-detail" v-if="$userInfo.type === 'admin'">
          <div class="box-body">
            <div class="box-title">{{ $t("TotalJobSeekr") }}</div>
            <div class="box-count">{{ countTotal.totalSeeker }}</div>
          </div>
        </div>
        <div class="spacer left"></div>
        <div class="box-detail">
          <div class="box-body">
            <div class="box-title">{{ $t("TotalApplicationText") }}</div>
            <div class="box-count">
              {{ countTotal.totalJobApp || countTotal.totalApprove }}
            </div>
          </div>
        </div>
        <div class="spacer left"></div>
        <div class="box-detail">
          <div class="box-body">
            <div class="box-title">{{ $t("TotalUsedPointsText") }}</div>
            <div class="box-count">{{ countTotal.countPoint }}</div>
          </div>
        </div>
        <div
          class="spacer left"
          v-if="$userInfo.type === 'employee' || $userInfo.type === 'employer'"
        ></div>
        <div
          class="box-detail"
          v-if="$userInfo.type === 'employee' || $userInfo.type === 'employer'"
          @click="sendReq"
        >
          <div class="box-body">
            <div class="box-title">{{ $t("TopUpText") }}</div>
            <!-- <div class="spacerH"></div>
          
            <input class="input is-primary" type="number" />
            <div class="spacerH"></div>
            <button class="button is-link">SEND REQUEST</button> -->
          </div>
        </div>
      </div>

      <div class="form-display">
        <div class="chart-container">
          <BarChart :chartData="weekly" />
        </div>
        <div class="spacer left" v-if="$userInfo.type === 'admin'"></div>
        <div class="payment-container" v-if="$userInfo.type === 'admin'">
          <div class="payment">
            <div class="box-title">{{ $t("PaymentReqText") }}</div>
            <div
              class="view-all"
              @click="$router.push({ name: 'PaymentsHistoryIndex' })"
            >
              {{ $t("ViewAllText") }}
            </div>
          </div>
          <div
            class="payment body"
            @click="acceptReq"
            v-for="req in reqpoints"
            :key="req._id"
          >
            <div class="">{{ req.employeeName }}</div>
            <div class="">{{ req.point }} Points</div>
          </div>
        </div>
      </div>

      <!-- <button @click="gen">gen</button> -->
    </div>
  </div>
</template>
<script>
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import {
  DoughnutChart,
  BarChart,
  RadarChart,
  PieChart,
  LineChart,
} from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
Chart.defaults.font.family = "Noto Sans Lao";
import { ref, reactive, toRefs, computed } from "vue";
import axios from "axios";
import store from "../../store";
export default {
  components: { DoughnutChart, BarChart, RadarChart, PieChart, LineChart },
  setup() {
    const { t } = useI18n();

    const auth = store.useAuthStore();
    const userTypeStore = store.useAuthStore();
    const userType = JSON.parse(userTypeStore.getUserType);
    let token = auth.getToken;
    const dataSet = reactive({
      countTotal: {},
      reqpoints: [{}],
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    // need to refactor this code to hook
    const fetchCountTotalAdmin = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/admin-count-total"
      );

      dataSet.countTotal = res.data; // 👈 get just results
    };
    // need to refactor this code to hook
    const fetchPaymentAdmin = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/payment-get?status=pending"
      );

      dataSet.reqpoints = res.data.mapPayment; // 👈 get just results
    };

    // need to refactor this code to hook
    const fetchCountTotalEmp = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/emp-api/employee-count-total",
        {
          headers,
        }
      );
      dataSet.countTotal = res.data; // 👈 get just results
    };

    if (userType.type === "admin") {
      fetchCountTotalAdmin();
      fetchPaymentAdmin();
    }
    if (userType.type === "employee" || userType.type === "employer")
      fetchCountTotalEmp();

    // const reportListData = {
    //   labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    //   datasets: [
    //     {
    //       label: t('weeklyText'),
    //       data: [2, 4, 10, 7],
    //       backgroundColor: [
    //         "#5ADBFF",
    //       ],
    //     },
    //     {
    //       label: t('monthlyText'),
    //       data: [23, 25, 20, 30, 20,15, 26, 30, 30, 22,10, 18, 19, 30, 35],
    //       backgroundColor: [
    //         "#3C6997",

    //       ],
    //     },
    //     {
    //       label: t('yearlyText'),
    //       data: [353],
    //       backgroundColor: [
    //         "#094074",

    //       ],
    //     },
    //   ],
    // };
    const weekly = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4 "],
      datasets: [
        {
          label: t("weeklyText"),
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          backgroundColor: ["#5ADBFF"],
        },
      ],
    };
    const monthly = {
      labels: [
        "January ",
        "February",
        "March",
        "April ",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: t("monthlyText"),
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          backgroundColor: ["#3C6997"],
        },
      ],
    };
    const yealy = {
      labels: ["2020 ", "2021", "2022"],
      datasets: [
        {
          label: t("yearlyText"),
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          backgroundColor: ["#094074"],
        },
      ],
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-success",
        cancelButton: "btn-danger",
      },
      buttonsStyling: true,
    });
    const acceptReq = () => {
      swalWithBootstrapButtons
        .fire({
          title: t("PaymentReqText"),
          text: "Top-Up 90 Points",
          showCancelButton: true,
          confirmButtonText: t("AcceptButtonText"),
          cancelButtonText: t("RejectButtonText"),
          // reverseButtons: true,
          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 400,
          imageHeight: 200,
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment has been approve",
              showConfirmButton: false,
              timer: 1000,
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              icon: "warning",
              input: "text",
              title: "Somethings went wrong? :(",
            });
          }
        });
    };
    const sendReq = () => {
      swalWithBootstrapButtons
        .fire({
          title: "Top-Up",
          showCancelButton: true,
          confirmButtonText: "Send Request!",
          cancelButtonColor: "#d33",
          input: "text",

          // reverseButtons: true,
          imageUrl:
            "http://127.0.0.1:4000/resize-images/0b114727-89f4-4d9e-88d8-31fbad96eee8.jpeg",
          imageWidth: 400,
          imageHeight: 200,
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Send Request Successed!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    };

    return { acceptReq, sendReq, ...toRefs(dataSet), monthly, yealy, weekly };
  },
};
</script>

<style lang="scss" scoped>
.form-display {
  width: 100%;
  display: flex;
  .chart-container {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
    padding: 15px;
  }
  .payment-container {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
    width: 60%;
    height: fit-content;

    .payment {
      display: flex;
      padding: 15px;
      justify-content: space-between;
      border-bottom: 1px solid #dedede;
      &.body:hover {
        background: $table-hover;
        cursor: pointer;
      }
    }
    .payment:last-child {
      border: none;
    }
    .payment:first-child {
      font-size: $subtitle;
      font-weight: 600;
      border-bottom: 1px solid $sub-border-color;
    }
    .view-all:hover {
      color: $sub-color;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
.detail-form-display {
  margin-bottom: 15px;
  display: flex;
  .box-detail {
    width: 100%;
    padding: 10px;
    min-height: 150px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .box-body {
      .box-title {
        font-size: $subtitle;
        font-weight: 600;
      }
    }
  }
  .box-detail:hover {
    outline: 1px solid $sub-color;
    color: $sub-color;
    cursor: pointer;
  }
}
</style>