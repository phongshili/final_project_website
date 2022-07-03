<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("EmployersManagementText") }}</label>
    </div>
    <div class="filter" :class="{ fix_width: isReported }">
      <div class="filter-menu">
        <filterButton      @getData="filterByStatus"
          v-model="status"
          :items="items"></filterButton>
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
        <button
          class="button is-success"
          @click="$router.push({ name: 'Profile' })"
        >
          {{ $t("AddEmployerText") }}
        </button>
        <button @click="printPDF" class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
        <div class="printPdf" id="printPDF">
      <div class="pdfHeader" v-if="isReported" >
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
    <div class="table-box" :class="{ fix_width: isReported }">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("CompanyNameText") }}</th>
            <th class="tb-medium">{{ $t("LocationText") }}</th>
            <th class="tb-medium tb-right">{{ $t("TelText") }}</th>
            <th class="tb-large">{{ $t("EmailText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>
            <th   v-if="!isReported" class="tb-small tb-center">{{ $t("OptionsText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emp, index) in filterEmployer" :key="index">
            <td class="tb-ss tb-center">
              <span>{{ index + 1 }}</span>
            </td>
            <td class="tb-medium">
              <span>{{ emp.companyName }}</span>
            </td>
            <td class="tb-medium">
              <span>{{ emp.provinceName }}</span>
            </td>
            <td class="tb-right">
              <span>{{ emp.tel }}</span>
            </td>
            <td class="tb-large">
              <span>{{ emp.email }}</span>
            </td>
            <td class="tb-small">
              <span style="text-transform: uppercase">{{ emp.status }}</span>
            </td>
            <td v-if="!isReported" class="tb-small">
              <div class="tools">
                <i
                  class="fa-solid fa-pen-to-square edit-tool"
                  @click="
                    $router.push({ name: 'Profile', params: { id: emp._id } })
                  "
                ></i
                ><i
                  class="fa-solid fa-xmark delete-tool"
                  @click="deleteEmployer(emp.userTypeId)"
                ></i>
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
import filterButton from "../../components/filter.vue";
import { reactive, toRefs,computed } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import moment from "moment";
import printJS from "print-js";
import useGetUser from "../../hooks/useGetUser";

export default {
  components: { filterButton },
  async setup() {
    const { t } = useI18n();
    const baseUrl = "http://127.0.0.1:4000/";
    const userInfo = await useGetUser.getUserInfo();
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
      ],
      isReported: false,

      employers: [],
      filterEmployer: computed(() => filtterData()),
      name:'',
      today: moment(new Date()).locale("lo").format("DD-MM-YYYY"),
      status: "",

    });
    // need to refactor this code to hook
    const fetchEmployer = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/employee-get?status=" +
          dataSet.status
      );
      dataSet.employers = res.data.mapEmp; // 👈 get just results
    };
    // need to refactor this code to hook
    const deleteEmployer = async (id) => {
      await Swal.fire({
        position: "center",
        icon: "warning",
        title: t("SuccessText"),
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            "http://127.0.0.1:4000/admin-api/employee-delete/" + id
          );
          await fetchEmployer();
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
      if (dataSet.name !== null) {
        return dataSet.employers.filter((el) => {
          return el.companyName.match(dataSet.name);
        });
      } else {
        return dataSet.employers;
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
    await fetchEmployer();
    };
    fetchEmployer();

    return { ...toRefs(dataSet), deleteEmployer,printPDF,baseUrl,filterByStatus ,userInfo};
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;
}
</style>