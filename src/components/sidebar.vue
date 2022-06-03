<template>
  <div class="sideBar_container">
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="profile">
          <img src="../assets/profile.jpg" alt="" />
        </div>
        <div class="detail">
          <div class="name">Website Admin</div>
          <div class="role" v-if="isStauts === 'admin'" >Admin</div>
          <div class="role" v-if="isStauts === 'employer'" >Employer</div>
          <div class="role" v-if="isStauts === 'employer'" >Current Points : 60</div>

          <!-- comment code  -->
           <div class="role" @click="status.mockStatusEmp"  v-if="isStauts === 'admin'" >Change to Employer</div>
          <div class="role" @click="status.mockStatusAdmin" v-if="isStauts === 'employer'"  >Change to Admin</div>
         
        </div>
      </div>
      <div class="line"></div>
      <div class="sidebar-body">
        <div class="items">
          <router-link to="/dashboard">
            <div class="item">
              <i class="fa-solid fa-house"></i><span>{{ $t("HomeText") }}</span>
            </div>
          </router-link>
        </div>

        <div class="items">
          <router-link to="/jobposts">
            <div class="item">
              <i class="fa-solid fa-newspaper"></i
              ><span>{{ $t("PostJobsText") }}</span>
            </div>
          </router-link>
        </div>

        <!-- <div class="items">
          <router-link to="/#">
            <div class="item">
              <i class="fa-solid fa-user-gear"></i
              ><span>{{ $t("AdminsManagementText") }}</span>
            </div>
          </router-link>
        </div> -->

        <div class="items"  v-if="isStauts === 'admin'">
          <router-link to="/employers">
            <div class="item">
              <i class="fa-solid fa-user-pen"></i
              ><span>{{ $t("EmployersManagementText") }}</span>
            </div>
            <span class="count">4</span>
          </router-link>
        </div>

        <div class="items"  v-if="isStauts === 'admin'">
          <router-link to="/jobseekers">
            <div class="item">
              <i class="fa-solid fa-user-tag"></i
              ><span>{{ $t("JobSeekersManagementText") }}</span>
            </div>
            <span class="count">4</span>
          </router-link>
        </div>

        <div class="items"  v-if="isStauts === 'admin'">
          <router-link to="/jobpositions">
            <div class="item">
              <i class="fa-solid fa-briefcase"></i
              ><span>{{ $t("JobPositionsManagementText") }}</span>
            </div>
          </router-link>
        </div>

        <div class="items">
          <router-link to="/paymentshistories">
            <div class="item">
              <i class="fa-solid fa-credit-card"></i>
              <span>{{ $t("PaymentsHistoryText") }}</span>
            </div>
            <span class="count">4</span>
          </router-link>
        </div>
         <div class="items"  v-if="isStauts === 'employer'">
          <router-link to="/contactUs" >
            <div class="item">
              <i class="fa-solid fa-headset"></i><span>{{ $t("ContactUsText") }}</span>
            </div>
          </router-link>
        </div>
        <div class="switcher">
          <!-- if getDefaultLanguage is en show "la" button -->
          <label
            class="languageSwitcher"
            v-if="store.$state.setLanguage == 'en'"
          >
            {{ $t("OfferedInText") }}
            <p @click="store.languageSwitch('la')">ລາວ</p>
          </label>
          <!-- if getDefaultLanguage is en show "en" button -->
          <label class="languageSwitcher" v-else>
            {{ $t("OfferedInText") }}
            <p @click="store.languageSwitch('en')">English (US)</p>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLanguageSwitcher } from "../store";
import { mockStatus } from "../store";
import {ref} from 'vue'


export default {
  setup() {
    const store = useLanguageSwitcher();
    const status = mockStatus();
    const isStauts = ref(localStorage.getItem('mockStatus'))
   
    return { store ,status,isStauts};
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #dadde1;
}

.sideBar_container {
  position: fixed;
  height: 100%;
  width: 340px;
  display: flex;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
  .sidebar {
    background: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    color: rgb(102, 112, 133);
    font-weight: bold;
    font-size: 16px;
    width: 100%;
    padding: 0px 20px;
    line-height: 24px;
    .sidebar-header {
      padding: 12px 10px;
      align-items: center;
      .profile {
        display: flex;
        justify-content: center;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .detail {
        .name {
          display: flex;
          justify-content: center;
          color: $primary-font-color;
        }
        .role {
          display: flex;
          justify-content: center;
        }
      }
    }
    .line {
      background: $shadow-color;
      height: 2px;
      margin: 16px 0px;
    }
    .sidebar-body {
      position: relative;
      padding-right: 5px;
      overflow: auto;
      display: flex;
      height: 100%;
      flex-direction: column;
      margin-bottom: 55px;
      .items {
        .item {
          display: flex;
          align-items: center;
          i {
            margin-right: 10px;
            font-size: 20px;
            width: 25px;
          }
        }
        a {
          text-decoration: none;
          padding: 10px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 4px 0px;
          color: $icon-color;
        }
        .count {
          background: $alert-color;
          padding: 2.5px 8px;
          color: $active-font-color;
          border-radius: 6px;
          font-weight: 300;
        }

        a.router-link-exact-active.router-link-active,
        a:hover {
          background: $primary-color;
          color: $active-font-color;
          border-radius: 8px;
        }
      }
      .switcher {
        position: absolute;
        bottom: 8px;
        .languageSwitcher {
          display: flex;
          padding-left: 10px;
          p {
            padding-left: 5px;
            color: $active-color;
          }
        }

        .languageSwitcher :hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>