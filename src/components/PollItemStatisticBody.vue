<template>
  <AppChartsAndTable
    v-if="isChartsAndTableType(props.data.UF_QUESTION_TYPE)"
    :data="props.data"
  />
  <AppRanginTable
    v-if="props.data.UF_QUESTION_TYPE == 'ranging'"
    :data="props.data"
  />
  <AppRanginSelection
    v-if="props.data.UF_QUESTION_TYPE == 'range-selection'"
    :data="props.data"
  />
  <AppCustomFieldsTable
    v-if="props.data.UF_QUESTION_TYPE == 'custom-fields'"
    :data="props.data"
  />
  <AppDateTable
    v-if="props.data.UF_QUESTION_TYPE == 'date'"
    :data="props.data"
  />
</template>

<script setup>
import AppChartsAndTable from "@/components/infoComponents/infoGroups/ChartsAndTable.vue";
import AppRanginTable from "@/components/infoComponents/infoGroups/RanginTable.vue";
import AppRanginSelection from "@/components/infoComponents/infoGroups/RanginSelection.vue";
import AppCustomFieldsTable from "@/components/infoComponents/infoGroups/CustomFieldsTable.vue";
import AppDateTable from "@/components/infoComponents/infoGroups/DateTable.vue";

const props = defineProps({
  data: Object,
});

const isChartsAndTableType = (type) => {
  return (
    type === "single-choice" ||
    type === "drop-down-list" ||
    type === "multiple-drop-down-list" ||
    type === "multiple-choice"
  );
};
</script>

<style></style>
