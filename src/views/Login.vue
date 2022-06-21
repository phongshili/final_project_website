<template>
  <div class="container">
    <!-- form login start -->
    <div class="login">
      <div class="text-title subtitle">{{ $t("LoginTitleText") }}</div>
      <div class="logo">
        <div class="logo-image">
          <img
            src="../assets/jibjib_icon.png"
            alt=""
          />
        </div>
        <div class="text-title">
          Job <br />
          Management
        </div>
      </div>
      <div class="input_group">
        <input
          v-model="email"
          class="input"
          type="text"
          :placeholder="$t('Emailplaceholder')"
        />
        <input
          v-model="password"
          class="input"
          type="password"
          :placeholder="$t('Passwordplaceholder')"
        />
      </div>

      <div class="action-group">
        <div class="option-group">
          <p
            @click="
              $router.push({ name: 'ReqToken', params: { path: 'verifyOTP' } })
            "
            class="text-right verify"
          >
            {{ $t("VerifyOtpText") }}
          </p>
          <div class="spacer s"></div>

          <p>{{ $t("OrText") }}</p>
          <div class="spacer s"></div>
          <p
            @click="
              $router.push({
                name: 'ReqToken',
                params: { path: 'resetPassword' },
              })
            "
            class="text-right verify"
          >
            {{ $t("ForgetPassword") }}
          </p>
        </div>

        <button @click="login" class="button">
          {{ $t("LoginButtonText") }}
        </button>
        <div class="line"></div>

        <button
          class="button btnSignIn"
          @click="$router.push({ name: 'SignIn' })"
        >
          {{ $t("CreateNewAccountText") }}
        </button>
      </div>

      <div class="switcher">
        <!-- if getDefaultLanguage is en show "la" button -->
        <label
          class="languageSwitcher"
          v-if="storeSwitcher.$state.setLanguage == 'en'"
        >
          {{ $t("OfferedInText") }}
          <p @click="storeSwitcher.languageSwitch('la')">ລາວ</p>
        </label>
        <!-- if getDefaultLanguage is en show "en" button -->
        <label class="languageSwitcher" v-else>
          {{ $t("OfferedInText") }}
          <p @click="storeSwitcher.languageSwitch('en')">English (US)</p>
        </label>
      </div>
    </div>
    <!-- form login end -->
  </div>
</template>

<script >
import { ref } from "vue-demi";
import { useAuthStore, useLanguageSwitcher } from "../store";

export default {
  setup() {
    let email = ref();
    let password = ref();
    const store = useAuthStore();
    const storeSwitcher = useLanguageSwitcher();
    const login = async () => {
      await store.authLogin(email.value, password.value);
    };
    return { email, password, login, storeSwitcher };
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
    padding: 60px;
    border-radius: $border-radius;
    .line {
      background: $shadow-color;
      height: 2px;
      margin: 20px 0px;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5em;
      .logo-image {
        width: 8rem;
        img {
          border-radius: $img-radius;
        }
      }
    }
    .action-group {
      p {
        padding-bottom: $margin-bottom;
      }
      p:hover {
        cursor: pointer;
        text-decoration: underline;
      }
      .option-group {
        display: flex;
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
      padding-top: 10px;
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