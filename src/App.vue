<template>
  <transition name="fade">
    <div class="statistic-container" v-if="appLoaded">
      <h1 class="statistic-title">Аналитика</h1>
      <TheStatisticHead />
      <TheStatisticBody />
    </div>
  </transition>
</template>

<script setup>
import TheStatisticHead from "@/components/StatisticHead.vue";
import TheStatisticBody from "@/components/StatisticBody.vue";
import { ref, onMounted } from "vue";
import { useGeneralStatistics } from "./stores/GeneralStatistics";

const generalStatisticsStore = useGeneralStatistics();
const getAppData = generalStatisticsStore.getAppData;

const appLoaded = ref(false);
onMounted(() => {
  getAppData()
    .then(function (response) {
      appLoaded.value = true;
    })
    .catch(function (error) {
      if (process.env.NODE_ENV === "development") {
        appLoaded.value = true;
      } else {
        console.log("Ошибка!!!", error);
        appLoaded.value = true;
      }
    });
});
</script>

<style></style>
