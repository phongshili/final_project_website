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
              :src="baseUrl + '/resize-images/' + image"
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
              :src="baseUrl + '/resize-images/' + backgroundImage"
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

      <div class="input-form" v-if="fetchProvinces">
        <!-- province dropdown -->
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProvinceText") }}
            <p class="required">*</p></label
          >
          <div class="input-area">
            <div class="select">
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
              <select class="dropdown" v-model="district">
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
        <div v-if="$userInfo.type === 'admin'" class="input-group">
          <label for="user" class="text-input">{{ $t("PointText") }} </label>
          <input
            class="input is-primary"
            type="text"
            v-model="point"
            :placeholder="$t('PointText')"
          />
        </div>
      </div>
      <div class="input-form">
        <div class="input-group">
          <label for="user" class="text-input">{{ $t("FacebookText") }} </label>
          <input
            class="input is-primary"
            type="text"
            v-model="facebook"
            :placeholder="$t('FacebookText')"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("FacebookLinkText") }}
          </label>
          <input
            class="input is-primary"
            type="text"
            v-model="link"
            :placeholder="$t('FacebookLinkText')"
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
      <div class="input-form" v-if="!$route.params.id">
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
          v-if="!$route.params.id"
        >
          {{ $t("AddEmployerText") }}
        </button>
        <button class="button is-success" @click="updateEmployer" v-else>
          {{ $t("ApproveText") }}
        </button>
        <div class="spacer"></div>
        <button @click="$router.go(-1)" class="button is-link">
          {{ $t("BackText") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
export default {
  setup() {
    const baseUrl = "http://127.0.0.1:4000/";
    const { t } = useI18n();
    const route = useRoute();
    const dataSet = reactive({
      id: "",
      companyName: "",
      contractName: "",
      image: "",
      backgroundImage: "",
      aboutUs: "",
      erc: "",
      point: "",
      status: "",
      isVerify: "",
      fetchProvinces: [],
      fetchDistricts: 0,
      district: "",
      userTypeId: "",
      email: "",
      tel: "",
      type: "",
      provinceIndex: 0,
      facebook: "",
      link: "",
      password: "",
      confirmPassword: "",
    });

    watch(
      //TODO: bug sometime need to handle
      () => dataSet.provinceIndex,
      () => {
        dataSet.fetchDistricts =
          dataSet.fetchProvinces[dataSet.provinceIndex].districts;
        dataSet.district = dataSet.fetchDistricts[0]._id;
      }
    );

    // need to refactor this code to hook
    const fetchEmployerByID = async () => {
      const res = await axios.get(
        baseUrl + "admin-api/employee-find-id/" + route.params.id
      );
      const employer = res.data.findEmpId; // 👈 get just results
      dataSet.id = employer.userTypeId;
      dataSet.companyName = employer.companyName;
      dataSet.contractName = employer.contractName;
      dataSet.image = employer.image;
      dataSet.backgroundImage = employer.backgroundImage;
      dataSet.aboutUs = employer.aboutUs;
      dataSet.erc = employer.erc;
      dataSet.point = employer.point;
      dataSet.status = employer.status;
      dataSet.isVerify = employer.isVerify;
      dataSet.district = employer.district;
      // find index
      const selectedProvinceId = employer.provinceId;
      const findeProvinceIndex = dataSet.fetchProvinces.findIndex(
        (el) => selectedProvinceId === el._id
      );
      dataSet.provinceIndex = findeProvinceIndex;
      dataSet.district = employer.districtId;
      dataSet.userTypeId = employer.userTypeId;
      dataSet.email = employer.email;
      dataSet.tel = employer.tel;
      dataSet.type = employer.type;
      dataSet.link = employer.link;
      dataSet.facebook = employer.facebook;
    };

    const fetchProvinces = async () => {
      const res = await axios.get(baseUrl + "admin-api/province-get");
      dataSet.fetchProvinces = await res.data.provinces;
      dataSet.fetchDistricts = await dataSet.fetchProvinces[
        dataSet.provinceIndex
      ].districts;
      dataSet.district = await dataSet.fetchDistricts[0]._id;
    };

    const addEmployer = async () => {
      await axios.post(baseUrl + "admin-api/employee-add", {
        companyName: dataSet.companyName,
        contractName: dataSet.contractName,
        image: dataSet.image,
        backgroundImage: dataSet.backgroundImage,
        facebook: dataSet.facebook,
        link: dataSet.link,
        aboutUs: dataSet.aboutUs,
        erc: dataSet.erc,
        districtId: dataSet.district,
        email: dataSet.email,
        tel: dataSet.tel,
        password: dataSet.password,
        isVerify: true,
        point: dataSet.point,
      });
    };
    const updateEmployer = async () => {
      await axios.put(baseUrl + "admin-api/employee-update", {
        id: dataSet.id,
        companyName: dataSet.companyName,
        contractName: dataSet.contractName,
        image: dataSet.image,
        backgroundImage: dataSet.backgroundImage,
        facebook: dataSet.facebook,
        link: dataSet.link,
        aboutUs: dataSet.aboutUs,
        erc: dataSet.erc,
        districtId: dataSet.district,
        email: dataSet.email,
        tel: dataSet.tel,
        status: "approve",
        point: dataSet.point,
      });
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
      return res.data.link.substring(14); // ❌ remove first 14 characters
    };

    fetchProvinces();
    if (route.params.id) fetchEmployerByID();

    return {
      ...toRefs(dataSet),
      baseUrl,
      onLogoFileChange,
      onCoverFileChange,
      addEmployer,
      updateEmployer,
    };
  },
};
</script>

<style lang="scss" scoped>
select {
  font-family: $font;
}
</style>