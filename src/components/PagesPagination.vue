<template>
  <div class="pages-pagination" v-if="pagesCount > 0">
    <div
      class="pagination-item"
      v-for="(page, index) in pagesCount"
      :key="index"
      :class="{ active: index === currentPageIndex }"
      @click="setCurrentPage(index)"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";
import { storeToRefs } from "pinia";

const generalStatisticsStore = useGeneralStatistics();

const { currentPageIndex } = storeToRefs(generalStatisticsStore);
const pagesCount = generalStatisticsStore.pagesCount;

const setCurrentPage = (index) => generalStatisticsStore.setCurrentPage(index);
</script>
