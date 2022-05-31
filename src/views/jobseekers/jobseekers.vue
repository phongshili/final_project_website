<template>
  <div class="_container is-small">
    <div class="container-header">
      <label>{{ $t("JobSeekersManagementText") }}</label>
    </div>
    <div class="form-container">
      <div class="form-detail">
        <!-- first half -->
        <div class="form-input-group">
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("ProfileImageText") }}
              <p class="required">*</p></label
            >
            <div class="img-container">
              <img class="profile" src="../../assets/default.jpg" alt="" />
            </div>

            <div class="image-input-link">
              <input
                class="input"
                type="text"
                disabled="disabled"
                :placeholder="$t('FilePathText')"
              />
              <button class="button is-link">
                {{ $t("ChooseFilteText") }}
              </button>
            </div>
          </div>
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("FirstNameText") }}
              <p class="required">*</p></label
            >
            <input
              v-model="firstName"
              class="input"
              type="text"
              :placeholder="$t('FirstNameText')"
            />
          </div>
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("EmailText") }}
              <p class="required">*</p></label
            >
            <input class="input" type="text" :placeholder="$t('EmailText')" />
          </div>
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("PosonalIDNoText") }}
              <p class="required">*</p></label
            >
            <input
              class="input"
              type="text"
              :placeholder="$t('PosonalIDNoText')"
            />
          </div>

          <!-- provinces dropdown -->
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("CurrentProvinceText") }}
              <p class="required">*</p></label
            >
            <div class="dropdown">
              <div class="dropdown-trigger">
                <button
                  class="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu3"
                >
                  <span>{{ $t("CurrentProvinceText") }}</span>
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
          <!--end provinces dropdown -->
          <!-- district dropdown -->
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("CurrentDistrictText") }}
              <p class="required">*</p></label
            >
            <div class="dropdown">
              <div class="dropdown-trigger">
                <button
                  class="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu3"
                >
                  <span>{{ $t("CurrentDistrictText") }}</span>
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

          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("CurrentDistrictText") }}
              <p class="required">*</p></label
            >
            <input
              class="input"
              type="text"
              :placeholder="$t('PosonalIDNoText')"
            />
          </div>
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("PasswordText") }}
              <p class="required">*</p></label
            >
            <input
              class="input"
              type="text"
              :placeholder="$t('PasswordText')"
            />
          </div>
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("ConfirmPasswordText") }}
              <p class="required">*</p></label
            >
            <input
              class="input"
              type="text"
              :placeholder="$t('ConfirmPasswordText')"
            />
          </div>
        </div>
        <!-- end first half -->

        <!-- second half -->
        <div class="spacer"></div>
        <div class="form-input-group">
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("PersonalIDCardImageText") }}
              <p class="required">*</p></label
            >
            <div class="img-container">
              <img src="../../assets/default.jpg" alt="" />
            </div>

            <div class="image-input-link">
              <input
                class="input"
                type="text"
                disabled="disabled"
                :placeholder="$t('FilePathText')"
              />
              <button class="button is-link">
                {{ $t("ChooseFilteText") }}
              </button>
            </div>
          </div>
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("LastNameText") }}
              <p class="required">*</p></label
            >
            <input
              class="input"
              type="text"
              :placeholder="$t('LastNameText')"
            />
          </div>
          <div class="spacer"></div>
          <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("ContactPhoneText") }}
              <p class="required">*</p></label
            >
            <input
              class="input"
              type="text"
              :placeholder="$t('ContactPhoneText')"
            />
          </div>
          <div class="text-input-group text-area-fixed">
            <label for="user" class="text-input"
              >{{ $t("ExperienceText") }}
              <p class="required" v-if="req === true">*</p></label
            >
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              :placeholder="$t('ExperienceText')"
            ></textarea>
          </div>
          <div class="text-input-group text-area-fixed">
            <label for="user" class="text-input"
              >{{ $t("EducationText") }}
              <p class="required" v-if="req === true">*</p></label
            >
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              :placeholder="$t('EducationText')"
            ></textarea>
          </div>
          <div class="text-input-group text-area-fixed">
            <label for="user" class="text-input"
              >{{ $t("SkillsText") }}
              <p class="required" v-if="req === true">*</p></label
            >
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              :placeholder="$t('SkillsText')"
            ></textarea>
          </div>
          <div class="text-input-group text-area-fixed">
            <label for="user" class="text-input"
              >{{ $t("LanguageText") }}
              <p class="required" v-if="req === true">*</p></label
            >
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              :placeholder="$t('LanguageText')"
            ></textarea>
          </div>
          <div class="text-input-group text-area-fixed">
            <label for="user" class="text-input"
              >{{ $t("IntroducText") }}
              <p class="required" v-if="req === true">*</p></label
            >
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              :placeholder="$t('IntroducText')"
            ></textarea>
          </div>

          <div class="text-input-group _flex">
            <div class="checkbox-group">
              <label for="user" class="text-input"
                >{{ $t("GenderText") }}
                <p class="required">*</p></label
              >
              <div class="checkbox-input-group">
                <label class="radio">
                  <input type="radio" name="answer" />
                  <div class="spacer s"></div>
                  {{ $t("MaleText") }}
                </label>
                <label class="radio">
                  <input type="radio" name="answer" />
                  <div class="spacer s"></div>
                  {{ $t("FemaleText") }}
                </label>
              </div>
            </div>
            <div class="spacer"></div>
            <div class="checkbox-group">
              <label for="user" class="text-input"
                >{{ $t("WorkTimeText") }}
                <p class="required">*</p></label
              >
              <div class="checkbox-input-group">
                <span><input type="checkbox" />{{ $t("FullTimeText") }}</span>
                <div class="spacer"></div>
                <span><input type="checkbox" />{{ $t("PartTimeText") }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="text-input-group">
            <label for="user" class="text-input"
              >{{ $t("SalaryText") }}
              <p class="required">*</p></label
            >
            <div class="checkbox-group multiple">
              <span
                ><input type="checkbox" />800.000-1.500.000 ({{
                  $t("KipText")
                }})</span
              >
              <div class="spacer"></div>
              <span
                ><input type="checkbox" />1.600.000-2.000.000 ({{
                  $t("KipText")
                }})</span
              >
              <span
                ><input type="checkbox" />2.000.000+ ({{ $t("KipText") }})</span
              >
            </div> -->
          <!-- </div> -->
        </div>
        <!--end second half -->
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

export default {
  setup() {
    const firstName = ref();
    function add() {
      console.log(firstName.value);
    }
    return { firstName, add };
  },
};
</script>

<style lang="scss" scoped>
.spacer {
  width: 15px;
  visibility: hidden;
  &.s {
    width: 5px;
  }
}
.form-container {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 5px;
  min-width: 770px;
  overflow: hidden;
  padding: 50px;
  .form-detail {
    display: flex;
    .form-input-group {
      .text-input-group {
        min-width: 350px !important;
        width: 350px;
        padding-bottom: 15px;
        text-align: center;

        &._flex {
          display: flex;
        }
        &.text-area-fixed {
          padding-bottom: 8px;
        }
        .dropdown {
          min-width: 350px !important;
          width: 350px;
          .dropdown-trigger {
            width: 100%;
            .button {
              width: 100%;
              justify-content: flex-start;
              .icon {
                margin-left: auto !important;
              }
            }
          }
          .dropdown-menu {
            width: 100%;
          }
        }
        label {
          padding-bottom: 10px;
        }
        input {
          border-color: $sub-border-color;
        }
        input:focus {
          outline: 1px solid $sub-color;
          box-shadow: none;
        }
        input:active {
          outline: 1px solid $sub-color;
          box-shadow: none;
        }
        textarea {
          min-width: 350px !important;
          width: 350px !important;
          border-color: $sub-border-color;
          height: 40px;
          min-height: 40px;
          border-radius: 5px;
          padding: 7px 11px;
        }
        textarea:focus-visible {
          outline: 1px solid $sub-color;
        }
        .text-input {
          display: flex;
          .required {
            color: $alert-color;
            padding-left: 3px;
          }
        }
        .checkbox-group {
          .checkbox-input-group {
            display: flex;
            .radio {
              display: flex;
              align-items: center;
            }
          }
          span {
            display: flex;
            align-items: center;
            input {
              margin-right: 5px;
            }
          }
        }
        .img-container {
            height: 306px;

          .profile {
            width: 280px;
            height: 280px;
            border-radius: 50%;
          }
        }
        .image-input-link {
          display: flex;
          .input {
            border-radius: 5px 0 0 5px;
            pointer-events: none;
          }
          input:focus {
            outline: none;
            box-shadow: none;
          }
          input:active {
            outline: none;
            box-shadow: none;
          }
          .button {
            border-radius: 0 5px 5px 0px;
          }
        }
      }
    }
  }
  .btn-menu {
    display: flex;
  }

}
</style>