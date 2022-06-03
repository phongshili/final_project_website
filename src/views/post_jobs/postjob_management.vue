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
            <img
              class="personalIDCard"
              src="../../assets/default1.jpg"
              alt=""
            />
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
        <!-- position dropdown -->
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("PositionText") }}
            <p class="required">*</p></label
          >
          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button btndropdown"
                aria-haspopup="true"
                aria-controls="dropdown-menu3"
              >
                <span>{{ $t("PositionText") }}</span>
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
        <!--end position dropdown -->

        <div class="spacer"  v-if="isStauts === 'admin'"></div>
        <!-- company dropdown -->
        <div class="input-group"  v-if="isStauts === 'admin'">
          <label for="user" class="text-input"
            >{{ $t("CompanyNameText") }}
            <p class="required">*</p></label
          >
          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button btndropdown"
                aria-haspopup="true"
                aria-controls="dropdown-menu3"
              >
                <span>{{ $t("CompanyNameText") }}</span>
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
        <!--end company dropdown -->
      </div>
        <div class="spacer" v-if="isStauts === 'admin'"></div>

      <div class="input-form" v-if="isStauts === 'admin'">
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

        <div class="spacer" v-if="isStauts === 'admin'"></div>
        <!-- district dropdown -->
        <div class="input-group" v-if="isStauts === 'admin'">
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
        <div class="input-group is-check-box">
          <div class="check-box-group">
            <label for="user" class="text-input"
              >{{ $t("GenderText") }}
              <p class="required">*</p></label
            >
            <div class="spacerH"></div>
            <div class="check-list-group">
              <label class="checkbox">
                <input type="checkbox" />
                <div class="spacer s"></div>
                {{ $t("MaleText") }}
              </label>
              <div class="spacer"></div>
              <label class="checkbox">
                <input type="checkbox" />
                <div class="spacer s"></div>
                {{ $t("FemaleText") }}
              </label>
               <div class="spacer"></div>
              <label class="checkbox">
                <input type="checkbox" />
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
                <input type="checkbox" />
                <div class="spacer s"></div>
                {{ $t("FullTimeText") }}
              </label>
              <div class="spacer"></div>
              <label class="checkbox">
                <input type="checkbox" />
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
            :placeholder="$t('EducationText')"
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

      <div class="btn-menu">
        <button class="button is-success" @click="add">SAVE</button>
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

    const isStauts = ref(localStorage.getItem("mockStatus"));
    return { firstName, add, startDate, endDate ,isStauts};
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