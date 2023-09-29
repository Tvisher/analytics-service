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

    <div class="poll-item__visual-variants">
      <button
        class="visual-variant"
        :class="{ selected: visualType.type === selectedVisualType }"
        v-for="visualType in visualTypes"
        :key="visualType.type"
        @click="selectVisualType(visualType.type)"
      >
        {{ visualType.text }}
      </button>
    </div>

    <!-- <transition name="fade" mode="out-in"> -->
    <BarChart
      :chartData="chartDataTmp"
      v-if="selectedVisualType === 'barChart'"
    />
    <DoughnutChart
      :chartData="chartDataTmp"
      v-else-if="selectedVisualType === 'doughnutChart'"
    />
    <InfoTable v-else-if="selectedVisualType === 'table'" />
    <!-- </transition> -->
    <div class="poll-item__footer">от 10.05.2023 до 15.05.2023</div>
  </div>
</template>

<script setup>
import BarChart from "@/components/infoComponents/BarChart.vue";
import DoughnutChart from "@/components/infoComponents/DoughnutChart.vue";
import InfoTable from "@/components/infoComponents/InfoTable.vue";
import { ref } from "vue";

import { useGeneralStatistics } from "@/stores/GeneralStatistics";
const store = useGeneralStatistics();
const { chartColors } = store;

const selectedVisualType = ref("doughnutChart");
const visualTypes = [
  {
    type: "doughnutChart",
    text: "Диаграмма",
  },
  {
    type: "barChart",
    text: "График",
  },
  {
    type: "table",
    text: "Таблица",
  },
];

const selectVisualType = (type) => {
  selectedVisualType.value = type;
};

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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
