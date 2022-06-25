<template>
<Suspense>
  <div id="app">
    <div class="content">
    <loading v-if="loading.getIsLoading" />
      <div class="navBar" v-if="auth">
        <navBar />
      </div>
      <sideBar v-if="auth" />
      <div class="content-area">
        <router-view />
      </div>

    </div>
  </div>
</Suspense>

</template>
<script >
import sideBar from "./components/sidebar.vue";
import navBar from "./components/navbar.vue";
import {useAuthStore} from "./store"
import {ref} from 'vue';
import loading from "./components/loading.vue"
import {useLoading} from "./store/loading"
export default {
  name: "app",
  components: {
    sideBar,
    navBar,
    loading
  },
  setup(){
    const store = useAuthStore()
    const loading = useLoading();

    
    let auth = ref(store.accessToken)
    return {auth,loading}
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
