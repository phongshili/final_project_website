<template>
  <div class="container">
    <!-- form sign up start -->
    <div class="login">
      <div class="text-title subtitle">{{ $t("SignUpText") }}</div>
        <div class="line"></div>
      <div class="input_group">
        <input
          v-model="email"
          class="input"
          type="text"
          :placeholder="$t('CompanyNameText')"
        />
        <input
          v-model="email"
          class="input"
          type="text"
          :placeholder="$t('ContactNameText')"
        />
        <input
          v-model="password"
          class="input"
          type="email"
          :placeholder="$t('EmailText')"
        />
        <input
          v-model="password"
          class="input"
          type="password"
          :placeholder="$t('Passwordplaceholder')"
        />
        <input
          v-model="password"
          class="input"
          type="password"
          :placeholder="$t('ConfirmPasswordText')"
        />
      </div>

      <div class="action-group">
        <button @click="signIn" class="button btnSignIn">
          {{ $t("CreateNewAccountText") }}
        </button>
        <div class="line"></div>
          <button @click="$router.push({name:'Login'})" class="button">
          {{ $t("LoginButtonText") }}
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
    <!-- form sign up end -->
  </div>
</template>

<script >
import { ref } from "vue-demi";
import { useAuthStore, useLanguageSwitcher } from "../../store";
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    let email = ref();
    let password = ref();
    const store = useAuthStore();
    const storeSwitcher = useLanguageSwitcher();
    const signIn = async () => {
      router.push({name:'Verify'})
    };
    return { email, password, signIn, storeSwitcher };
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