<template>
  <div id="app">
    <div class="content">
      <div class="navBar" v-if="auth">
        <navBar />
      </div>
      <sideBar v-if="auth" />
      <div class="content-area">
        <router-view />
      </div>

    </div>
  </div>
</template>
<script >
import sideBar from "./components/sidebar.vue";
import navBar from "./components/navbar.vue";
import {useAuthStore} from "./store"
import {ref} from 'vue'
export default {
  name: "app",
  components: {
    sideBar,
    navBar,
  },
  setup(){
    const store = useAuthStore()
    let auth = ref(store.isAuth)
    return {auth}
  }

};
</script>
<style lang="scss">
#app {
  color: $primary-color;
}
.content {
  .navBar {
    height: 52px;
  }
}
</style>
