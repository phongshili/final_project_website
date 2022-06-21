
<template>
  <div class="_container">
    <div class="input-group">
      <label for="user" class="text-input"
        >{{ $t("ProvinceText") }}
        <p class="required">*</p></label
      >
      <div class="input-area">
        <div class="select">
          <select class="dropdown" v-model="provinceID">
            <option
              selected
              v-for="province in provinceArray"
              :key="province._id"
              :value="province._id"
            >
              {{ province.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="input-group">
      <div class="input-area">
        <div class="select">
          <select class="dropdown" v-model="districtID">
            <option
              selected
              v-for="province in districtArray"
              :key="province._id"
              :value="province._id"
            >
              {{ province.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <button @click="fetch">fetch</button>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import store from "../store";
export default {
  async setup() {
    const baseUrl = "http://127.0.0.1:4000/";
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const auth = store.useAuthStore();
    const userTypeStore = store.useAuthStore();
    const userType = JSON.parse(userTypeStore.getUserType);
    let token = auth.getToken;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const dataSet = reactive({
      provinceArray: [],
      districtArray: [],
      provinceID: "",
      districtID: "",
      id: "62b0b1f0dc541705fca8b192",
    });

    const fetchProvinces = async () => {
      const res = await axios.get(baseUrl + "admin-api/province-get");
      dataSet.provinceArray = await res.data.provinces;
      dataSet.provinceID = dataSet.provinceArray[0]._id
    };
    const fetchDistricts = async () => {
      const res = dataSet.provinceArray.filter((e) => {
        return e._id.match(dataSet.provinceID);
      });
      dataSet.districtArray = res[0].districts;
    };

    watch(
      //TODO: bug sometime need to handle
      () => dataSet.provinceID,
      async () => {
        await fetchDistricts();
        dataSet.districtID = dataSet.districtArray[0]._id;
      }
    );

    const fetch = async () => {
      const res = await axios.get(
        baseUrl + "admin-api/employee-find-id/" + dataSet.id
      );
      const employer = res.data.findEmpId; // 👈 get just results
      dataSet.provinceID = employer.provinceId;
      dataSet.districtID = employer.districtId;
      fetchDistricts();
    };

    const getdata = async () => {
      await fetchProvinces();
      await fetchDistricts();
      dataSet.districtID = dataSet.districtArray[0]._id;
    };

    await fetchProvinces();
    await fetchDistricts();

  
    return { ...toRefs(dataSet), fetch, getdata };
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;
}
</style>