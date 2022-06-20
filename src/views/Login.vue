<template>
  <div class="container">
    <!-- form login start -->
    <div class="login">
      <div class="text-title subtitle">{{ $t("LoginTitleText") }}</div>
      <div class="logo">
        <div class="logo-image">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADdCAMAAACc/C7aAAAAaVBMVEXDw8MAAADGxsaXl5fJycnMzMxSUlKRkZF1dXV5eXnCwsIFBQWlpaV+fn66urqurq5dXV1sbGxMTEyKiopXV1czMzOcnJwaGhqoqKiEhIQlJSUrKysODg5mZmZHR0ezs7M7OzsVFRU5OTmFwHepAAAC+klEQVR4nO3bi1KjMBSAYXIarIbea2uttVXf/yE36Q0qobrITHP0/2Z2Zt2xDP+GQEDMMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANQ56dCtY+JcZge9zgzsrXvipGc61EtzLO29KbpKLMx9mkPpI83H410XFiblyGFufy7Ph0lHPnSya/aByFuqRv7sSqchUvwV83k4EHFtt6QhcrwOl4GXZdv9VBApq3CdK/w1c9nykNUQ+XK6pG/abin5SFmWy5Z+u6FMP7K6unttt6cKIqflSE4a9tQd/zRtKflI6ZeRw6Y9deFS2ryl5COzUXkzMWoIcZm45bixUkGkfd6PormyyBMZPxkzaVouKIjM7PAwjtPm/XRP4Rse8/hgaoh0djzdbl9XeePJxc7CUBdmHi/REOkPx3Bb2DTlnOwP6L34vNQReZ3szqffRXRa/oJIcetzpJnksS2pj3T5pPrIqmfr6wL9kbZvynWf/8uuPi21Rzrxa4WijCzMW/0j6iKdV/lSZPH5Ges0V3+4flqi+uV77Ql07QmCtkg7GlcumM4uI0/ZC+UjGe67FpVl+qhWGGw/f0pRpIS99aeWjTtV2rdopBleTktNkZkMwvmzMHf20BCaY42FWV3MXFWR2eZY8ezvpY/N8aF8UhuZz84jtV+Iu/d4YfiGu+oHFUX6e43i1LDODs1FfCT9P8+lXN7piZRxNWOS23nTOB7syvsRPZHZ+qKhv2uckMfBLqelmsjLew1/anlpOlbLwT5vSUeks/2rQVG9U5eSyLC0+f+3JE53XToiRT6+OjhjPjRFunz6dVHM9DAtVURG7zW+ZbAfSw2R0mpCHvi1vFMRabctC/1/zdaKisjTTwnaRIYfhCmIdHbQunF/Rl5J8pEizfca37Pxkzr5yNnXHdfNJPGRHNrRvP9D81HqkbnNO5D2W5K//X1XFyK7kuyby3/iHXTp8rcJVmk2/onfCwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALi1f4DsKck70eEzAAAAAElFTkSuQmCC"
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