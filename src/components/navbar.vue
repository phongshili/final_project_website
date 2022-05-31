<template>
  <div class="navbar">
    <div class="logo">
      <img
        src="https://danpottsdoes.files.wordpress.com/2017/09/vue-js_logo-svg.png"
        alt=""
      />
      <p>Job Management</p>
    </div>
    <div class="logOut" @click="store.logOut">
      <p>{{ $t("LogOutText") }}</p>
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "../store";
export default {
  setup() {
    const store = useAuthStore();
    return { store };
  },
};
</script>
<style lang="scss" scoped>
.navbar {
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
  .logOut {
    display: flex;
    align-items: center;
    p {
      margin-bottom: 0 !important;
      margin-right: 10px !important;
    }
  }
  .logOut:hover {
    cursor: pointer;
    color: $alert-color;
  }
}
</style>