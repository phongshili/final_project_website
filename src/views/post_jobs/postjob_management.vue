<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("PostJobsText") }}</label>
    </div>
    <div class="form-container">
      <div class="image-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProfileImageText") }}
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
            >{{ $t("PersonalIDCardImageText") }}
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
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProfileImageText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProfileImageText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
          />
        </div>
      </div>
      <div class="input-form">
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProfileImageText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
          />
        </div>
        <div class="spacer"></div>
        <div class="input-group">
          <label for="user" class="text-input"
            >{{ $t("ProfileImageText") }}
            <p class="required">*</p></label
          >
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
          />
        </div>
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
  .input-form {
    display: flex;
    &.block {
      display: block;
    }
  }
  .image-form {
    display: flex;
    .input-group {
      width: 30%;
      &.isCard {
        width: 70%;
      }
    }
  }
  .input-group {
    width: 100%;
    padding-bottom: 15px;
    .img-container {
      .profile {
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        border-radius: 5px;
        border-radius: 5px;
        object-fit: cover;
        width: 100%;
        height: 300px;
      }
      .personalIDCard {
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        border-radius: 5px;
        border-radius: 5px;
        width: 100%;
        object-fit: cover;
        object-position: 100% 50%;
        height: 300px;
      }
    }
    .text-input {
      padding-bottom: 10px;

      display: flex;
      .required {
        color: $alert-color;
        padding-left: 3px;
      }
    }
  }
  .btn-menu {
    display: flex;
  }
}
</style>