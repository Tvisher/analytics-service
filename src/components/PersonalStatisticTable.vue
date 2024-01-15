<template>
  <AppShowBySelect @selectCountToShow="selectCountToShow" />
  <div class="custom-table__wrapper">
    <table class="custom-table">
      <tr class="custom-table__row head-row">
        <td class="custom-table__col" v-for="tableHeadName in tableHeadNames">
          {{ tableHeadName }}
        </td>
      </tr>
      <tr
        @click="openResult(tableBodyRow.resultId)"
        :data-result-id="tableBodyRow.resultId"
        class="custom-table__row"
        v-for="tableBodyRow in tableBodyData"
      >
        <td
          class="custom-table__col"
          v-for="tableBodyCol in tableBodyRow.fieldsData"
        >
          {{ tableBodyCol }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePersonalStatistic } from "@/stores/PersonalStatistic";
import AppShowBySelect from "@/components/ShowBySelect.vue";
const props = defineProps({
  idsList: Object,
});
const router = useRouter();
const usePersonalStatisticStore = usePersonalStatistic();
const dataForCreateTable = usePersonalStatisticStore.personalStatisticData;
const selectedRowCount = ref(10);
const tableHeadNames = ref(["ID результата", "Респондент"]);

const tableBodyData = computed(() => {
  return props.idsList.map((item) => {
    const resultId = item;
    const userName = dataForCreateTable.find(
      (el) => el.resultId === item
    ).userName;
    return {
      resultId,
      fieldsData: [resultId, userName],
    };
  });
});

const selectCountToShow = (count) => (selectedRowCount.value = count);

const openResult = (id) => {
  console.log(id);
  router.push({ name: "personalStatisticItem", params: { id } });
};
</script>

<style lang="scss">
.custom-table__wrapper {
  min-height: 500px;
  background-color: #fff;
  .custom-table__row {
    cursor: pointer;
  }
}
</style>
