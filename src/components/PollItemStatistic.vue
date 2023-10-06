<template>
  <div class="poll-item">
    <div class="poll-item__head">
      <div class="poll-item__num">1</div>
      <div class="poll-item__name">Одиночный выбор</div>
    </div>
    <div class="poll-item__answer">
      Получается, тот кто сформулировал вопрос важнее того, кто нашёл ответ! Так
      что же такое вопрос? Я себе представляю вопросы в виде пустых коробочек.
      Пустота существует везде и всегда
    </div>

    <!-- <AppChartsAndTable :statisticData="chartDataTmp" /> -->
    <AppRanginTable />
    <!-- <AppRanginSelection /> -->

    <div class="poll-item__footer">от 10.05.2023 до 15.05.2023</div>
  </div>
</template>

<script setup>
import AppChartsAndTable from "@/components/infoComponents/infoGroups/ChartsAndTable.vue";
import AppRanginTable from "@/components/infoComponents/infoGroups/RanginTable.vue";
import AppRanginSelection from "@/components/infoComponents/infoGroups/RanginSelection.vue";

import { ref } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";
const store = useGeneralStatistics();
const { chartColors } = store;

const chartDataTmp = {
  labels: [
    "Первый ответ на вопрос который может быть очень длинным",
    "Второй ответ на вопрос который может быть очень длинным и даже ещё длинне чем первый",
    "Третий ответ не очень длинный, но всё же",
  ],
  datasets: [
    {
      label: "%",
      backgroundColor: chartColors,
      data: [20, 40, 20],
    },
  ],
};
</script>

<style></style>
