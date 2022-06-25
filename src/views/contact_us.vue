
<template>
  <div class="_container">

      {{isReloaded}}
      {{name}}
      <p v-if="isReloaded">show</p>
      <button @click="newFetch">RELOAD</button>

   
  </div>
</template>

<script>
import {useReload} from "../store/reload"
import {ref, reactive, toRefs} from "vue"
import Swal from 'sweetalert2'
export default {
  name: "Home",

 async setup() {
    const reload = useReload();
    const dataSet = reactive({
      isReloaded : null,
      name:"sss"
    })
    const newFetch = async () => {
      await reload.setReload(true)
      dataSet.name = 'phong'
      dataSet.isReloaded = reload.getIsReload

    await  Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})
      console.log(dataSet.isReloaded)

      // await reload.setReload(false)
      // console.log(reload.getIsReload)
    }
    return {
      newFetch,
      ...toRefs(dataSet),
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