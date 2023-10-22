<template>
  <div class="info-char-wrapper">
    <div class="char-container">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartDataFixed" />
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
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  chartData: Object,
});

const chartData = JSON.parse(JSON.stringify(props.chartData));
const chartDataFixed = {
  datasets: chartData.datasets,
  labels: chartData.labels.map((item, i) => `Ответ № ${i + 1}`),
};
chartDataFixed.datasets[0].minBarLength = 25;
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
  minHeight: 500, // Устанавливаем минимальную высоту в 200 пикселей
  scales: {
    y: {
      min: 0,
      max: 100,
      grid: {
        color: "#C2CFE0",
      },
      border: {
        dash: [8, 8],
      },
      ticks: {
        callback: function (value) {
          return value + "%";
        },
      },
    },
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
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

<style scoped></style>
