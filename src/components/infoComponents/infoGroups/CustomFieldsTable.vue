<template>
  <AppShowBySelect />
  <div class="custom-table">
    <div class="custom-table__row head-row">
      <div class="custom-table__col" v-for="tableHadItem in tableHeadData">
        {{ tableHadItem }}
      </div>
    </div>
    <div class="custom-table__row">
      <div class="custom-table__col">Артур</div>
      <div class="custom-table__col">Иванов</div>
      <div class="custom-table__col">8 800 555 35 35</div>
    </div>
    <div class="custom-table__row">
      <div class="custom-table__col">Артур</div>
      <div class="custom-table__col">Иванов</div>
      <div class="custom-table__col">8 800 555 35 35</div>
    </div>
    <div class="custom-table__row">
      <div class="custom-table__col">Артур</div>
      <div class="custom-table__col">Иванов</div>
      <div class="custom-table__col">8 800 555 35 35</div>
    </div>
    <div class="custom-table__row">
      <div class="custom-table__col">Артур</div>
      <div class="custom-table__col">Иванов</div>
      <div class="custom-table__col">8 800 555 35 35</div>
    </div>
    <div class="custom-table__row">
      <div class="custom-table__col">Артур</div>
      <div class="custom-table__col">Иванов</div>
      <div class="custom-table__col">8 800 555 35 35</div>
    </div>
  </div>
</template>
<script setup>
import AppShowBySelect from "@/components/ShowBySelect.vue";

const props = defineProps({
  data: Object,
});

const tableHeadData = props.data.VARIANTS.map((item) => item.UF_VARIANT_VALUE);
</script>

<style lang="scss">
.custom-table {
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #c2cfe0;
  padding: 20px 30px;
}
.custom-table__row {
  &:not(:last-child) {
    border-bottom: 1px solid #c2cfe0;
  }
  align-items: center;
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  &.head-row {
    font-weight: 700;
  }
}
.custom-table__col {
  padding-right: 20px;
  width: 200px;
}
</style>
