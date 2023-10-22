<template>
  <template v-if="appHasPagesGeneralData">
    <AppPagesPagination />
    <AppPollItemStatistic
      v-for="(pollItemData, index) in currentPagePollItemsData"
      :data="pollItemData"
      :indexNumber="index + 1"
      :key="pollItemData.ID"
    />
  </template>
  <h2 class="zero-data-title" v-else>За указанный период нет данных</h2>
</template>
<script setup>
import AppPagesPagination from "@/components/PagesPagination.vue";
import AppPollItemStatistic from "@/components/PollItemStatistic.vue";

import { useGeneralStatistics } from "@/stores/GeneralStatistics";
import { storeToRefs } from "pinia";

const generalStatisticsStore = useGeneralStatistics();
const { currentPagePollItemsData } = storeToRefs(generalStatisticsStore);
const { appHasPagesGeneralData } = storeToRefs(generalStatisticsStore);
</script>

<style lang="scss">
.zero-data-title {
  text-align: center;
  padding-top: 20px;
}
</style>
