<template>
  <transition name="fade">
    <div class="statistic-container">
      <template v-if="appLoaded">
        <h1 class="statistic-title">Аналитика</h1>
        <TheStatisticHead />
        <TheStatisticBody
          :class="{ isPersonalInfoPage: !isPersonalInfoPage }"
        />
      </template>
      <div class="loaded-data-text" v-else>
        <span class="two-ball-loader"></span>
        <span>Идёт загрузка данных, пожалуйста подождите...</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import TheStatisticHead from "@/components/StatisticHead.vue";
import TheStatisticBody from "@/components/StatisticBody.vue";
import { ref, onMounted, computed } from "vue";
import { useGeneralStatistics } from "./stores/GeneralStatistics";
import { usePersonalStatistic } from "./stores/PersonalStatistic";
import { useRoute } from "vue-router";

const generalStatisticsStore = useGeneralStatistics();
const usePersonalStatisticStore = usePersonalStatistic();

const getAppData = generalStatisticsStore.getAppData;
// const getPersonalStatisticData =
//   usePersonalStatisticStore.getPersonalStatisticData;

const appLoaded = ref(false);

onMounted(() => {
  getAppData()
    .then((response) => {
      appLoaded.value = true;
    })
    .catch(function (error) {
      if (process.env.NODE_ENV === "development") {
        appLoaded.value = true;

        // getPersonalStatisticData()
        //   .then((res) => {
        //     console.log(res);
        //     appLoaded.value = true;
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     appLoaded.value = true;
        //   });
      } else {
        console.log("Ошибка!!!", error);
        appLoaded.value = false;
      }
    });
});
const isPersonalInfoPage = computed(
  () => useRoute().name != "personalStatisticItem"
);
</script>

<style></style>
