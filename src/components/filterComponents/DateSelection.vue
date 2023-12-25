<template>
  <div class="app-date-range filter-comp">
    <VueDatePicker
      locale="ru"
      :clearable="false"
      :auto-apply="true"
      :enable-time-picker="false"
      :range="props.isRange"
      v-model="date"
      :format="'dd.MM.yyyy'"
      :placeholder="placeholderText"
      @update:model-value="handleDate"
    ></VueDatePicker>
  </div>
</template>
<script setup>
import { ref, computed, defineEmits } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { customFormattedDate } from "@/helpers/customDateFormatter";
const props = defineProps(["isRange"]);
const emit = defineEmits(["setSecondLevelData"]);

const date = ref([]);
const placeholderText = computed(() =>
  props.isRange ? "Диапазон дат" : "Одиночная дата"
);
const handleDate = (date) => {
  console.log(date);
  emit("setSecondLevelData", date);
};
</script>

<style lang="scss">
.app-date-range.filter-comp {
  max-width: inherit;
  margin: 10px 0;
  .dp__input {
    font-size: 18px;
    padding: 10px !important;
  }
}
</style>
