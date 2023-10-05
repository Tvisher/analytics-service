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
    :chartData="statisticData"
    v-if="selectedVisualType === 'barChart'"
  />
  <DoughnutChart
    :chartData="statisticData"
    v-else-if="selectedVisualType === 'doughnutChart'"
  />

  <InfoTable v-else-if="selectedVisualType === 'table'" />
</template>

<script setup>
import BarChart from "@/components/infoComponents/BarChart.vue";
import DoughnutChart from "@/components/infoComponents/DoughnutChart.vue";
import InfoTable from "@/components/infoComponents/InfoTable.vue";
import { ref } from "vue";

const props = defineProps({
  statisticData: Object,
});

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
