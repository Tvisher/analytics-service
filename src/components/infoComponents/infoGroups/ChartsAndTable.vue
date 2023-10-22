<template>
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

  <BarChart
    :chartData="chartDataTmp"
    v-if="selectedVisualType === 'barChart'"
  />
  <DoughnutChart
    :chartData="chartDataTmp"
    v-else-if="selectedVisualType === 'doughnutChart'"
  />

  <InfoTable
    :tableData="reduceData"
    v-else-if="selectedVisualType === 'table'"
  />
</template>

<script setup>
import { ref } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";

import BarChart from "@/components/infoComponents/BarChart.vue";
import DoughnutChart from "@/components/infoComponents/DoughnutChart.vue";
import InfoTable from "@/components/infoComponents/InfoTable.vue";

const generalStatisticsStore = useGeneralStatistics();
const chartColors = generalStatisticsStore.chartColors;

const props = defineProps({
  data: Object,
});
const userAnswers = props.data.ANSWERS.USER_ANSWER;

const defaultVariants = Array.isArray(props.data.VARIANTS)
  ? props.data.VARIANTS
  : Object.values(props.data.VARIANTS);

const reduceData = defaultVariants.reduce((acc, item) => {
  const userAnswerItem = userAnswers[item.UF_ID_VARIANT];
  const precent = userAnswerItem ? userAnswerItem.PROCENT : 0;
  const answerCount = userAnswerItem ? userAnswerItem.COUNT_ANSWER : 0;
  acc.push({
    name: item.UF_VARIANT_VALUE,
    precent,
    answerCount,
  });
  return acc;
}, []);

let chartDataTmp = {
  labels: [],
  datasets: [
    {
      label: "%",
      backgroundColor: chartColors,
      data: [],
    },
  ],
};
chartDataTmp.labels = reduceData.map((item) => item.name);
chartDataTmp.datasets[0].data = reduceData.map((item) => item.precent);

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
</script>
