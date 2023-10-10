<template>
  <div class="range-slider-block">
    <h4 class="range-slider-title">{{ title }}</h4>
    <div class="range-slider-visual">
      <div class="range-slider__min">
        {{ data.min }}
      </div>
      <Slider
        v-model="data.userSelect"
        :min="data.min"
        :max="data.max"
        disabled
      />
      <div class="range-slider__max">
        {{ data.max }}
      </div>
    </div>
    <div class="info-rows">
      <div class="info-row head-row">
        <div class="info-row__item">Количество ответов</div>
        <div class="info-row__item">Проценты</div>
      </div>
      <div class="info-row">
        <div class="info-row__item">434</div>
        <div class="info-row__item">100%</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Slider from "@vueform/slider";

const props = defineProps({
  data: Object,
  title: String,
});
</script>
