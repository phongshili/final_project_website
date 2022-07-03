<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PaymentsHistoryText") }}</label>
    </div>
    <div class="filter is-small-tb">
      <div class="filter-menu">
         <filterButton
          @getData="filterByStatus"
          v-model="status"
          :items="items"
        ></filterButton>
          <filterButton   @getData="formatData" :items="reportItems"></filterButton>

        <div  class="datePicker">
          <Datepicker v-model="dateTime" />
        </div>
      </div>
      <div class="btn-menu">
        <button  @click="printPDF"  class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
       <div class="printPdf" id="printPDF" :class="{ fix_width: isReported }">
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
    <div class="table-box is-small-tb" :class="{ fix_width: isReported }">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th v-if="userInfo.type === 'admin'" class="tb-medium">
              {{ $t("CompanyNameText") }}
            </th>
            <th class="tb-small">{{ $t("AmountText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>
            <th class="tb-small">{{ $t("PaymentDateText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="showReceipt(payment._id)"
            v-for="(payment, index) in payments"
            :key="index"
          >
            <td class="tb-ss tb-center">
              <span>{{ index + 1 }}</span>
            </td>
            <td v-if="userInfo.type === 'admin'" class="tb-small">
              <span>{{ payment.employeeName }}</span>
            </td>
            <td class="tb-small">
              <span>{{ payment.point }}</span>
            </td>
            <td class="tb-small">
              <span style="text-transform: uppercase">{{
                payment.status
              }}</span>
            </td>
            <td class="tb-small">
              <span>{{ payment.date || payment.createdAt }}</span>
            </td>
          </tr>
          <tr  v-if=" payments.length ===0">
            {{$t('isEmpty')}}
          </tr>
        </tbody>
      </table>
    </div>
       </div>
    <!-- custom modal  -->
    <customModal :modalActive="modalActive">
      <div class="modal-content">
        <div class="modal-detail">
          <div class="image-input">
            <div class="modal-image-container">
              <img
                v-if="!bill"
                class="bill"
                src="@/assets/default.jpg"
                alt=""
              />
              <img v-else class="bill" :src="baseUrl + bill" alt="" />
            </div>
          </div>
          <div class="spacerH"></div>

          <label class="modal-title">{{ $t("TopUpText") }}</label>
          <div class="spacerH"></div>

          <div class="amount-input">
            <input
              class="input is-primary"
              type="text"
              disabled
              v-model="amount"
              :placeholder="$t('AmountText')"
            />
          </div>
          <div class="spacerH"></div>
              <label v-if="status ==='cancel'" class='comment' for="">{{$t('CommentText')}} : {{detail}}</label>
            <div  v-if="status ==='cancel'" class="spacerH"></div>

          <div class="btn-option-group">
            <button
              v-if="userInfo.type === 'admin' && status === 'pending'"
              @click="ApproveReq('confirmed')"
              class="button is-success"
            >
              {{ $t("ApproveText") }}
            </button>
            <div
              class="spacer"
              v-if="userInfo.type === 'admin' && status === 'pending'"
            ></div>
            <button
              class="button is-warning is-no"
              @click="rejectModalAction"
              v-if="userInfo.type === 'admin' && status === 'pending'"
            >
              {{ $t("RejectText") }}
            </button>
            <div
              class="spacer"
              v-if="userInfo.type === 'admin' && status === 'pending'"
            ></div>
            <button @click="modalAction" class="button is-danger">
              {{ $t("CancelText") }}
            </button>
          </div>
        </div>
      </div>
    </customModal>
    <!-- end custom modal -->
    <customModal :modalActive="rejectModal">
      <div class="modal-content">
        <div class="modal-detail">
          <div class="amount-input">
            <input
              class="input is-primary"
              type="text"
              v-model="detail"
              :placeholder="$t('DetailText')"
            />
          </div>
          <div class="spacerH"></div>
          <div class="btn-option-group">
            <button
              class="button is-warning is-no"
              @click="ApproveReq('cancel')"
              v-if="userInfo.type === 'admin' && status === 'pending'"
            >
              {{ $t("RejectText") }}
            </button>
            <div
              class="spacer"
              v-if="userInfo.type === 'admin' && status === 'pending'"
            ></div>
            <button @click="rejectModal = false" class="button is-danger">
              {{ $t("CancelText") }}
            </button>
          </div>
        </div>
      </div>
    </customModal>
    <!-- end custom modal -->
  </div>
</template>
<script>
import filterButton from "../../components/filter.vue";
import { reactive, toRefs } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import store from "../../store";
import customModal from "@/components/customModal.vue";
import useGetUser from "../../hooks/useGetUser";
import Swal from "sweetalert2";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import printJS from "print-js";

export default {
  components: {
    filterButton,
    customModal,
    Datepicker
  },
  async setup() {
    const { t } = useI18n();
    const auth = store.useAuthStore();
    const baseUrl = "http://127.0.0.1:4000/";
    const userInfo = await useGetUser.getUserInfo();

    let token = auth.getToken;
    const dataSet = reactive({
      items: [
        {
          id: 1,
          value: "pending",
          name: t("PendingText"),
        },
        {
          id: 2,
          value: "confirmed",
          name: t("ApproveText"),
        },
        {
          id: 3,
          value: "cancel",
          name: t("RejectText"),
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
      payments: [],
      findPayment: [],
      amount: "",
      bill: "",
      modalActive: false,
      rejectModal: false,
      detail: "",
      id: "",
      isReported: false,
      dateTime: new Date(),
      status: "",
      year: "",
      month: "",
      today: moment(new Date()).locale("lo").format("DD-MM-YYYY"),
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    // need to refactor this code to hook
    const fetchPaymentAdmin = async () => {
      const res = await axios.get(baseUrl + "admin-api/payment-get?status=" +
          dataSet.status +
          "&filterYear=" +
          dataSet.year +
          "&filterMonth=" +
          dataSet.month);

      dataSet.payments = res.data.mapPayment; // 👈 get just results
    };
    // need to refactor this code to hook
    const fetchPaymentEmp = async () => {
      const res = await axios.get(baseUrl + "emp-api/payment-get?status=" +
          dataSet.status +
          "&filterYear=" +
          dataSet.year +
          "&filterMonth=" +
          dataSet.month, {
        headers,
      });

      dataSet.payments = res.data.mapPayment; // 👈 get just results
    };

    const fetchAdminPaymentById = async (id) => {
      const res = await axios.get(baseUrl + "admin-api/payment-find-id/" + id);

      dataSet.findPayment = res.data.mapPayment;
      dataSet.status = dataSet.findPayment.status;
      dataSet.detail = dataSet.findPayment.detail;
    };

    //duplicate code
    const fetchEmployerPaymentById = async (id) => {
      const res = await axios.get(baseUrl + "emp-api/payment-find-id/" + id);
      dataSet.findPayment = res.data.mapPayment;
    };

    const ApproveReq = async (status) => {
      await axios.put(baseUrl + "admin-api/payment-update/", {
        id: dataSet.id,
        status: status,
        detail: dataSet.detail,
      });
      dataSet.modalActive = !dataSet.modalActive;
      dataSet.rejectModal = false
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: t("SuccessText"),
        showConfirmButton: false,
        timer: 1500,
      });
      await fetchPaymentAdmin();

      window.location.reload();
    };

    if (userInfo.type === "admin") fetchPaymentAdmin();
    if (userInfo.type === "employee" || userInfo.type === "employer")
      fetchPaymentEmp();

    const showReceipt = async (id) => {
      dataSet.modalActive = !dataSet.modalActive;
      if (userInfo.type === "admin") await fetchAdminPaymentById(id);
      if (userInfo.type === "employee" || userInfo.type === "employer")
        await fetchEmployerPaymentById(id);
      dataSet.amount = dataSet.findPayment.point;
      dataSet.bill = dataSet.findPayment.image;
      dataSet.id = id;
    };
    const modalAction = async () => {
      dataSet.modalActive = !dataSet.modalActive;
      setTimeout(() => {
        (dataSet.id = ""), (dataSet.amount = ""), (dataSet.bill = "");
        dataSet.status = "";
      }, 500);
    };
    const rejectModalAction = async () => {
      dataSet.rejectModal = !dataSet.rejectModal;

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
      if (userInfo.type === "admin")await fetchPaymentAdmin();
      if (userInfo.type === "employee" || userInfo.type === "employer")
      await  fetchPaymentEmp();
    };

    const formatData = async (event) => {
      if (event === "month") {
        const month = moment(dataSet.dateTime)
          .locale("lo")
          .format("YYYY-MM-DD")
          .substring(0, 7);
        dataSet.month = month;
        dataSet.year = "";

          if (userInfo.type === "admin") await fetchPaymentAdmin();
          if (userInfo.type === "employee" || userInfo.type === "employer") await fetchPaymentEmp()
      } else if (event === "year") {
        const year = moment(dataSet.dateTime)
          .locale("lo")
          .format("YYYY-MM-DD")
          .substring(0, 4);
        dataSet.year = year;
        dataSet.month = "";

          if (userInfo.type === "admin") await fetchPaymentAdmin();
          if (userInfo.type === "employee" || userInfo.type === "employer") await fetchPaymentEmp()
      } else {
        dataSet.year = "";
        dataSet.month = "";
          if (userInfo.type === "admin") await fetchPaymentAdmin();
          if (userInfo.type === "employee" || userInfo.type === "employer") await fetchPaymentEmp()
      }
    };

    return {
      showReceipt,
      ...toRefs(dataSet),
      baseUrl,
      ApproveReq,
      modalAction,
      userInfo,
      rejectModalAction,
        printPDF,
      filterByStatus,
      formatData,
      baseUrl,
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