<template>
  <AppShowBySelect @selectCountToShow="selectCountToShow" />
  <div class="custom-table">
    <div class="custom-table__row head-row">
      <div class="custom-table__col">{{ dateType }}</div>
    </div>
    <div
      class="custom-table__row"
      v-for="(dateItem, index) in displayedItems"
      :key="index"
    >
      <div class="custom-table__col custom-table__col_wide">
        {{ dateItem.data }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import AppShowBySelect from "@/components/ShowBySelect.vue";
import { customFormattedDate } from "@/helpers/customDateFormatter";

const props = defineProps({
  data: Object,
});
const dataForTable = ref([]);
const selectedRowCount = ref(10);

const propsData = JSON.parse(JSON.stringify(props.data));
dataForTable.value = propsData.ANSWERS.USER_ANSWER.reverse().map((item) => {
  const itemText = item.TEXT;
  const date = new Date(itemText);
  if (Date.parse(date)) {
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return {
      type: "sigle-date",
      data: formattedDate,
    };
  } else {
    const pairDate = itemText.split("-");
    return {
      type: "pair-date",
      data: pairDate
        .map((item) => customFormattedDate(new Date(item)))
        .join(" - "),
    };
  }
});

const displayedItems = computed(() => {
  if (
    selectedRowCount.value >= dataForTable.value.length ||
    selectedRowCount.value == "Все"
  ) {
    return dataForTable.value;
  }
  return dataForTable.value.slice(0, parseInt(selectedRowCount.value, 10));
});

const dateType =
  dataForTable.value[0].type === "sigle-date" ? "Дата" : "Диапазон дат";

const selectCountToShow = (count) => (selectedRowCount.value = count);
</script>

<style lang="scss">
.custom-table__col_wide {
  padding: 0;
  width: 100%;
}
</style>
