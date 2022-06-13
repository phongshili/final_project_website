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
    <div class="table-box is-small-tb" v-if="$userInfo.type === 'admin'">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("CompanyNameText") }}</th>
            <th class="tb-small">{{ $t("AmountText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>
            <th class="tb-small">{{ $t("PaymentDateText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="acceptReq">
            <td class="tb-ss tb-center"><span>1</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>Status</span></td>
            <td class="tb-small"><span>2022-03-15</span></td>
           
          </tr>
          <tr @click="acceptReq">
            <td class="tb-ss tb-center"><span>2</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>Status</span></td>
            <td class="tb-small"><span>2022-03-15</span></td>

           
          </tr>
          <tr @click="acceptReq">
            <td class="tb-ss tb-center"><span>3</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>company1</span></td>
            <td class="tb-small"><span>Status</span></td>
            <td class="tb-small"><span>2022-03-15</span></td>

            
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-box is-small-tb" v-if="$userInfo.type === 'employee' || $userInfo.type === 'employer'">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-small">{{ $t("AmountText") }}</th>
            <th class="tb-small">{{ $t("StatusText") }}</th>
            <th class="tb-small">{{ $t("PaymentDateText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="showReceipt">
            <td class="tb-ss tb-center"><span>2</span></td>
            <td class="tb-small"><span>10</span></td>
            <td class="tb-small"><span>rejected</span></td>
            <td class="tb-small"><span>2022-03-15</span></td>
          </tr>
          <tr @click="showReceipt">
            <td class="tb-ss tb-center"><span>2</span></td>
            <td class="tb-small"><span>40</span></td>
            <td class="tb-small"><span>Approve</span></td>
            <td class="tb-small"><span>2022-03-15</span></td>
          </tr>
          <tr @click="showReceipt">
            <td class="tb-ss tb-center"><span>3</span></td>
            <td class="tb-small"><span>60</span></td>
            <td class="tb-small"><span>Pendding</span></td>
            <td class="tb-small"><span>2022-03-15</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import filterButton from "../../components/filter.vue";
import { ref,reactive,toRefs,computed } from "vue";
import Swal from "sweetalert2";
export default {
  components: {
    filterButton,
  },
  setup() {
    
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
    }
    async function showReceipt() {
      swalWithBootstrapButtons.fire({
        title: "Top-Up",
        html: "<p>Points : 90</p>" + "<p>Comment : Something Went Wrong</p>",
        // reverseButtons: true,
        imageUrl:
          "https://www.google.com/url?sa=i&url=http%3A%2F%2Fqrcode.azurewebsites.net%2F&psig=AOvVaw3-oupYDHzEIjW52cUMxN8Z&ust=1654343312019000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCPDJ_JybkfgCFQAAAAAdAAAAABAD",
        imageWidth: 400,
        imageHeight: 200,
        showConfirmButton: false,
      });
    }
    
    return { showReceipt, acceptReq };
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;
}
</style>