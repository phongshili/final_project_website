<template>
  <div class="_container">
    <div class="container-header">
      <label>{{ $t("JobPositionsManagementText") }}</label>
    </div>
    <div class="filter is-small-tb">
      <div class="filter-menu">
        <div class="input-group">
          <input
            class="input is-small"
            type="text"
            v-model="position"
            :placeholder="$t('AddPositionInputText')"
          />

          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      <div class="btn-menu">
        <button
          class="button is-success"
          v-if="position_id"
          @click="updatePosition(position_id)"
        >
          {{ $t("UpdatePositionInputText") }}
        </button>
        <button class="button is-danger" @click="clearInput" v-if="position_id">
          {{ $t("ClearText") }}
        </button>
        <button class="button is-success" @click="addPosition" v-else>
          {{ $t("AddPositionText") }}
        </button>
        <button class="button is-link">{{ $t("ExportText") }}</button>
      </div>
    </div>
    <div class="table-box is-small-tb">
      <table>
        <thead>
          <tr>
            <th class="tb-ss tb-center">{{ $t("NoText") }}</th>
            <th class="tb-medium">{{ $t("PositionText") }}</th>
            <th class="tb-small">{{ $t("TotalPositionPosted") }}</th>
            <th class="tb-small tb-center">{{ $t("OptionsText") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(position, index) in filterPosition" :key="index">
            <td class="tb-ss tb-center">
              <span>{{ index + 1 }}</span>
            </td>
            <td class="tb-small">
              <span style="text-transform: uppercase">{{ position.name }}</span>
            </td>
            <td class="tb-small">
              <span>{{ position.totalPostJob }}</span>
            </td>
            <td class="tb-small">
              <div class="tools">
                <i
                  class="fa-solid fa-pen-to-square edit-tool"
                  @click="newPosition(position._id, position.name)"
                ></i
                ><i
                  class="fa-solid fa-xmark delete-tool"
                  @click="deletePosition(position._id)"
                ></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, computed } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

export default {
  setup() {
    const { t } = useI18n();

    const dataSet = reactive({
      positions: [],
      position_id: "",
      position: "",
      filterPosition: computed(() => filtterData()),
    });
    // need to refactor this code to hook
    const fetchPositions = async () => {
      const res = await axios.get(
        "http://127.0.0.1:4000/admin-api/position-get"
      );
      dataSet.positions = res.data.getPosition; // 👈 get just results
    };
    fetchPositions();

    const newPosition = async (id, val) => {
      dataSet.position_id = id;
      dataSet.position = val;
    };

    const clearInput = async () => {
      dataSet.position_id = null;
      dataSet.position = null;
    };
    // need to refactor this code to hook
    const addPosition = async () => {
      await axios.post("http://127.0.0.1:4000/admin-api/position-add", {
        name: dataSet.position.toLowerCase(),
      });

      await clearInput();
      await fetchPositions();
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: t("SuccessText"),
        showConfirmButton: false,
        timer: 1500,
      });
    };
    // need to refactor this code to hook
    const updatePosition = async (id) => {
      await axios.put("http://127.0.0.1:4000/admin-api/position-update", {
        id: id,
        name: dataSet.position.toLowerCase(),
      });

      await clearInput();
      await fetchPositions();
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: t("SuccessText"),
        showConfirmButton: false,
        timer: 1500,
      });
    };
    // need to refactor this code to hook
    const deletePosition = async (id) => {
      await Swal.fire({
        position: "center",
        icon: "warning",
        title: t("SuccessText"),
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            "http://127.0.0.1:4000/admin-api/position-delete/" + id
          );
          await fetchPositions();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: t("SuccessText"),
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    };

    const filtterData = () => {
      if (dataSet.position !== null) {
        return dataSet.positions.filter((el) => {
          return el.name.match(dataSet.position);
        });
      } else {
        return dataSet.positions;
      }
    };
    return {
      ...toRefs(dataSet),
      newPosition,
      fetchPositions,
      clearInput,
      addPosition,
      updatePosition,
      deletePosition,
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