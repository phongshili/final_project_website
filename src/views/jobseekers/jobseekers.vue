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
              v-if="!imageCard"
              class="personalIDCard"
              src="../../assets/default1.jpg"
              alt=""
            />
            <img
              v-else
              class="personalIDCard"
              :src="baseUrl + '/resize-images/' + imageCard"
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
            v-model="imageCard"
            placeholder="Primary input"
          />
        </div>
      </div>
      <div class="input-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("FirstNameText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="name"
            :placeholder="$t('FirstNameText')"
          />
        </div>

        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("LastNameText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="lastname"
            :placeholder="$t('LastNameText')"
          />
        </div>
      </div>
      <div class="input-form">
        <!-- gender dropdown -->
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("GenderText") }}
            <p class="required">*</p></label
          >
          <div class="input-area">
            <div class="select">
              <select class="dropdown" v-model="gender">
                <option  name="gender" value="male">{{ $t("MaleText") }}</option>
                <option name="gender" value="male">{{ $t("FemaleText") }}</option>
                <option name="gender" value="other">{{ $t("OtherText") }}</option>
              </select>
            </div>
          </div>
        </div>
        <!--end gender dropdown -->

        <div class="spacer"></div>
        {{birthDate}}
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("BirthDateText") }}
            <p class="required">*</p></label
          >

          <!-- <input
            class="input is-primary"
            type="text"
            v-model="birthDate"
            :placeholder="$t('BirthDateText')"
          /> -->
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
            >{{ $t("CurrentProvinceText") }}
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
            >{{ $t("CurrentDistrictText") }}
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
            >{{ $t("PersonalIDNumberText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="idCard"
            :placeholder="$t('PersonalIDNumberText')"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("LanguageText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="language"
            :placeholder="$t('LanguageText')"
          />
        </div>
      </div>
      <div class="input-form">
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
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ExperienceText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="experience"
            :placeholder="$t('ExperienceText')"
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
            v-model="skill"
            :placeholder="$t('SkillsText')"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("IntroduceText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            v-model="introduce"
            :placeholder="$t('IntroduceText')"
          />
        </div>
      </div>

      <div class="btn-menu">
        <button class="button is-success" @click="updateEmployer('approve')">
          {{ $t("ApproveText") }}
        </button>
        <div class="spacer"></div>
        <button @click="$router.go(-1)" class="button is-danger">
          {{ $t("BackText") }}
        </button>
        <div class="spacer"></div>
        <button class="button is-warning" @click="updateEmployer('reject')">
          {{ $t("RejectText") }}
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
//TODO: add date picker
export default {

  setup() {
    const baseUrl = "http://127.0.0.1:4000/";
    const route = useRoute();
    const { t } = useI18n();
    const dataSet = reactive({
      fetchProvinces: [],
      fetchDistricts: 0,
      provinceIndex: 0,
      district: "",
      gender: "",
      userTypeId:'',
      name:'',
      lastname:'',
      birthDate:'',
      idCard:'',
      imageCard:'',
      image:'',
      experience:'',
      education:'',
      language:'',
      skill:'',
      status:'approve',
      comment:'',
      positionId:'',
      districtId:'',
      email:'',
      tel:'',
      introduce:'',
      seeker : [],
      id:''
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

    const fetchProvinces = async () => {
      const res = await axios.get(baseUrl + "admin-api/province-get");
      dataSet.fetchProvinces = await res.data.provinces;
      dataSet.fetchDistricts = await dataSet.fetchProvinces[
        dataSet.provinceIndex
      ].districts;
      dataSet.district = await dataSet.fetchDistricts[0]._id;
    };

    // const updateJobSeeker = async () =>{
    //    await axios.get(baseUrl + "admin-api/seeker-get",{

    //   });

    // }

    const fetchSeekerByID = async () =>{
      const res = await axios.get(baseUrl + "admin-api/seeker-find-id/"+ route.params.id)
      const dataSeeker = res.data.mapSeeker
      dataSet.id = dataSeeker._id
      dataSet.name = dataSeeker.name
      dataSet.lastname = dataSeeker.lastname
      dataSet.birthDate = dataSeeker.birthDate
      dataSet.idCard = dataSeeker.idCard
      dataSet.image = dataSeeker.image
      dataSet.imageCard = dataSeeker.imageCard
      dataSet.experience = dataSeeker.experience
      dataSet.gender = (dataSeeker.gender)?  dataSet.gender = 'other' : dataSet.gender = dataSeeker.gender

      dataSet.education = dataSeeker.education
      dataSet.language = dataSeeker.language
      dataSet.skill = dataSeeker.skill
      dataSet.positionId = dataSeeker.positionId
      dataSet.districtId = dataSeeker.districtId
      dataSet.email = dataSeeker.email
      dataSet.status = dataSeeker.status
      dataSet.tel = dataSeeker.tel

    }
    fetchSeekerByID()
    fetchProvinces()
    return {
      ...toRefs(dataSet),
      baseUrl
    };
  },
};
</script>

<style lang="scss" scoped>
</style>