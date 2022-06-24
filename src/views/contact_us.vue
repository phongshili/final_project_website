
<template>
  <div class="_container">


      sss{{data}}

   
  </div>
</template>

<script>

import getData from "../hooks/useGetUser"
export default {
  name: "Home",

 async setup() {
    const data = await getData.getUserInfo()    
    
    return {
     data
    };
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;
}


</style>