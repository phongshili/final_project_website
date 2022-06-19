<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("ResumeText") }}</label>
    </div>
    <div class="form-container">
      <div class="detail-form-display">

        <div class="image-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProfileText") }}
            <p class="required">*</p></label
          >
          <div class="img-container">
            <img
              v-if="!resume.image"
              class="profile"
              src="../../assets/default.jpg"
              alt=""
            />
            <img
              v-else
              class="profile"
              :src="baseUrl + '/resize-images/' + resume.image"
              alt=""
            />
          </div>
        </div>
        <div class="spacer"></div>
        <div class="input-group isCard">
          <label for="user" class="text-input"
            >{{ $t("PersonalIDCardImageText") }}
            <p class="required">*</p></label
          >
          <div class="img-container">
            <img
              v-if="!resume.image"
              class="personalIDCard"
              src="../../assets/default1.jpg"
              alt=""
            />
            <img
              v-else
              class="personalIDCard"
              :src="baseUrl + '/resize-images/' + resume.image"
              alt=""
            />
          </div>
  
        </div>
      </div>
        <hr />
        <div class="input-form">
          <div class="input-group">
            <label for="user" class="text-input"
              >{{ $t("IntroduceText") }}
            </label>
            <div class="spacerH"></div>

            <div class="data-detail">
              <p>
                {{resume.introduced}}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="input-form">
          <div class="input-group">
            <label for="user" class="text-input"
              >{{ $t("BasicInfoText") }}
            </label>
            <div class="spacerH"></div>

            <div class="data-detail">
              <p class="is-uppercase">{{ $t("FullNameText") }} : {{resume.name}} {{resume.lastname || "-"}}</p>
              <div class="spacerH"></div>
              <p class="is-uppercase">{{ $t("GenderText") }} : {{resume.gender || "-"}}</p>
                <div class="spacerH"></div>
              <p>{{ $t("BirthDateText") }} : {{resume.birthDate || "-"}}</p>
              <div class="spacerH"></div>
              <p>{{ $t("TelText") }} : {{resume.tel || "-"}}</p>
              <div class="spacerH"></div>
              <p class="is-uppercase">{{ $t("EmailText") }} : {{resume.email || "-"}}</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="input-form">
          <div class="input-group">
            <label for="user" class="text-input"
              >{{ $t("EducationText") }}
            </label>
            <div class="spacerH"></div>

            <div class="data-detail">
              <p>{{resume.education}}</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="input-form">
          <div class="input-group">
            <label for="user" class="text-input"
              >{{ $t("ExperienceText") }}
            </label>
            <div class="spacerH"></div>

            <div class="data-detail">
              <p>
               {{resume.experience}}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="input-form">
          <div class="input-group">
            <label for="user" class="text-input"
              >{{ $t("LanguageText") }}
            </label>
            <div class="spacerH"></div>

            <div class="data-detail">
              <p>{{resume.language}}</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="input-form">
          <div class="input-group">
            <label for="user" class="text-input">{{ $t("SkillsText") }} </label>
            <div class="spacerH"></div>
            <div class="data-detail">
              <p>{{resume.skill}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="spacerH max"></div>
      <div class="btn-menu">
        <button @click="updateStatus('pending')" class="button is-link" >{{$t('PenddingButtonText')}}</button>
        <div class="spacer"></div>
        <button  @click="updateStatus('approve')" class="button is-success">{{$t('ApproveButtonText')}}</button>
         <div class="spacer"></div>
         <button  @click="updateStatus('reject')" class="button is-warning is-no">{{$t('RejectText')}}</button>
         <div class="spacer"></div>
         <button @click="$router.go(-1)" class="button is-danger is-left">{{$t('BackText')}}</button> 
      </div>
    </div>
  </div>
</template>

<script>
import filterButton from "../../components/filter.vue";
import {  reactive, toRefs } from "vue";
import axios from "axios";
import { useI18n } from 'vue-i18n'
import store from "../../store";
import {useRoute,useRouter} from "vue-router"
export default {
  components: { filterButton },
  setup() {
    const {t} = useI18n()
    const baseUrl = "http://127.0.0.1:4000/";
    const auth = store.useAuthStore();
    let token = auth.getToken;
    const route = useRoute();
    const router = useRouter();
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const dataSet = reactive({

      resume: [],

    });
    // need to refactor this code to hook
    const fetchResume = async () => {
      const res = await axios.get(
       baseUrl + "emp-api/jobapplication-find-id/"+ route.params.id,{
        headers
       }
      );

      dataSet.resume = res.data.mapJobApplication; // 👈 get just results

    };

    const updateStatus = async (status) => {
       await axios.put(baseUrl + "emp-api/jobapplication-update", {
        id:dataSet.resume._id,
        jobStatus:status
       })
       router.go(-1);
    }

    fetchResume();

    return {...toRefs(dataSet),updateStatus,baseUrl};
  },
};


</script>

<style lang="scss" scoped>
.is-left{
  margin-left: auto;
}
.text-input {
  font-size: $subtitle;
  font-weight: 600;
  color: $primary-color;
}
.input-form {
  .input-group {
    padding-bottom: 0px !important;
    label {
      position: relative;
      padding-right: 5px;
    }
    label::after {
      content: "";
      width: 120px;
      position: absolute;
      height: 5px;
      background: $primary-color;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>