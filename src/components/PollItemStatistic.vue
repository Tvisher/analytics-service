<template>
  <div class="poll-item">
    <div class="poll-item__head">
      <div class="poll-item__num">{{ props.indexNumber }}</div>
      <div class="poll-item__name">{{ pollItemType }}</div>
    </div>
    <div class="poll-item__answer" v-html="questionText"></div>
    <AppPollItemStatisticBody :data="props.data" />
    <div class="poll-item__footer">
      от {{ filterDateFrom }} до {{ filterDateTo }}
    </div>
  </div>
</template>

<script setup>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { customFormattedDate } from "@/helpers/customDateFormatter";
import { ref, computed } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";

import AppPollItemStatisticBody from "@/components/PollItemStatisticBody.vue";

const props = defineProps({
  data: Object,
  indexNumber: Number,
});

const generalStatisticsStore = useGeneralStatistics();
const filterDateFrom = computed(() =>
  customFormattedDate(generalStatisticsStore.dateFilterData.from)
);
const filterDateTo = computed(() =>
  customFormattedDate(generalStatisticsStore.dateFilterData.to)
);

const pollItemType = props.data.PARAMS.TYPENAME;
const questionText = new QuillDeltaToHtmlConverter(
  props.data.PARAMS.NAME,
  {}
).convert();
</script>

<style></style>
