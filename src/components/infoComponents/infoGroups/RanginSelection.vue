<template>
  <div class="range-slider-block">
    <h4 class="range-slider-title">Ощее среднее значение</h4>
    <div class="range-slider-visual">
      <div class="range-slider__min">
        {{ min }}
      </div>
      <Slider v-model="rangeData" :min="min" :max="max" disabled />
      <div class="range-slider__max">
        {{ max }}
      </div>
    </div>
  </div>
</template>
<script setup>
import Slider from "@vueform/slider";

const rangeData = [100, 200];
const min = 10;
const max = 250;
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style>
.range-slider-visual {
  width: 100%;
  position: relative;
  border-radius: 4px;
  /* border: 1px solid rgba(0, 66, 105, 0.28); */
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
</style>
