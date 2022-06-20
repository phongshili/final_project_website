<template>
  <div class="container">
    <!-- form sign up start -->
    <div class="login">
      <div class="text-title subtitle">{{ $t("SignUpText") }}</div>
      <div class="line"></div>
      <div class="input_group">
        <input
          v-model="companyName"
          class="input"
          type="text"
          :placeholder="$t('CompanyNameText')"
        />
        <input
          v-model="contractName"
          class="input"
          type="text"
          :placeholder="$t('ContactNameText')"
        />
           <input
          v-model="tel"
          class="input"
          type="number"
          :placeholder="$t('TelText')"
        />
        <!-- dropdown  -->
        <div class="input-area">
          <div class="select" @click="getDistrictData">
            <select class="dropdown" v-model="provinceIndex">
              <option
                selected
                v-for="(province, index) in fetchProvinces"
                :key="index"
                :value="index"
              >
                {{ province.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="spacerH m"></div>
        <div class="input-area">
          <div class="select">
            <select class="dropdown" v-model="districtId">
              <option
                selected
                v-for="district in fetchDistricts"
                :key="district._id"
                :value="district._id"
              >
                {{ district.name }}
              </option>
            </select>
          </div>
        </div>
         <div class="spacerH m"></div>
        <!-- end dropdown -->
        <input
          v-model="email"
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
          v-model="confirmPassword"
          class="input"
          type="password"
          :placeholder="$t('ConfirmPasswordText')"
        />

        
      </div>

      <div class="action-group">
        <button @click="register" class="button btnSignIn">
          {{ $t("CreateNewAccountText") }}
        </button>
        <div class="line"></div>
        <button @click="$router.push({ name: 'Login' })" class="button">
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
import { reactive, toRefs } from "vue-demi";
import { useLanguageSwitcher } from "../../store";
import { useRouter } from "vue-router";
import axios from "axios";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const router = useRouter();
    const storeSwitcher = useLanguageSwitcher();
    const baseUrl = "http://127.0.0.1:4000/";
    const { t } = useI18n();
    const dataSet = reactive({
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      contractName: "",
      districtId: "",
      tel: "",
      fetchProvinces: [],
      fetchDistricts: 0,
      provinceIndex: 0,
    });
    const fetchProvinces = async () => {
      const res = await axios.get(baseUrl + "admin-api/province-get");
      dataSet.fetchProvinces = await res.data.provinces;
      dataSet.fetchDistricts = await dataSet.fetchProvinces[
        dataSet.provinceIndex
      ].districts;
      dataSet.districtId = await dataSet.fetchDistricts[0]._id;
    };
    //get district data when select province
    const getDistrictData = async () => {
      dataSet.fetchDistricts =
        dataSet.fetchProvinces[dataSet.provinceIndex].districts;
      dataSet.districtId = dataSet.fetchDistricts[0]._id;
    };

    fetchProvinces();

    const register = async () => {

    const res = await axios.post(baseUrl +'emp-api/employee-add',{
      email: dataSet.email.toLowerCase(),
      password: dataSet.password,
      companyName: dataSet.companyName.toLowerCase(),
      contractName: dataSet.contractName.toLowerCase(),
      districtId: dataSet.districtId,
      tel: dataSet.tel,
      })
      const token = res.data.Token
      router.push({ name: "Verify",params:{token,path:"verifyOTP"} });
    };
    return { ...toRefs(dataSet), register, storeSwitcher, getDistrictData };
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
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
      }

      input[type="number"] {
        -moz-appearance: textfield; /* Firefox */
      }
      .input-area{
        .select{
          width: 100%;
          select{
             width: 100%;
          }
        }
      }
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