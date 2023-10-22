<template>
  <AppPagesPagination />
  <AppPollItemStatistic
    v-for="(pollItemData, index) in currentPagePollItemsData"
    :data="pollItemData"
    :indexNumber="index + 1"
    :key="pollItemData.ID"
  />
</template>
<script setup>
import AppPagesPagination from "@/components/PagesPagination.vue";
import AppPollItemStatistic from "@/components/PollItemStatistic.vue";

import { useGeneralStatistics } from "@/stores/GeneralStatistics";
import { storeToRefs } from "pinia";

const generalStatisticsStore = useGeneralStatistics();
const { currentPagePollItemsData } = storeToRefs(generalStatisticsStore);
</script>
