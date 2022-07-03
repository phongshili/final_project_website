<template>
  <div class="navbar">
    <div class="logo">
      <img src="../assets/jibjib_icon.png" alt="" />
      <p>Job Management</p>
    </div>
    <div class="dropdown-container" @click="is_Dropdown">
      <div class="option">
        <i class="fa-solid fa-gear"></i>
      </div>
      <div class="option-list" :class="{ 'is-Active': isActive }">
        <div class="profile">
          <div v-if="userInfo.image" class="profile">
            <img :src="baseUrl + userInfo.image" alt="" />
          </div>
          <div v-else class="profile">
            <img src="../assets/jibjib_icon.png" alt="" />
          </div>
          <div class="name" v-if="userInfo.type === 'admin'">
            {{ userInfo.name + " " + userInfo.lastname }}
          </div>
          <div class="name" v-else>{{ userInfo.companyName }}</div>
        </div>
        <div class="line"></div>
        <div
          class="dropdown-item"
          @click="$router.push({ name: 'Profile' })"
          v-if="userInfo.type === 'employee' || userInfo.type === 'employer'"
        >
          <i class="fa-solid fa-address-card"></i>
          <p>{{ $t("ProfileText") }}</p>
        </div>
        <div
          class="dropdown-item"
          v-if="userInfo.type === 'employee' || userInfo.type === 'employer'"
          @click="$router.push({ name: 'ChangePassword' })"
        >
          <i class="fa-solid fa-lock"></i>
          <p>{{ $t("ChangePasswordText") }}</p>
        </div>
        <div
          class="dropdown-item"
          v-if="switcher.getLanguage === 'en'"
          @click="switcher.languageSwitch('la')"
        >
          <!-- if getDefaultLanguage is en show "la" button -->
          <i class="fa-solid fa-language"></i>
          <label
            class="languageSwitcher"
            v-if="switcher.$state.setLanguage == 'en'"
          >
            {{ $t("OfferedInText") }}
            <p>ລາວ</p>
          </label>
        </div>
        <div
          class="dropdown-item"
          v-if="switcher.getLanguage === 'la'"
          @click="switcher.languageSwitch('en')"
        >
          <i class="fa-solid fa-language"></i>

          <!-- if getDefaultLanguage is en show "en" button -->
          <label class="languageSwitcher">
            {{ $t("OfferedInText") }}
            <p @click="switcher.languageSwitch('en')">English (US)</p>
          </label>
        </div>

        <div class="dropdown-item" @click="logOut">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <p>{{ $t("LogOutText") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import { useAuthStore, useLanguageSwitcher } from "../store";
import { ref, reactive, toRefs, watch } from "vue";
import useGetUser from "../hooks/useGetUser";
import { useReload } from "../store/reload";
import { useLoading } from "../store/loading";

export default {
  async setup() {
    let isActive = ref(false);
    const baseUrl = "http://127.0.0.1:4000/";
    const reload = useReload();
    const loading = useLoading();

    const store = useAuthStore();
    const switcher = useLanguageSwitcher();
    const dataSet = reactive({
      userInfo: [],
    });

    watch(
      () => reload.getIsReload,
      async () => {
        if (reload.getIsReload) {
          await fetchUserInfo();
        }
      }
    );

    const fetchUserInfo = async () => {
      dataSet.userInfo = await useGetUser.getUserInfo();
      reload.setReload(false);
    };
    await fetchUserInfo();

    const is_Dropdown = () => {
      isActive.value = !isActive.value;
    };

    const logOut = async () => {
      await loading.setloading(true);
      await store.logOut();

      setTimeout(() => {
        loading.setloading(false);
      }, 20000);
    };
    return {
      store,
      switcher,
      isActive,
      is_Dropdown,
      baseUrl,
      ...toRefs(dataSet),
      logOut,
    };
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  //disable select text
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  //end
  z-index: 99999;

  position: fixed;
  width: 100%;
  align-items: center;
  display: flex;
  background: $primary-color;
  justify-content: space-between;
  padding: 5px 10px;
  color: $active-font-color;
  .logo {
    align-items: center;
    display: flex;
    img {
      margin-right: 10px;
      border-radius: 50%;
      width: 35px;
      height: 35px;
    }
  }
  .dropdown-container {
    position: relative;
    .option {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $background-color;
      border-radius: 50%;
      i {
        color: $primary-color;
      }
    }
    .option:hover {
      background: $icon-color;
      i {
        color: $active-font-color;
      }
      cursor: pointer;
    }
    .option-list {
      display: none;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      color: $primary-color;
      border-radius: 5px;
      background: #fff;
      width: 250px;
      height: auto;
      z-index: 999;
      position: absolute;
      padding: 5px;
      right: 0;
      top: 50px;
      &.is-Active {
        display: block;
      }
      .profile {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 15px;
        border-radius: 50%;
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
      }
      .line {
        background: $shadow-color;
        height: 2px;
        margin: 10px 0px;
      }
      .profile {
        display: flex;
        align-items: center;
        .name {
          margin-left: 10px;
        }
        img {
          width: 65px;
          height: 65px;
        }
      }

      .dropdown-item {
        display: flex;
        align-items: center;
        i {
          margin-right: 10px;
        }
        p {
          margin-bottom: 0 !important;
          margin-left: 10px !important;
        }

        .languageSwitcher {
          display: flex;
          padding-left: 5px;
        }
        .languageSwitcher:hover {
          cursor: pointer;
        }
      }
      .dropdown-item:hover {
        cursor: pointer;
        background: $primary-color;
        color: $active-font-color;
        border-radius: 5px;
      }
    }
  }
}
</style>