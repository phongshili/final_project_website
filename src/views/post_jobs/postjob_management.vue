<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
    </div>
    <div class="form-container">
      <div class="image-form">
        <div class="input-group">
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
            <img v-else class="profile" :src="baseUrl + image" alt="" />
          </div>
          <input
            class="input is-primary"
            style="display: none"
            type="text"
            v-model="image"
            placeholder="Primary input"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group isCard">
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
        <br />
        <div class="spacer" v-if="userInfo.type === 'admin'"></div>
        <!-- company dropdown -->
        <div class="input-group" v-if="userInfo.type === 'admin'">
          <label for="user" class="text-input"
            >{{ $t("CompanyNameText") }}
            <p class="required">*</p></label
          >
          <div class="input-area">
            <div class="select">
              <select
                class="dropdown"
                @click="getCompanyData"
                v-model="employer"
              >
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
      <div class="spacer" v-if="userInfo.type === 'admin'"></div>

      <div class="input-form" v-if="userInfo.type === 'admin'">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProvinceText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            disabled
            v-model="district"
            :placeholder="$t('ProvinceText')"
          />
        </div>

        <div class="spacer" v-if="userInfo.type === 'admin'"></div>
        <div class="input-group" v-if="userInfo.type === 'admin'">
          <label for="user" class="text-input"
            >{{ $t("DistrictText") }}
            <p class="required">*</p></label
          >

          <input
            class="input is-primary"
            type="text"
            disabled
            v-model="district"
            :placeholder="$t('DistrictText')"
          />
        </div>
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
                  value="parttime"
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
            disabled
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
            disabled
            :placeholder="$t('ContactPhoneText')"
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
      <div class="btn-menu">
        <button
          class="button is-success"
          @click="addPostJob"
          v-if="!$route.params.id"
        >
          {{ $t("AddPostJobText") }}
        </button>
        <button
          class="button is-link"
          @click="updatePost('online')"
          v-if="$route.params.id && status !== 'expired'"
        >
          {{ $t("EditButtonText") }}
        </button>

        <button
          @click="addPostJob"
          class="button is-success"
          v-if="$route.params.id && status === 'expired'"
        >
          {{ $t("RePostText") }}
        </button>

        <div
          class="spacer"
          v-if="$route.params.id && status === 'online'"
        ></div>
        <button
          @click="updatePost('offline')"
          class="button is-warning is-no"
          v-if="$route.params.id && status === 'online'"
        >
          {{ $t("OfflineButtonText") }}
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
import { ref, reactive, toRefs } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import moment from "moment";
import store from "../../store";
import useGetUser from "../../hooks/useGetUser";
import { useLoading } from "../../store/loading";
import { useReload } from "../../store/reload";


export default {
  async setup() {
    const { t } = useI18n();

    const baseUrl = "http://127.0.0.1:4000/";
    const route = useRoute();
    const router = useRouter();
    const auth = store.useAuthStore();
    const userInfo = await useGetUser.getUserInfo();
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    endDate.value.setMonth(startDate.value.getMonth() + 1);
    const reload = useReload();

    const loading = useLoading();

    let token = auth.getToken;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const dataSet = reactive({
      fetchPosition: [],
      fetchEmployer: [],
      provinceId: "",
      province: "",
      position: "",
      district: "",
      districtId: "",
      employer: "",
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
      id: "",
      startDate: "",
      endDate: "",
    });

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

    const fetchPosition = async () => {
      await loading.setloading(true);

      const res = await axios.get(baseUrl + "admin-api/position-get");
      dataSet.fetchPosition = res.data.getPosition;
      if (!route.params.id) dataSet.position = dataSet.fetchPosition[0]._id;
      setTimeout(() => {
        loading.setloading(false);
      }, 2000);
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
      dataSet.province = employer.provinceName;
      dataSet.provinceId = employer.provinceId;
      (dataSet.district = employer.districtName),
        (dataSet.districtId = employer.districtId);

    };

    const fetchPostByID = async () => {
      await loading.setloading(true);

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
      dataSet.id = post._id;
      dataSet.experience = post.experience;
      dataSet.startDate = post.startDate;
      dataSet.endDate = post.endDate;
      dataSet.province = post.provinceName;
      dataSet.provinceId = post.provinceId;
      (dataSet.district = post.districtName),
        (dataSet.districtId = post.districtId);
      dataSet.image = post.logo;
      dataSet.backgroundImage = post.image;
      dataSet.aboutUs = post.aboutUs;
      dataSet.email = post.email;
      dataSet.tel = post.tel;
      setTimeout(() => {
        loading.setloading(false);
      }, 2000);
    };

    // employer function

    // need to refactor this code to hook
    // duplicate code

    const fetchEmployerInfoByID = async () => {
      await loading.setloading(true);

      const res = await axios.get(baseUrl + "emp-api/employee-find-id", {
        headers,
      });
      const employer = res.data.findEmpId; // 👈 get just results
      dataSet.image = employer.image;
      dataSet.backgroundImage = employer.backgroundImage;
      dataSet.aboutUs = employer.aboutUs;
      dataSet.email = employer.email;
      dataSet.tel = employer.tel;
      dataSet.province = employer.provinceName;
      dataSet.provinceId = employer.provinceId;
      (dataSet.district = employer.districtName),
        (dataSet.districtId = employer.districtId);
      setTimeout(() => {
        loading.setloading(false);
      }, 2000);
    };

    const fetchPostEmployerByID = async () => {
      await loading.setloading(true);
      const res = await axios.get(
        baseUrl + "emp-api/postjob-find-id/" + route.params.id
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
      dataSet.id = post._id;
      dataSet.image = post.logo;
      dataSet.backgroundImage = post.image;
      dataSet.email = post.email;
      dataSet.tel = post.tel;
      dataSet.experience = post.experience;
      dataSet.province = post.provinceName;
      dataSet.provinceId = post.provinceId;
      dataSet.district = post.districtName;
      dataSet.districtId = post.districtId;
      setTimeout(() => {
        loading.setloading(false);
      }, 2000);
    };

    const addPostJob = async () => {
      await loading.setloading(true);
      if (userInfo.type === "admin")
        await axios.post(baseUrl + "admin-api/postjob-add", {
          startDate: moment(startDate.value).locale("lo").format("YYYY-MM-DD"),
          endDate: moment(endDate.value).locale("lo").format("YYYY-MM-DD"),
          image: dataSet.backgroundImage,
          logo: dataSet.image,
          gender: dataSet.gender,
          experience: dataSet.experience,
          salary: dataSet.salary,
          skill: dataSet.skills,
          education: dataSet.education,
          workTime: dataSet.workTime,
          detail: dataSet.detail,
          contractPhone: dataSet.tel,
          districtId: dataSet.districtId,
          positionId: dataSet.position,
          employeeId: dataSet.employer,
        });
      if (userInfo.type === "employee" || userInfo.type === "employer")
        await axios.post(
          baseUrl + "emp-api/postjob-add",
          {
            startDate: moment(startDate.value)
              .locale("lo")
              .format("YYYY-MM-DD"),
            endDate: moment(endDate.value).locale("lo").format("YYYY-MM-DD"),
            image: dataSet.backgroundImage,
            logo: dataSet.image,
            gender: dataSet.gender,
            experience: dataSet.experience,
            salary: dataSet.salary,
            skill: dataSet.skills,
            education: dataSet.education,
            workTime: dataSet.workTime,
            detail: dataSet.detail,
            contractPhone: dataSet.tel,
            districtId: dataSet.districtId,
            positionId: dataSet.position,
          },
          { headers }
        );
      await reload.setReload(true);

      setTimeout(() => {
        loading.setloading(false);
      }, 2000);
      router.go(-1);
    };

    const updatePost = async (status) => {
      await loading.setloading(true);

      if (userInfo.type === "admin")
        await axios.put(baseUrl + "admin-api/postjob-update", {
          id: dataSet.id,
          startDate: dataSet.startDate,
          endDate: dataSet.endDate,
          image: dataSet.backgroundImage,
          logo: dataSet.image,
          gender: dataSet.gender,
          experience: dataSet.experience,
          salary: dataSet.salary,
          skill: dataSet.skills,
          education: dataSet.education,
          workTime: dataSet.workTime,
          detail: dataSet.detail,
          contractPhone: dataSet.tel,
          status: status,
          districtId: dataSet.districtId,
          positionId: dataSet.position,
          employeeId: dataSet.employer,
        });
      if (userInfo.type === "employee" || userInfo.type === "employer")
        await axios.put(baseUrl + "emp-api/postjob-update", {
          id: dataSet.id,
          image: dataSet.backgroundImage,
          logo: dataSet.image,
          gender: dataSet.gender,
          experience: dataSet.experience,
          salary: dataSet.salary,
          skill: dataSet.skills,
          education: dataSet.education,
          workTime: dataSet.workTime,
          detail: dataSet.detail,
          contractPhone: dataSet.tel,
          status: status,
          districtId: dataSet.districtId,
          positionId: dataSet.position,
        });
      setTimeout(() => {
        loading.setloading(false);
      }, 2000);
      router.go(-1);
    };
    // get data when click select company
    const getCompanyData = async () => {
      await fetchEmployerByID();
    };

    if (route.params.id && userInfo.type === "admin") fetchPostByID();
    if (userInfo.type === "admin") {
      fetchEmployer();
    }

    if (
      (route.params.id && userInfo.type === "employee") ||
      userInfo.type === "employer"
    ) {
      fetchPostEmployerByID();
    }
    if (
      (!route.params.id && userInfo.type === "employee") ||
      userInfo.type === "employer"
    ) {
      fetchEmployerInfoByID();
    }

    fetchPosition();

    return {
      ...toRefs(dataSet),
      addPostJob,
      updatePost,
      onLogoFileChange,
      onCoverFileChange,
      getCompanyData,
      baseUrl,
      userInfo,
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