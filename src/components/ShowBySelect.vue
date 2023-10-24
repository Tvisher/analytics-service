<template>
  <div class="show-by-wrapper">
    <span>Показывать по:</span>
    <div class="show-by-select">
      <vSelect :searchable="false" :options="options" v-model="selectedValue">
      </vSelect>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineEmits } from "vue";
const emit = defineEmits(["selectCountToShow"]);
const options = [
  { label: 10 },
  { label: 20 },
  { label: 40 },
  { label: 60 },
  { label: 100 },
  { label: "Все" },
];
const selectedValue = ref(options[0]);

watch(selectedValue, (newVal) => {
  emit("selectCountToShow", newVal.label);
});
</script>
<style lang="scss">
.show-by-wrapper {
  margin-bottom: 20px;
  color: #262b31;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  display: flex;
  align-items: center;
}
.show-by-select {
  width: 83px;
  margin-left: 20px;
  .vs__dropdown-toggle {
    font-size: 14px;
    padding: 0px !important;
  }
  .vs__open-indicator.toggle-arrow {
    width: 32px;
    height: 32px;
  }
  .vs__actions {
    margin: 0 !important;
    flex-shrink: 0;
  }
  .vs__search,
  .vs__selected {
    padding: 0px 9px !important;
    padding-right: 0 !important;
    font-size: 14px !important;
  }
  .vs__dropdown-menu {
    width: 83px;
    min-width: inherit;
  }
  .vs__no-options {
    padding: 10px;
    text-align: left;
  }
  .vs__dropdown-option {
    font-size: 14px;
    padding: 5px 10px !important;
  }
  .vs__dropdown-option--highlight {
    background-color: #fa0056;
  }
  .vs__clear,
  .vs__search {
    display: none;
  }
  .vs--single.vs--open .vs__selected,
  .vs--single.vs--loading .vs__selected {
    position: static;
  }
}
</style>
