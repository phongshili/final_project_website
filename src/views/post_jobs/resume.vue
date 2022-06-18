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
            </label>
            <div class="img-container">
              <img class="profile" src="../../assets/default.jpg" alt="" />
            </div>
          </div>
          <div class="spacer"></div>
          <div class="input-group isCard">
            <label for="user" class="text-input"
              >{{ $t("PersonalIDCardImageText") }}
            </label>
            <div class="img-container">
              <img
                class="personalIDCard"
                src="../../assets/default1.jpg"
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laboriosam ipsa perferendis dolorum, odit fugiat provident
                atque, molestias minima illo eligendi et quia non excepturi
                maiores quasi consequatur dignissimos! Deleniti, laboriosam.
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
              <p>{{ $t("FullNameText") }} : Phongshili Aliyavong</p>
              <div class="spacerH"></div>
              <p>{{ $t("BirthDateText") }} : 11/2/199</p>
              <div class="spacerH"></div>
              <p>{{ $t("TelText") }} : 96769300</p>
              <div class="spacerH"></div>
              <p>{{ $t("EmailText") }} : Phongshili.aliyavong@gmail.com</p>
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
              <p>Master Degree Of Computer Science 2020</p>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                voluptatibus veniam perspiciatis. Impedit laboriosam ea
                explicabo ratione.
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
              <p>Lao,English</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="input-form">
          <div class="input-group">
            <label for="user" class="text-input">{{ $t("SkillsText") }} </label>
            <div class="spacerH"></div>
            <div class="data-detail">
              <p>Js, Node, Flutter</p>
            </div>
          </div>
        </div>
      </div>
      <div class="spacerH max"></div>
      <div class="btn-menu">
        <button class="button is-link" >{{$t('PenddingButtonText')}}</button>
        <div class="spacer"></div>
        <button class="button is-success">{{$t('ApproveButtonText')}}</button>
         <div class="spacer"></div>
         <button class="button is-warning is-no">{{$t('RejectText')}}</button>
         <div class="spacer"></div>
         <button @click="$router.go(-1)" class="button is-danger is-left">{{$t('BackText')}}</button> 
      </div>
    </div>
  </div>
</template>

<script>
import filterButton from "../../components/filter.vue";
export default {
  components: {
    filterButton,
  },
  data: () => ({
    postJobs: {},
    postJobsTotal: 0,
    items: [
      {
        id: 1,
        value: "Approve",
      },
      {
        id: 2,
        value: "Pendding",
      },
      {
        id: 1,
        value: "Reject",
      },
    ],
  }),
  created() {
    this.fetchPostJob();
  },
  methods: {
    async fetchPostJob() {
      const res = await this.$axios.get(`${this.$api}/admin-api/postjob-get`);
      this.postJobs = res.data.mapPostJob;
      this.postJobsTotal = res.data.total;
    },
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