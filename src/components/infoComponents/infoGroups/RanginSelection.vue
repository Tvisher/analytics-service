<template>
  <AppRangeBlock :data="averageData" :title="'Общее среднее значение'" />
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
      v-for="(singleData, index) in selectedDataArr"
      :data="singleData"
      :key="index"
      :title="`Значение ${index + 1}`"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import AppRangeBlock from "@/components/infoComponents/RangeBlock.vue";
const selectedVisualType = ref("only-general");
const selectedDataArr = ref([]);

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

const selectVisualType = (type) => {
  selectedVisualType.value = type;
  if (type === "five-row-data") {
    selectedDataArr.value = fiveDataArr;
  }
  if (type === "ten-row-data") {
    selectedDataArr.value = tenDataArr;
  }
};

const averageData = {
  userSelect: [100, 200],
  min: 10,
  max: 250,
};

const fiveDataArr = [
  {
    userSelect: [90, 140],
    min: 10,
    max: 250,
  },
  {
    userSelect: [120, 210],
    min: 10,
    max: 250,
  },
  {
    userSelect: [100, 200],
    min: 10,
    max: 250,
  },
  {
    userSelect: [120, 210],
    min: 10,
    max: 250,
  },
  {
    userSelect: [100, 200],
    min: 10,
    max: 250,
  },
];

const tenDataArr = [
  {
    userSelect: [120, 210],
    min: 10,
    max: 250,
  },
  {
    userSelect: [100, 200],
    min: 10,
    max: 250,
  },
  {
    userSelect: [90, 140],
    min: 10,
    max: 250,
  },
  {
    userSelect: [120, 210],
    min: 10,
    max: 250,
  },
  {
    userSelect: [100, 200],
    min: 10,
    max: 250,
  },
  {
    userSelect: [120, 210],
    min: 10,
    max: 250,
  },
  {
    userSelect: [100, 200],
    min: 10,
    max: 250,
  },
  {
    userSelect: [90, 140],
    min: 10,
    max: 250,
  },
  {
    userSelect: [120, 210],
    min: 10,
    max: 250,
  },
  {
    userSelect: [100, 200],
    min: 10,
    max: 250,
  },
];
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
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
