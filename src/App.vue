<template>
  <div class="statistic-container">
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
