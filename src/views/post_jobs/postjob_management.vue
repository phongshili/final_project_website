<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
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
        <!-- position dropdown -->
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("PositionText") }}
            <p class="required">*</p></label
          >
          <div class="input-area">
            <div class="select">
              <select class="dropdown" v-model="position">
                <option
                  selected
                  v-for="(position, index) in fetchPosition"
                  :key="index"
                  :value="position._id"
                >
                  {{ position.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!--end position dropdown -->
        <br>
        <div class="spacer" v-if="$userInfo.type === 'admin'"></div>
        <!-- company dropdown -->
        <div class="input-group" v-if="$userInfo.type === 'admin'">
          <label for="user" class="text-input"
            >{{ $t("CompanyNameText") }}
            <p class="required">*</p></label
          >
          <div class="input-area">
            <div class="select">
              <select class="dropdown" v-model="employer">
                <option
                  selected
                  v-for="(employer, index) in fetchEmployer"
                  :key="index"
                  :value="employer._id"
                >
                  {{ employer.companyName }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!--end company dropdown -->
      </div>
      <div class="spacer" v-if="$userInfo.type === 'admin'"></div>

      <div class="input-form" v-if="$userInfo.type === 'admin'">
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

        <div class="spacer" v-if="$userInfo.type === 'admin'"></div>
        <!-- district dropdown -->
        <div class="input-group" v-if="$userInfo.type === 'admin'">
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
        <div class="input-group is-check-box">
          <div class="check-box-group">
            <label for="user" class="text-input"
              >{{ $t("GenderText") }}
              <p class="required">*</p></label
            >
            <div class="spacerH"></div>
            <div class="check-list-group">
              <label class="checkbox">
                <input
                  type="checkbox"
                  name="gender"
                  value="male"
                  v-model="gender"
                />
                <div class="spacer s"></div>
                {{ $t("MaleText") }}
              </label>
              <div class="spacer"></div>
              <label class="checkbox">
                <input
                  type="checkbox"
                  name="gender"
                  value="female"
                  v-model="gender"
                />

                <div class="spacer s"></div>
                {{ $t("FemaleText") }}
              </label>
              <div class="spacer"></div>
              <label class="checkbox">
                <input
                  type="checkbox"
                  name="gender"
                  value="other"
                  v-model="gender"
                />

                <div class="spacer s"></div>
                {{ $t("OtherText") }}
              </label>
            </div>
          </div>
          <div class="spacer m"></div>
          <div class="check-box-group">
            <label for="user" class="text-input"
              >{{ $t("WorkTimeText") }}
              <p class="required">*</p></label
            >
            <div class="spacerH"></div>
            <div class="check-list-group">
              <label class="checkbox">
                <input
                  type="checkbox"
                  name="workTime"
                  value="fulltime"
                  v-model="workTime"
                />
                <div class="spacer s"></div>
                {{ $t("FullTimeText") }}
              </label>
              <div class="spacer"></div>
              <label class="checkbox">
                <input
                  type="checkbox"
                  name="workTime"
                  value="pasttime"
                  v-model="workTime"
                />

                <div class="spacer s"></div>
                {{ $t("PartTimeText") }}
              </label>
            </div>
          </div>
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
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("SalaryText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="salary"
            :placeholder="$t('SalaryText')"
          />
        </div>

        <div class="spacer"></div>
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
      <div class="input-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("SkillsText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="skills"
            :placeholder="$t('SkillsText')"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("EducationText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="education"
            :placeholder="$t('EducationText')"
          />
        </div>
      </div>
      <div class="input-group">
        <label for="user" class="text-input"
          >{{ $t("ExperienceText") }}
          <p class="required">*</p></label
        >
        <textarea
          class="medium"
          name=""
          id=""
          cols="30"
          rows="2"
          v-model="experience"
          :placeholder="$t('ExperienceText')"
        ></textarea>
      </div>
      <div class="input-group">
        <label for="user" class="text-input"
          >{{ $t("DetailText") }}
          <p class="required">*</p></label
        >
        <textarea
          class="medium"
          name=""
          id=""
          cols="30"
          rows="2"
          v-model="detail"
          :placeholder="$t('DetailText')"
        ></textarea>
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

      <div class="btn-menu">
        <button
          class="button is-success"
          @click="addPostJob"
          v-if="!$route.params.id"
        >
          {{ $t("AddPostJobText") }}
        </button>
        <button class="button is-link" v-if="$route.params.id">
          {{ $t("EditButtonText") }}
        </button>
        <div
          class="spacer"
          v-if="$route.params.id && status === 'expired'"
        ></div>
        <button
          class="button is-success"
          v-if="$route.params.id && status === 'expired'"
        >
          {{ $t("RePostText") }}
        </button>

        <div class="spacer"></div>
        <button @click="$router.go(-1)" class="button is-danger">
          {{ $t("BackText") }}
        </button>
        <div class="spacer"></div>
        <button
          class="button is-warning"
          v-if="$route.params.id && status === 'online'"
        >
          {{ $t("OfflineButtonText") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import moment from 'moment';
export default {
  setup() {
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    endDate.value.setMonth(startDate.value.getMonth() + 1);
  
    const baseUrl = "http://127.0.0.1:4000/";
    const { t } = useI18n();
    const route = useRoute();

    const dataSet = reactive({
      fetchProvinces: [],
      fetchPosition: [],
      fetchEmployer: [],
      postByID: [],
      fetchDistricts: 0,
      provinceIndex: 0,
      provinceId: "",
      position: "",
      district: "",
      employer: "",
      employerById: [],
      facebook: "",
      link: "",
      image: "",
      backgroundImage: "",
      aboutUs: "",
      tel: "",
      email: "",
      detail: "",
      education: "",
      skills: "",
      salary: "",
      status: "",
      workTime: [],
      gender: [],
      experience: "",
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
    watch(
      //TODO: bug sometime need to handle
      () => dataSet.employer,
      () => {
        fetchEmployerByID();
      }
    );

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

    const fetchProvinces = async () => {
      const res = await axios.get(baseUrl + "admin-api/province-get");
      dataSet.fetchProvinces = await res.data.provinces;
      dataSet.fetchDistricts = await dataSet.fetchProvinces[
        dataSet.provinceIndex
      ].districts;
      dataSet.district = await dataSet.fetchDistricts[0]._id;
    };

    const fetchPosition = async () => {
      const res = await axios.get(baseUrl + "admin-api/position-get");
      dataSet.fetchPosition = res.data.getPosition;
      if (!route.params.id) dataSet.position = dataSet.fetchPosition[0]._id;
    };

    const fetchEmployer = async () => {
      const res = await axios.get(baseUrl + "admin-api/employee-get");
      dataSet.fetchEmployer = res.data.mapEmp; // 👈 get just results
      if (!route.params.id) dataSet.employer = dataSet.fetchEmployer[0]._id;
      if (!route.params.id) fetchEmployerByID();
    };
    // need to refactor this code to hook
    const fetchEmployerByID = async () => {
      const res = await axios.get(
        baseUrl + "admin-api/employee-find-id/" + dataSet.employer
      );
      const employer = res.data.findEmpId; // 👈 get just results
      dataSet.image = employer.image;
      dataSet.backgroundImage = employer.backgroundImage;
      dataSet.aboutUs = employer.aboutUs;
      dataSet.email = employer.email;
      dataSet.tel = employer.tel;
      dataSet.link = employer.link;
      dataSet.facebook = employer.facebook;
    };

    const fetchPostByID = async () => {
      const res = await axios.get(
        baseUrl + "admin-api/postjob-find-id/" + route.params.id
      );
      const post = res.data.findPostJobId;
      dataSet.employer = post.employeeId;
      dataSet.position = post.positionId;
      dataSet.salary = post.salary;
      dataSet.status = post.status;
      dataSet.skills = post.skill;
      dataSet.gender = post.gender;
      dataSet.workTime = post.workTime;
      dataSet.education = post.education;
      dataSet.detail = post.detail;
    };

    const addPostJob = async () => {
      await axios.post(baseUrl + "admin-api/postjob-add", {      
        startDate: moment(startDate.value).locale('lo').format("YYYY-MM-DD"),
        endDate: moment(endDate.value).locale('lo').format("YYYY-MM-DD"),
        image: dataSet.backgroundImage,
        logo: dataSet.image,
        gender: dataSet.gender,
        experience: dataSet.experience,
        skill: dataSet.skills,
        education: dataSet.education,
        workTime: dataSet.workTime,
        detail: dataSet.detail,
        contractPhone: dataSet.tel,
        provinceId: '5eb8cb58f2913809f730ce9f',
        positionId: dataSet.position,
        employeeId: dataSet.employer,
      });
    };

    if (route.params.id) fetchPostByID();

    fetchEmployer();
    fetchPosition();
    fetchProvinces();

    return {
      ...toRefs(dataSet),
      addPostJob,
      onLogoFileChange,
      onCoverFileChange,
      baseUrl,
      startDate,
      endDate,
      
    };
  },
};
</script>

<style lang="scss" scoped>
.check-list-group {
  display: flex;
  .checkbox {
    display: flex;
    align-items: center;
    input {
      min-width: 0 !important;
      width: auto !important;
      padding-right: 5px;
    }
  }
}
</style>