<template>
  <div class="app-datae-range">
    <VueDatePicker
      locale="ru"
      :clearable="false"
      :min-date="minDate"
      :max-date="maxDate"
      :auto-apply="true"
      :enable-time-picker="false"
      :range="true"
      v-model="date"
      :format="'dd.MM.yyyy'"
      :placeholder="''"
      @update:model-value="handleDate"
    ></VueDatePicker>
  </div>
</template>
<script setup>
import { useGeneralStatistics } from "@/stores/GeneralStatistics";
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { customFormattedDate } from "@/helpers/customDateFormatter";

const generalStatisticsStore = useGeneralStatistics();
const changeDateFilter = generalStatisticsStore.changeDateFilter;
let dateFilterData = generalStatisticsStore.dateFilterData;

const dateParts = generalStatisticsStore.pollCreateDate.split(".");
let minDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
minDate = minDate.toISOString().slice(0, 10);

const maxDate = dateFilterData.to;
const date = ref([minDate, maxDate]);

changeDateFilter({
  from: new Date(minDate),
  to: maxDate,
});

const handleDate = (modelData) => {
  console.log(modelData);
  date.value = modelData;
  changeDateFilter({
    from: date.value[0],
    to: date.value[1],
  });
  const dateDataObject = {
    from: customFormattedDate(date.value[0]),
    to: customFormattedDate(date.value[1]),
  };
  generalStatisticsStore.getAppData(dateDataObject);
};
</script>

<style lang="scss">
@import "@vuepic/vue-datepicker/dist/main.css";

.app-datae-range {
  max-width: 230px;
  margin: 20px 0;
}

.dp__input_wrap {
  .dp__input {
    border-color: rgba(0, 66, 105, 0.28) !important;
  }
  &::before {
    cursor: pointer;
    position: absolute;
    right: 34px;
    top: 0;
    height: 100%;
    content: "";
    width: 1px;
    background: rgba(0, 66, 105, 0.28);
  }
  &::after {
    cursor: pointer;
    content: "";
    position: absolute;
    right: 11px;
    top: 50%;
    transform: translateY(-50%);
    width: 13px;
    height: 13px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='path-1-inside-1_2008_302' fill='white'%3e%3cpath d='M0 4.4422C0 3.33763 0.895431 2.4422 2 2.4422H10C11.1046 2.4422 12 3.33763 12 4.4422V11.4422C12 12.5468 11.1046 13.4422 10 13.4422H2C0.895431 13.4422 0 12.5468 0 11.4422V4.4422Z'/%3e%3c/mask%3e%3cpath d='M-1 2.4422C-1 0.785345 0.343146 -0.5578 2 -0.5578H10C11.6569 -0.5578 13 0.785345 13 2.4422L11 5.4422C11 5.4422 10.5523 5.4422 10 5.4422H2C1.44772 5.4422 1 5.4422 1 5.4422L-1 2.4422ZM13 11.4422C13 13.0991 11.6569 14.4422 10 14.4422H2C0.343146 14.4422 -1 13.0991 -1 11.4422H1C1 11.9945 1.44772 12.4422 2 12.4422H10C10.5523 12.4422 11 11.9945 11 11.4422H13ZM2 14.4422C0.343146 14.4422 -1 13.0991 -1 11.4422V2.4422C-1 0.785345 0.343146 -0.5578 2 -0.5578V5.4422C1.44772 5.4422 1 5.4422 1 5.4422V11.4422C1 11.9945 1.44772 12.4422 2 12.4422V14.4422ZM10 -0.5578C11.6569 -0.5578 13 0.785345 13 2.4422V11.4422C13 13.0991 11.6569 14.4422 10 14.4422V12.4422C10.5523 12.4422 11 11.9945 11 11.4422V5.4422C11 5.4422 10.5523 5.4422 10 5.4422V-0.5578Z' fill='%23002033' fill-opacity='0.35' mask='url(%23path-1-inside-1_2008_302)'/%3e%3cmask id='path-3-inside-2_2008_302' fill='white'%3e%3cpath d='M2 0.4422H4V2.4422H2V0.4422Z'/%3e%3c/mask%3e%3cpath d='M2 0.4422V-2.5578H1V0.4422H2ZM4 0.4422H5V-2.5578H4V0.4422ZM4 2.4422V3.4422H5V2.4422H4ZM2 2.4422H1V3.4422H2V2.4422ZM2 3.4422H4V-2.5578H2V3.4422ZM3 0.4422V2.4422H5V0.4422H3ZM4 1.4422H2V3.4422H4V1.4422ZM3 2.4422V0.4422H1V2.4422H3Z' fill='%23002033' fill-opacity='0.35' mask='url(%23path-3-inside-2_2008_302)'/%3e%3cmask id='path-5-inside-3_2008_302' fill='white'%3e%3cpath d='M8 0.4422H10V2.4422H8V0.4422Z'/%3e%3c/mask%3e%3cpath d='M8 0.4422V-2.5578H7V0.4422H8ZM10 0.4422H11V-2.5578H10V0.4422ZM10 2.4422V3.4422H11V2.4422H10ZM8 2.4422H7V3.4422H8V2.4422ZM8 3.4422H10V-2.5578H8V3.4422ZM9 0.4422V2.4422H11V0.4422H9ZM10 1.4422H8V3.4422H10V1.4422ZM9 2.4422V0.4422H7V2.4422H9Z' fill='%23002033' fill-opacity='0.35' mask='url(%23path-5-inside-3_2008_302)'/%3e%3c/svg%3e ");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .dp__icon {
    display: none;
  }
}
.dp__input_icon_pad {
  padding: 6px 30px 6px 12px;
}
</style>
