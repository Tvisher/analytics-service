<template>
  <div class="statistic-container">
    <h1 class="statistic-title">Аналитика</h1>
    <TheStatisticHead />
    <TheStatisticBody />
  </div>
</template>

<script setup>
import { useGeneralStatistics } from "./stores/GeneralStatistics";
import TheStatisticHead from "@/components/StatisticHead.vue";
import TheStatisticBody from "@/components/StatisticBody.vue";

const generalStatistics = useGeneralStatistics();
</script>

<style scoped></style>
