<template>
  <div class="container">
    <!-- form verify up start -->
    <div class="login">
      <div class="text-title subtitle">{{ $t("VerifyOtpText") }}</div>
      <div class="input_group">
        <input
          v-model="verifyOtp"
          class="input"
          type="text"
          :placeholder="$t('OtpCodeText')"
        />
        <div class="action-group">
          <button v-if="route.params.path ==='verifyOTP'" @click="verify" class="button btnSignIn">
            {{ $t("SubmitText") }}
          </button>
          <button v-if="route.params.path ==='resetPassword'" @click="verifyResetPassword" class="button btnSignIn">
            {{ $t("SubmitText") }}
          </button>
        </div>
      </div>
      <!-- form verify up end -->
    </div>
  </div>
</template>

<script >
import { ref } from "vue-demi";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const baseUrl = "http://127.0.0.1:4000/";

    let verifyOtp = ref();
     const verify = async () => {
        const res = await axios.post(baseUrl+'emp-api/employee-confirm-otp',{
            verifyToken: route.params.token,
            VerifyCode:verifyOtp.value,
        })
        const token = res.data.Token
     if(route.params.path ==="verifyOTP") router.push({ name: "Login"});
    };
    const verifyResetPassword = async () =>{
      const res = await axios.post(baseUrl+'emp-api/employee-verify-code',{
            verifyToken: route.params.token,
            VerifyCode:verifyOtp.value,
        })
        const token = res.data.Token
         router.push({ name: "ForgetPassword",params:{ token}});
    }
    return { verifyOtp, verify ,verifyResetPassword,route};
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30em;
  margin-right: auto;
  margin-left: auto;
  min-height: 100vh;
  .login {
    border: $border-size solid $border-color;
    // padding: 60px;
    border-radius: $border-radius;
    .line {
      background: $shadow-color;
      height: 2px;
      margin: 20px 10px;
    }
    .subtitle {
      padding: 20px 60px 0px 60px;
      font-weight: 600;
    }
    .input_group {
      padding: 10px 60px;
    }
    .action-group {
      padding: 10px 60px;
      p {
        padding-bottom: $margin-bottom;
      }
      .button {
        width: 100%;
        color: $active-font-color;
        background: $primary-color;
        &.btnSignIn {
          background: #36ab32;
        }
      }
      .button:hover {
        background: $hover-color;
      }

      .btnSignIn:hover {
        background: #36ab6d;
      }
    }
    .switcher {
      padding: 10px 60px 20px 60px;
      .languageSwitcher {
        display: flex;
        padding-left: 10px;
        p {
          padding-left: 5px;
          color: $active-color;
        }
      }

      .languageSwitcher :hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>