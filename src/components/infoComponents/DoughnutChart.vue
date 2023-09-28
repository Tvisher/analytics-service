<template>
  <div class="info-char-wrapper">
    <div class="char-container doughnut-container">
      <Doughnut :data="chartDataFixed" :options="chartOptions" />
    </div>
    <div class="char-items-list">
      <div
        class="char-items-list__item"
        v-for="(charLabel, index) in chartDataTextListWithColors"
        :key="index"
      >
        <div
          class="color-label"
          :style="{ backgroundColor: charLabel.color }"
        ></div>
        <p class="item-text">{{ charLabel.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "vue-chartjs";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const props = defineProps({
  chartData: Object,
});

const chartData = props.chartData;
const chartDataFixed = {
  datasets: chartData.datasets,
  labels: chartData.labels.map((item, i) => `Ответ № ${i + 1}`),
};
const chartDataColors = chartData.datasets[0].backgroundColor;
const chartDataLabels = chartData.labels;

const chartDataTextListWithColors = chartDataLabels.map((label, index) => {
  return {
    label,
    color: chartDataColors[index],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "65%",

  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      align: "center",
      color: "#fff",
      font: {
        size: 18,
      },
      formatter: (value) => {
        return value + "%";
      },
    },
    tooltip: {
      padding: 12,
      backgroundColor: "rgba(255, 255, 255, 0.80)",
      borderColor: "#C2CFE0",
      borderWidth: 1,

      titleFont: { size: 0 },
      titleMarginBottom: 0,
      titleSpacing: 0,

      bodyColor: "#262B31",
      bodyFont: { size: 18, weight: "bold" },
      caretSize: 5,

      boxWidth: 24,
      boxHeight: 24,
      boxPadding: 10,
      callbacks: {
        label: function (context) {
          return `${context.label}`;
        },
      },
    },
  },
};
</script>

<style></style>
