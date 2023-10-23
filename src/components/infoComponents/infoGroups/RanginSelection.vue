<template>
  <AppRangeBlock
    :data="averageData"
    :title="'Общее среднее значение'"
    :hasData="true"
  />
  <div class="poll-item__visual-variants">
    <button
      class="visual-variant"
      :class="{ selected: visualType.type === selectedVisualType }"
      v-for="visualType in visualTypes"
      :key="visualType.type"
      @click="selectVisualType(visualType.type)"
    >
      {{ visualType.text }}
    </button>
  </div>
  <div class="range-slider-blocks" v-if="selectedVisualType !== 'only-general'">
    <AppRangeBlock
      v-if="selectedDataArrLength"
      v-for="(singleData, index) in selectedDataArr"
      :data="singleData"
      :key="index"
      :title="`Значение ${index + 1}`"
    />
    <div v-else class="range-slider-info">
      Для отображения детальной статистики необходимо больше данных от
      респондентов
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import AppRangeBlock from "@/components/infoComponents/RangeBlock.vue";

const props = defineProps({
  data: Object,
});

const selectedVisualType = ref("only-general");
const selectedDataArr = ref([]);
const selectedDataArrLength = computed(() => selectedDataArr.value.length > 0);

const visualTypes = [
  {
    type: "only-general",
    text: "х",
  },
  {
    type: "five-row-data",
    text: "5 строк",
  },
  {
    type: "ten-row-data",
    text: "10 строк",
  },
];

const defaultMin = props.data.PARAMS.GENERAL_RANGE_START;
const defaultMax = props.data.PARAMS.GENERAL_RANGE_END;
const userSelectMin = props.data.ANSWERS.GEN_START_RANGE;
const userSelectMax = props.data.ANSWERS.GEN_END_RANGE;
const tableCount = props.data.ANSWERS.GEN_COUNT_ANSW;
const averageData = {
  userSelect: [userSelectMin, userSelectMax],
  min: defaultMin,
  max: defaultMax,
  tablePrecent: 100,
  tableCount,
};
const fiveDataArr = Object.values(props.data.ANSWERS.RANGE5).map((item) => {
  return {
    userSelect: [item.START, item.END],
    min: item.START_SCALE,
    max: item.END_SCALE,
    tableCount: item.COUNT_ANSW,
    tablePrecent: item.PROC,
  };
});

const tenDataArr = Object.values(props.data.ANSWERS.RANGE10).map((item) => {
  return {
    userSelect: [item.START, item.END],
    min: item.START_SCALE,
    max: item.END_SCALE,
    tableCount: item.COUNT_ANSW,
    tablePrecent: item.PROC,
  };
});

const selectVisualType = (type) => {
  selectedVisualType.value = type;
  if (type === "five-row-data") {
    selectedDataArr.value = fiveDataArr;
  }
  if (type === "ten-row-data") {
    selectedDataArr.value = tenDataArr;
  }
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
.range-slider-info {
  padding: 10px 0;
  font-size: 22px;
  text-align: center;
}
.range-slider-visual {
  width: 100%;
  position: relative;
  border-radius: 4px;
  padding: 50px 10px 30px;
}

.slider-connects,
.slider-base {
  height: 4px;
}
.slider-base {
  border-radius: 4px;
  background: rgba(0, 66, 105, 0.07);
}
.slider-connect {
  background-color: rgba(250, 0, 86, 1) !important;
}
.slider-tooltip {
  background-color: #fff !important;
  color: #002033;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border: none;
  box-shadow: 0px 8px 24px 0px rgba(0, 32, 51, 0.12),
    0px 4px 4px 0px rgba(0, 32, 51, 0.04);
}

.range-slider__min,
.range-slider__max {
  position: absolute;
  bottom: 10px;
  color: #002033;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%; /* 18px */
}
.range-slider__min {
  left: 10px;
}
.range-slider__max {
  right: 10px;
  text-align: right;
}

.range-slider-title {
  color: #262b31;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 19.6px */
}

.info-row {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #d9d9d9;
  &.head-row {
    font-size: 14px;
    font-weight: 700;
    line-height: 140%; /* 19.6px */
  }
  .info-row__item {
    width: 50%;
  }
}
.range-slider-blocks,
.range-slider-block {
  margin-bottom: 20px;
}
</style>
