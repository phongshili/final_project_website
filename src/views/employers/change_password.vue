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
          v-model="oldPassword"
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
          v-model="newPassword"
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
          v-model="confirmPassword"
          :placeholder="$t('ConfirmPasswordText')"
        />
      </div>
      <div class="btn-menu">
        <button class="button is-link" @click="changePassword">
          {{ $t("EditButtonText") }}
        </button>
        <div class="spacer"></div>
        <button @click="$router.go(-1)" class="button is-danger is-left">
          {{ $t("BackText") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue-demi";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const baseUrl = "http://127.0.0.1:4000/";
    let oldPassword = ref();
    let newPassword = ref();
    let confirmPassword = ref();

    const changePassword = async () => {
      // await axios.post(baseUrl+'emp-api/employee-change-password',{
      //     changePassToken: route.params.token,
      //     newPassword:newPassword.value,
      // })
      router.push({ name: "Dashboard" });
    };

    return { oldPassword, newPassword, confirmPassword, changePassword };
  },
};
</script>

<style lang="scss" scoped>
</style>