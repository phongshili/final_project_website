<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("ProfileText") }}</label>
    </div>
    <div class="form-container">
      <div class="image-form">
        <div class="input-group" @click="$refs.logoFile.click()">
          <label for="user" class="text-input"
            >{{ $t("LogoText") }}
            <p class="required">*</p></label
          >
          <div class="img-container">
            <img
              v-if="!image"
              class="profile"
              src="../../assets/default.jpg"
              alt=""
            />
            <img
              v-else
              class="profile"
              :src="baseUrl  + image"
              alt=""
            />
          </div>
          <input
            class="input is-primary"
            style="display: none"
            type="file"
            @change="onLogoFileChange"
            placeholder="Primary input"
            ref="logoFile"
          />
          <input
            class="input is-primary"
            style="display: none"
            type="text"
            v-model="image"
            placeholder="Primary input"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group isCard" @click="$refs.coverFile.click()">
          <label for="user" class="text-input"
            >{{ $t("CoverText") }}
            <p class="required">*</p></label
          >
          <div class="img-container">
            <img
              v-if="!backgroundImage"
              class="personalIDCard"
              src="../../assets/default1.jpg"
              alt=""
            />
            <img
              v-else
              class="personalIDCard"
              :src="baseUrl + backgroundImage"
              alt=""
            />
          </div>
          <input
            class="input is-primary"
            style="display: none"
            type="file"
            @change="onCoverFileChange"
            placeholder="Primary input"
            ref="coverFile"
          />
          <input
            class="input is-primary"
            style="display: none"
            type="text"
            v-model="backgroundImage"
            placeholder="Primary input"
          />
        </div>
      </div>

      <div class="input-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("CompanyNameText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="companyName"
            :placeholder="$t('CompanyNameText')"
          />
        </div>

        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ContactNameText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="contractName"
            :placeholder="$t('ContactNameText')"
          />
        </div>
      </div>
      <div class="input-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ContactPhoneText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="tel"
            :placeholder="$t('ContactPhoneText')"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("EmailText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="email"
            :placeholder="$t('EmailText')"
          />
        </div>
      </div>

      <div class="input-form">
        <!-- province dropdown -->
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProvinceText") }}
            <p class="required">*</p></label
          >
          <div class="input-area">
            <div class="select" @click="setDistrict">
              <select class="dropdown" v-model="provinceID">
                <option
                  selected
                  v-for="province in provinceArray"
                  :key="province._id"
                  :value="province._id"
                >
                  {{ province.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!--end province dropdown -->

        <div class="spacer"></div>

        <!-- district dropdown -->

        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("DistrictText") }}
            <p class="required">*</p></label
          >
          <div class="input-area">
            <div class="select">
              <select class="dropdown" v-model="districtID">
                <option
                  selected
                  v-for="district in districtArray"
                  :key="district._id"
                  :value="district._id"
                >
                  {{ district.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!--end district dropdown -->
      </div>

      <div class="input-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ERC_Text") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="erc"
            :placeholder="$t('ERC_Text')"
          />
        </div>
        <div class="spacer"></div>
        <div v-if="userInfo.type === 'admin'" class="input-group">
          <label for="user" class="text-input">{{ $t("PointText") }} </label>
          <input
            class="input is-primary"
            type="text"
            v-model="point"
            :placeholder="$t('PointText')"
          />
        </div>
      </div>

      <div class="input-group">
        <label for="user" class="text-input"
          >{{ $t("AboutUsText") }}
          <p class="required">*</p></label
        >
        <textarea
          class="medium"
          name=""
          id=""
          cols="30"
          rows="2"
          v-model="aboutUs"
          :placeholder="$t('AboutUsText')"
        ></textarea>
      </div>
      <div
        class="input-form"
        v-if="!$route.params.id && userInfo.type === 'admin'"
      >
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("PasswordText") }}
            <p class="required">*</p>
          </label>
          <input
            class="input is-primary"
            type="passowrd"
            v-model="password"
            :placeholder="$t('PasswordText')"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ConfirmPasswordText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="passowrd"
            v-model="confirmPassword"
            :placeholder="$t('ConfirmPasswordText')"
          />
        </div>
      </div>
      <div class="btn-menu">
        <button
          class="button is-success"
          @click="addEmployer"
          v-if="!$route.params.id && userInfo.type === 'admin'"
        >
          {{ $t("AddEmployerText") }}
        </button>
        <button
          class="button is-success"
          @click="updateEmployer('approve')"
          v-if="$route.params.id && userInfo.type === 'admin'"
        >
          {{ $t("ApproveText") }}
        </button>
        <button
          class="button is-link"
          @click="empUpdateProfile"
          v-if="userInfo.type === 'employee' || userInfo.type === 'employer'"
        >
          {{ $t("EditButtonText") }}
        </button>
        <div class="spacer"></div>
        <button
          class="button is-warning is-no"
          @click="updateEmployer('reject')"
          v-if="$route.params.id && userInfo.type === 'admin'"
        >
          {{ $t("RejectText") }}
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
import { reactive, toRefs, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import store from "../../store";
import useGetUser from "../../hooks/useGetUser";


export default {
  async setup() {
    const baseUrl = "http://127.0.0.1:4000/";
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const auth = store.useAuthStore();
    const userInfo = await useGetUser.getUserInfo()  
    let token = auth.getToken;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const dataSet = reactive({
      id: "",
      companyName: "",
      contractName: "",
      image: "",
      backgroundImage: "",
      aboutUs: "",
      erc: "",
      point: 100,
      status: "",
      isVerify: "",
      userTypeId: "",
      email: "",
      tel: "",
      type: "",
      password: "",
      confirmPassword: "",
      provinceArray: [],
      districtArray: [],
      provinceID: "5eb8cb58f2913809f730ce9c", //set default for province to vientian capital
      districtID: "5ec5f96ecc249b11cae0404e", // set default for district to chanthabuly
      profile: [],
    });

    // // watch if provinceID has changed do something
    watch(
      () => dataSet.provinceID,
      async () => {
        await fetchDistricts();
        // dataSet.districtID = dataSet.districtArray[0]._id;
      }
    );

    // need to refactor this code to hook
    const fetchEmployerByID = async () => {
      const res = await axios.get(
        baseUrl + "admin-api/employee-find-id/" + route.params.id
      );
      dataSet.profile = res.data.findEmpId; // 👈 get just results
      dataSet.id = dataSet.profile._id;
      dataSet.companyName = dataSet.profile.companyName;
      dataSet.contractName = dataSet.profile.contractName;
      dataSet.image = dataSet.profile.image;
      dataSet.backgroundImage = dataSet.profile.backgroundImage;
      dataSet.aboutUs = dataSet.profile.aboutUs;
      dataSet.erc = dataSet.profile.erc;
      dataSet.point = dataSet.profile.point;
      dataSet.status = dataSet.profile.status;
      dataSet.isVerify = dataSet.profile.isVerify;
      dataSet.provinceID = dataSet.profile.provinceId;
      dataSet.districtID = dataSet.profile.districtId;
      dataSet.userTypeId = dataSet.profile.userTypeId;
      dataSet.email = dataSet.profile.email;
      dataSet.tel = dataSet.profile.tel;
      dataSet.type = dataSet.profile.type;
    };

    // employer fetch profile data

    const fetchEmployerProfile = async () => {
      const res = await axios.get(baseUrl + "emp-api/employee-find-id", {
        headers,
      });
      dataSet.profile = res.data.findEmpId;

      dataSet.id = dataSet.profile.userTypeId;
      dataSet.companyName = dataSet.profile.companyName;
      dataSet.contractName = dataSet.profile.contractName;
      dataSet.image = dataSet.profile.image;
      dataSet.backgroundImage = dataSet.profile.backgroundImage;
      dataSet.aboutUs = dataSet.profile.aboutUs;
      dataSet.erc = dataSet.profile.erc;
      dataSet.point = dataSet.profile.point;
      dataSet.status = dataSet.profile.status;
      dataSet.provinceID = dataSet.profile.provinceId;
      dataSet.districtID = dataSet.profile.districtId;
      dataSet.userTypeId = dataSet.profile.userTypeId;
      dataSet.email = dataSet.profile.email;
      dataSet.tel = dataSet.profile.tel;
      dataSet.type = dataSet.profile.type;
    };

    // fetch province 
    const fetchProvinces = async () => {
      const res = await axios.get(baseUrl + "admin-api/province-get");
      dataSet.provinceArray = await res.data.provinces;
      dataSet.provinceID = dataSet.provinceArray[0]._id;
    };

    // set value to district
    const fetchDistricts = async () => {
      const res = dataSet.provinceArray.filter((e) => {
        return e._id.match(dataSet.provinceID);
      });
      dataSet.districtArray = res[0].districts;
    };

    // make sure provinceId watcher is work corrected
    const setDistrict = async () => {
      await fetchDistricts();

      if (dataSet.provinceID !== dataSet.profile.provinceId) {
        dataSet.districtID = dataSet.districtArray[0]._id;
      }
    };

    const addEmployer = async () => {
      await axios.post(baseUrl + "admin-api/employee-add", {
        companyName: dataSet.companyName,
        contractName: dataSet.contractName,
        image: dataSet.image,
        backgroundImage: dataSet.backgroundImage,
        aboutUs: dataSet.aboutUs,
        erc: dataSet.erc,
        districtId: dataSet.districtID,
        email: dataSet.email,
        tel: dataSet.tel,
        password: dataSet.password,
        point: dataSet.point,
      });
      router.go(-1);
    };
    const updateEmployer = async (rejectStaus) => {
      await axios.put(baseUrl + "admin-api/employee-update", {
        id: dataSet.userTypeId,
        companyName: dataSet.companyName,
        contractName: dataSet.contractName,
        image: dataSet.image,
        backgroundImage: dataSet.backgroundImage,
        aboutUs: dataSet.aboutUs,
        erc: dataSet.erc,
        districtId: dataSet.districtID,
        email: dataSet.email,
        tel: dataSet.tel,
        status: rejectStaus,
        point: dataSet.point,
      });
      router.go(-1);
    };

    // employer role update their profile
    const empUpdateProfile = async () => {
      await axios.put(
        baseUrl + "emp-api/employee-update",
        {
          companyName: dataSet.companyName,
          contractName: dataSet.contractName,
          image: dataSet.image,
          backgroundImage: dataSet.backgroundImage,
          aboutUs: dataSet.aboutUs,
          erc: dataSet.erc,
          districtId: dataSet.districtID,
          email: dataSet.email,
          tel: dataSet.tel,
        },
        { headers }
      );
      router.go(-1);
    };

    // SELETED FILE TO UPLOAD
    const onLogoFileChange = async (e) => {
      const seletedFile = e.target.files[0];
      dataSet.image = await onUploadFile(seletedFile);
    };
    // SELETED FILE TO UPLOAD
    const onCoverFileChange = async (e) => {
      const seletedFile = e.target.files[0];
      dataSet.backgroundImage = await onUploadFile(seletedFile);
    };
    // UPLOADE FILE
    const onUploadFile = async (seletedFile) => {
      const fd = new FormData();
      fd.append("file", seletedFile);
      const res = await axios.post(baseUrl + "admin-api/uploadimage", fd);
      return res.data.link
    };

    await fetchProvinces();

    await fetchDistricts();

    if (route.params.id && userInfo.type === "admin") await fetchEmployerByID();

    // if login by employer fetch profile
    if (userInfo.type === "employee" || userInfo.type === "employer")
      await fetchEmployerProfile();
    return {
      ...toRefs(dataSet),
      baseUrl,
      onLogoFileChange,
      onCoverFileChange,
      addEmployer,
      empUpdateProfile,
      updateEmployer,
      setDistrict,
      userInfo
    };
  },
};
</script>

<style lang="scss" scoped>
</style>