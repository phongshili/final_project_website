<template>
  <div class="loading-screen" >
    <div class="loading-animation">
      <img src="https://imgur.com/FsvEuM2.png" alt="logo" class="logo" />
      <div class="loading-bar"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  background: $background-color;
}
.loading-screen {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.logo {
  width: 200px;
}

.loading-bar {
  width: 250px;
  height: 6px;
  background: #e8e9f3;
  margin-top: 22px;
  position: relative;
  border-radius: 5px;

  overflow: hidden;
}

.loading-bar::before {
  content: "";
  width: 125px;
  height: 8px;
  background: $primary-color;
  position: absolute;
  border-radius: 5px;
  left: -34px;
  animation: pinkbar 1.5s infinite ease;
}

@keyframes pinkbar {
  50% {
    left: 196px;
  }
}
</style>