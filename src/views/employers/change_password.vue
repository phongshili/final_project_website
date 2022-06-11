<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("ChangePasswordText") }}</label>
    </div>
    <div class="form-container">
              <div class="input-group sm">
        <label for="user" class="text-input"
          >{{ $t("OldPasswordText") }}
          <p class="required">*</p>
        </label>
        <input
          class="input is-primary"
          type="text"
          :placeholder="$t('OldPasswordText')"
        />
      </div>
      <div class="input-group sm">
        <label for="user" class="text-input"
          >{{ $t("NewPasswordText") }}
          <p class="required">*</p>
        </label>
        <input
          class="input is-primary"
          type="text"
          :placeholder="$t('NewPasswordText')"
        />
      </div>
      <div class="spacer"></div>
      <div class="input-group sm">
        <label for="user" class="text-input"
          >{{ $t("ConfirmPasswordText") }}
          <p class="required">*</p></label
        >
        <input
          class="input is-primary"
          type="text"
          :placeholder="$t('ConfirmPasswordText')"
        />
      </div>
      <div class="btn-menu">
        <button class="button is-success" @click="add">SAVE</button>
        <div class="spacer"></div>
        <button class="button is-link">BACK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Datepicker from "vue3-datepicker";

export default {
  components: {
    Datepicker,
  },
  setup() {
    const firstName = ref();
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    endDate.value.setMonth(startDate.value.getMonth() + 1);
    function add() {
      console.log(firstName.value);
      console.log("end date" + endDate.value);
      console.log("start date" + startDate.value);
    }
    return { firstName, add, startDate, endDate };
  },
};
</script>

<style lang="scss" scoped>
</style>