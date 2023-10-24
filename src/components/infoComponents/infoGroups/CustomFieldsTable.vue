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

<style lang="scss"></style>
