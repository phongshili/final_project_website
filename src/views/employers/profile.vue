<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("ProfileText") }}</label>
    </div>
    <div class="form-container">
      <div class="image-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("LogoText") }}
            <p class="required">*</p></label
          >
          <div class="img-container">
            <img class="profile" src="../../assets/default.jpg" alt="" />
          </div>
          <input
            class="input is-primary"
            style="display: none"
            type="text"
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
            <img class="personalIDCard" src="../../assets/default1.jpg" alt="" />
          </div>
          <input
            class="input is-primary"
            style="display: none"
            type="text"
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
          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button btndropdown"
                aria-haspopup="true"
                aria-controls="dropdown-menu3"
              >
                <span>{{ $t("ProvinceText") }}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item"> Overview </a>
                <a href="#" class="dropdown-item"> Modifiers </a>
                <a href="#" class="dropdown-item"> Grid </a>
              </div>
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
          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button btndropdown"
                aria-haspopup="true"
                aria-controls="dropdown-menu3"
              >
                <span>{{ $t("DistrictText") }}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item"> Overview </a>
                <a href="#" class="dropdown-item"> Modifiers </a>
                <a href="#" class="dropdown-item"> Grid </a>
              </div>
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
            :placeholder="$t('ERC_Text')"
          />
        </div>
                <div class="spacer"></div>
        <div v-if="$userInfo.type === 'admin'" class="input-group">
          <label for="user" class="text-input"
            >{{ $t("PointText") }}
         </label
          >
          <input
            class="input is-primary"
            type="text"
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
          v-model="firstName"
          :placeholder="$t('AboutUsText')"
        ></textarea>
      </div>
            <div class="input-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("PasswordText") }}
             <p class="required">*</p>
          </label
          >
          <input
            class="input is-primary"
            type="text"
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
            type="text"
            :placeholder="$t('ConfirmPasswordText')"
          />
        </div>
      </div>
      <div class="btn-menu">
        <button class="button is-success">SAVE</button>
        <div class="spacer"></div>
        <button class="button is-link">BACK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Datepicker from "vue3-datepicker";

export default {
  components: {
    Datepicker,
  },
  setup() {
    const firstName = ref();
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    endDate.value.setMonth(startDate.value.getMonth() + 1);
    function add() {
      console.log(firstName.value);
      console.log("end date" + endDate.value);
      console.log("start date" + startDate.value);
    }
    return { firstName, add, startDate, endDate };
  },
};
</script>

<style lang="scss" scoped>
</style>