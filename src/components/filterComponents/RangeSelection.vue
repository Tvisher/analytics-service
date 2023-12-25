<template>
  <div class="range-slider-block">
    <div class="range-slider-visual">
      <div class="range-slider__min">
        {{ data.GENERAL_RANGE_START }}
      </div>
      <Slider
        v-model="sliderData"
        :min="data.GENERAL_RANGE_START"
        :max="data.GENERAL_RANGE_END"
        @update="changeRange"
      />
      <div class="range-slider__max">
        {{ data.GENERAL_RANGE_END }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Slider from "@vueform/slider";
const emit = defineEmits(["setSecondLevelData"]);
const sliderData = ref([
  props.data.GENERAL_RANGE_START,
  props.data.GENERAL_RANGE_END,
]);

const props = defineProps({
  data: Object,
});

const changeRange = () => {
  const secondLevelFiltedData = {
    from: sliderData.value[0],
    to: sliderData.value[1],
  };
  emit("setSecondLevelData", secondLevelFiltedData);
};
</script>
<style scoped>
.range-slider-visual {
  background-color: #fff;
  padding: 50px 20px 30px;
}
</style>
