<template>
  <div class="custom-table__wrapper">
    <AppShowBySelect @selectCountToShow="selectCountToShow" />

    <table class="custom-table">
      <tr class="custom-table__row head-row">
        <td class="custom-table__col">1</td>
        <td class="custom-table__col">2</td>
        <td class="custom-table__col">3</td>
      </tr>
      <tr class="custom-table__row">
        <td class="custom-table__col">1</td>
        <td class="custom-table__col">2</td>
        <td class="custom-table__col">3</td>
      </tr>
      <tr class="custom-table__row">
        <td class="custom-table__col">1</td>
        <td class="custom-table__col">2</td>
        <td class="custom-table__col">3</td>
      </tr>
      <tr class="custom-table__row">
        <td class="custom-table__col">1</td>
        <td class="custom-table__col">2</td>
        <td class="custom-table__col">3</td>
      </tr>
      <tr class="custom-table__row">
        <td class="custom-table__col">1</td>
        <td class="custom-table__col">2</td>
        <td class="custom-table__col">3</td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";
import AppShowBySelect from "@/components/ShowBySelect.vue";

// const store = useGeneralStatistics();
// const currenCustomFieldsData = store.currenCustomFieldsData;
// const props = defineProps({
//   data: Object,
// });
// const dataForTable = ref([]);
const selectedRowCount = ref(10);
// const defaultVariants = Array.isArray(props.data.VARIANTS)
//   ? props.data.VARIANTS
//   : Object.values(props.data.VARIANTS);
// const tableHeadData = defaultVariants.map((item) => item.UF_VARIANT_VALUE);

// const allUserAnswers = JSON.parse(
//   JSON.stringify(currenCustomFieldsData(props.data.UF_ID_QUESTION).value)
// );

// dataForTable.value = allUserAnswers.reverse().reduce((acc, item) => {
//   const oneAnwerData = item[0].reduce((arr, el) => {
//     arr.push({
//       fieldName: el.UF_VALUE_FIELD,
//       fieldValue: el.UF_FILED_ANSWER,
//     });
//     return arr;
//   }, []);
//   acc.push(oneAnwerData);
//   return acc;
// }, []);

// const displayedItems = computed(() => {
//   if (
//     selectedRowCount.value >= dataForTable.value.length ||
//     selectedRowCount.value == "Все"
//   ) {
//     return dataForTable.value;
//   }
//   return dataForTable.value.slice(0, parseInt(selectedRowCount.value, 10));
// });

const selectCountToShow = (count) => (selectedRowCount.value = count);
</script>

<style lang="scss">
.custom-table__wrapper {
  background-color: #fff;
}
</style>
