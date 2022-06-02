<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
    </div>
    <div class="form-container">
      <div class="detail-form-display">
        <div class="box-detail">
          <div class="box-title">Posts</div>
          <div class="box-count">60</div>
        </div>
        <div class="spacer left"></div>
        <div class="box-detail">
          <div class="box-title">Employers</div>
          <div class="box-count">60</div>
        </div>
        <div class="spacer left"></div>
        <div class="box-detail">
          <div class="box-title">Job Seekers</div>
          <div class="box-count">60</div>
        </div>
        <div class="spacer left"></div>
        <div class="box-detail">
          <div class="box-title">Applications</div>
          <div class="box-count">60</div>
        </div>
        <div class="spacer left"></div>
        <div class="box-detail">
          <div class="box-title">Total Used Points</div>
          <div class="box-count">60</div>
        </div>
      </div>

      <div class="form-display">
        <div class="chart-container">
          <BarChart :chartData="reportListData" />
        </div>
        <div class="spacer left"></div>
        <div class="payment-container">
          <div class="payment">
            <div class="box-title">Payment request</div>
            <div
              class="view-all"
              @click="$router.push({ name: 'PaymentsHistoryIndex' })"
            >
              View All
            </div>
          </div>
          <div class="payment body" @click="acceptReq">
            <div class="">Employer 1</div>
            <div class="">90 Points</div>
          </div>
          <div class="payment body">
            <div class="">Employer 2</div>
            <div class="">120 Points</div>
          </div>
        </div>
      </div>

      <!-- <button @click="gen">gen</button> -->
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import { defineComponent } from "vue";
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
export default {
  components: { DoughnutChart, BarChart, RadarChart, PieChart, LineChart },
  setup() {
    const reportListData = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          data: [39, 30, 50, 30, 60],
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
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
    async function acceptReq() {
      swalWithBootstrapButtons
        .fire({
          title: "Payment",
          text: "Top-Up 90 Points",
          showCancelButton: true,
          confirmButtonText: "Accept!",
          cancelButtonText: "Reject!",
          // reverseButtons: true,

          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 400,
          imageHeight: 200,
          
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Successed!",
              "Payment has been approve",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              {
                icon:"warning",
                input: "text",
                title : "Somethings went wrong? :("
              }
            );
          }
        });
    }

    return { reportListData, acceptReq };
  },
  // data: () => ({
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBbm91c2FjayIsInN1YiI6IjYyMmM0ZjY5ZDA0ZmFmM2Q4NDMwZDJiYyIsImlhdCI6MTY1NDE2NzI1NDU1MywiZXhwIjoxNjU0MjUzNjU0NTUzfQ.7I7NzLR95IhEAdjKzQjtvEwnmYlRRCacrOJOnmb3tlM",
  // }),
  // created() {
  //   console.log(this.token);
  // },
  // methods: {
  //   async gen() {
  //     const decoded = await jwt_decode(this.token);
  //     console.log(decoded);
  //   },
  // },
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
      &.body:hover{
        background: $table-hover;
        cursor: pointer;
      }
     
    }
    .payment:last-child {
      border: none;
    }
    .payment:first-child {
      font-size: 20px;
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
    text-align: center;
    width: 100%;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
  }
  .box-detail:hover {
    outline: 1px solid $sub-color;
    color: $sub-color;
    cursor: pointer;
  }
}
</style>