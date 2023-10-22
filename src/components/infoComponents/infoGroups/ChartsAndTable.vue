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
    :tableData="pollItemData"
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

const pollItemData = Object.values(props.data.ANSWERS.USER_ANSWER);
let chartDataTmp = {
  labels: [],
  datasets: [
    {
      label: "%",
      backgroundColor: chartColors,
      data: [20, 40, 20],
    },
  ],
};
chartDataTmp.labels = pollItemData.map((item) => item.TEXT);
chartDataTmp.datasets[0].data = pollItemData.map((item) => item.PROCENT);

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
