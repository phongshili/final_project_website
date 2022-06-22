<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PaymentsHistoryText") }}</label>
    </div>
    <div class="filter is-small-tb">
      <div class="filter-menu">
        <filterButton :items="items"></filterButton>
      </div>
      <div class="btn-menu">
        <button class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
    <div class="table-box is-small-tb">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th v-if="$userInfo.type === 'admin'" class="tb-medium">
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
            <td v-if="$userInfo.type === 'admin'" class="tb-small">
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
        </tbody>
      </table>
    </div>
    <!-- custom modal  -->
    <customModal :modalActive="modalActive">
      <div class="modal-content">
        <div class="modal-detail">
          <div class="image-input" @click="$refs.logoFile.click()">
            <div class="modal-image-container">
              <img
                v-if="!bill"
                class="bill"
                src="@/assets/default.jpg"
                alt=""
              />
              <img
                v-else
                class="bill"
                :src="baseUrl  + bill"
                alt=""
              />
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
          <div class="btn-option-group">
            <button v-if="$userInfo.type === 'admin' && status === 'pending'"  @click="ApproveReq('confirmed')" class="button is-success">
              {{ $t("ApproveText") }}
            </button>
            <div class="spacer" v-if="$userInfo.type === 'admin' && status === 'pending'"></div>
                 <button
          class="button is-warning is-no"
          @click="ApproveReq('reject')"
          v-if=" $userInfo.type === 'admin' && status === 'pending'" 
        >
          {{ $t("RejectText") }}
        </button>
             <div class="spacer"   v-if=" $userInfo.type === 'admin' && status === 'pending'" ></div>
            <button @click="close" class="button is-danger">
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
import { ref, reactive, toRefs } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import store from "../../store";
import customModal from "@/components/customModal.vue";

export default {
  components: {
    filterButton,
    customModal,
  },
  setup() {
    const { t } = useI18n();
    const auth = store.useAuthStore();
    const userTypeStore = store.useAuthStore();
    const baseUrl = "http://127.0.0.1:4000/";

    const userType = JSON.parse(userTypeStore.getUserType);
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
      payments: [],
      findPayment: [],
      amount: "",
      bill: "",
      modalActive: false,
      detail:'',
      id:'',
      status:''
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    // need to refactor this code to hook
    const fetchPaymentAdmin = async () => {
      const res = await axios.get(baseUrl+"admin-api/payment-get");

      dataSet.payments = res.data.mapPayment; // 👈 get just results
    };
    // need to refactor this code to hook
    const fetchPaymentEmp = async () => {
      const res = await axios.get(baseUrl + "emp-api/payment-get", {
        headers,
      });

      dataSet.payments = res.data.mapPayment; // 👈 get just results
    };

    const fetchAdminPaymentById = async (id) => {
      const res = await axios.get(baseUrl + "admin-api/payment-find-id/" + id);
      dataSet.findPayment = res.data.mapPayment;
       dataSet.status =  dataSet.findPayment.status;
    };

    //duplicate code
    const fetchEmployerPaymentById = async (id) => {
      const res = await axios.get(baseUrl + "emp-api/payment-find-id/" + id);
      dataSet.findPayment = res.data.mapPayment;
    };

    const ApproveReq = async (status) => {
        await axios.put(baseUrl + "admin-api/payment-update/",{
          id:dataSet.id,
          status: status,
          detail: dataSet.detail,
        });
      dataSet.modalActive = !dataSet.modalActive;
        if (userType.type === "admin") fetchPaymentAdmin();
    if (userType.type === "employee" || userType.type === "employer")
      fetchPaymentEmp();

    }

    
    if (userType.type === "admin") fetchPaymentAdmin();
    if (userType.type === "employee" || userType.type === "employer")
      fetchPaymentEmp();

    const showReceipt = async (id) => {
      dataSet.modalActive = !dataSet.modalActive;
      if (userType.type === "admin") await fetchAdminPaymentById(id);
      if (userType.type === "employee" || userType.type === "employer")
        await fetchEmployerPaymentById(id);
      dataSet.amount = dataSet.findPayment.point;
      dataSet.bill = dataSet.findPayment.image;
      dataSet.id = id
    };
    const close = async () => {
      dataSet.modalActive = !dataSet.modalActive;
      dataSet.id =''

    }

    return { showReceipt, ...toRefs(dataSet), baseUrl, ApproveReq ,close};
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;
}
</style>