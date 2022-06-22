
<template>
  <div class="_container">

     <img :src="baseUrl+'9b9558fc-e675-4e92-9a3f-0021e70aad94.jpeg'" alt="">

    <customModal :modalActive="modalActive">
      <div class="modal-content">
        <div class="modal-detail">
          <div class="image-input" @click="$refs.logoFile.click()">
            <div class="modal-image-container">
              <img
                v-if="!bill"
                class="bill"
                src="../assets/default.jpg"
                alt=""
              />
              <img
                v-else
                class="bill"
                :src="baseUrl + 'resize-images/' + bill"
                alt=""
              />
            </div>
            <input
              class="input is-primary"
              style="display: none"
              type="file"
              @change="onBillFileChange"
              placeholder="Primary input"
              ref="logoFile"
            />
            <input
              class="input is-primary"
              style="display: none"
              type="text"
              v-model="bill"
              placeholder="Primary input"
            />
          </div>
          <div class="spacerH"></div>

          <label class="modal-title">{{ $t("TopUpText") }}</label>
          <div class="spacerH"></div>

          <div class="amount-input">
            <input
              class="input is-primary"
              type="text"
              v-model="amount"
              :placeholder="$t('AmountText')"
            />
          </div>
          <div class="spacerH"></div>
          <div class="btn-option-group">
            <button class="button is-success">
              {{ $t("SendText") }}
            </button>
            <div class="spacer"></div>
            <button @click="toggleModal" class="button is-danger">
              {{ $t("CancelText") }}
            </button>
          </div>
        </div>
      </div>
    </customModal>
    <button @click="toggleModal" type="button">Open Modal</button>



   
  </div>
</template>

<script>
import customModal from "@/components/customModal.vue";
import { ref } from "vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    customModal,
  },
  setup() {
    const modalActive = ref(false);
    const bill = ref();
    const amount = ref();
    const baseUrl = "http://127.0.0.1:4000/";

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    // SELETED FILE TO UPLOAD
    const onBillFileChange = async (e) => {
      const seletedFile = e.target.files[0];
      bill.value = await onUploadFile(seletedFile);
    };

    // UPLOADE FILE
    const onUploadFile = async (seletedFile) => {
      const fd = new FormData();
      fd.append("file", seletedFile);
      const res = await axios.post(baseUrl + "admin-api/uploadimage", fd);
      return res.data.link.substring(14); // ❌ remove first 14 characters
    };

    return {
      modalActive,
      toggleModal,
      onBillFileChange,
      bill,
      baseUrl,
      amount,
    };
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;
}

.modal-content {
  display: flex;
  overflow: hidden;
  justify-content: center;
  width: auto;
  .modal-detail {
    .image-input {
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      border-radius: 5px;
      .modal-image-container {
        border-radius: 5px;
        height: 380px;
        width: 350px;
        .bill {
          border-radius: 5px;
          width: 100%;
          height: 100%;
        }
      }
    }
    .modal-title {
      font-size: 24px;
      color: $primary-color;
      display: flex;
      justify-content: center;
    }

    .amount-input {
      .text-input {
        padding-bottom: 10px;

        display: flex;
        .required {
          color: $alert-color;
          padding-left: 3px;
        }
      }
      input {
        border-color: $sub-border-color;
        min-width: 331px;
        width: 100%;
      }
      input:focus {
        outline: 1px solid $sub-color;
        box-shadow: none;
      }
      input:active {
        outline: 1px solid $sub-color;
        box-shadow: none;
      }
    }
    .btn-option-group {
      display: flex;
    }
  }
}
</style>