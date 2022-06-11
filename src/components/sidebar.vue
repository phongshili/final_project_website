<template>
  <div class="sideBar_container">
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="profile">
          <img src="../assets/profile.jpg" alt="" />
        </div>
        <div class="detail">
          <div class="name"  v-if="$userInfo.type === 'admin'">{{$userInfo.name}}</div>
          <div class="name" v-else >{{$userInfo.companyName}}</div>
          <div class="line" v-if="$userInfo.type === 'employee' || $userInfo.type === 'employer'"></div>
          <div class="role" v-if="$userInfo.type === 'employee' || $userInfo.type === 'employer'" >Current Points : {{$userInfo.point}}</div>
          <div class="role" v-if="$userInfo.type === 'employee' || $userInfo.type === 'employer'" >Status : {{ $userInfo.status}}</div>
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

        <div class="items"  v-if="$userInfo.type === 'admin'">
          <router-link to="/employers">
            <div class="item">
              <i class="fa-solid fa-user-pen"></i
              ><span>{{ $t("EmployersManagementText") }}</span>
            </div>
            <span class="count">4</span>
          </router-link>
        </div>

        <div class="items"  v-if="$userInfo.type === 'admin'">
          <router-link to="/jobseekers">
            <div class="item">
              <i class="fa-solid fa-user-tag"></i
              ><span>{{ $t("JobSeekersManagementText") }}</span>
            </div>
            <span class="count">4</span>
          </router-link>
        </div>

        <div class="items"  v-if="$userInfo.type === 'admin'">
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
         <div class="items"  v-if="$userInfo.type === 'employer' || $userInfo.type === 'employee'">
          <router-link to="/contactUs" >
            <div class="item">
              <i class="fa-solid fa-headset"></i><span>{{ $t("ContactUsText") }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    //disable select text
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  //end
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
      // padding: 12px 10px;
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
          // justify-content: center;
        }
      }
    }
    .line {
      background: $shadow-color;
      height: 1px;
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
    }
  }
}
</style>