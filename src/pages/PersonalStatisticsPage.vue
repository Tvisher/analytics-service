<template>
  <AppInDevPoster v-if="pageInDev" />
  <div v-else>
    <h1>Персональная статистика</h1>
    <AppFilter />
    <router-link
      class=""
      :to="{ name: 'personalStatisticItem', params: { id: 1 } }"
      exact="true"
    >
      Персональная статистика по вопросу с ID 1
    </router-link>
    <router-link
      class=""
      :to="{ name: 'personalStatisticItem', params: { id: 2 } }"
      exact="true"
    >
      Персональная статистика по вопросу с ID 2
    </router-link>
    <router-link
      class=""
      :to="{ name: 'personalStatisticItem', params: { id: 3 } }"
      exact="true"
    >
      Персональная статистика по вопросу с ID 3
    </router-link>
  </div>
</template>

<script setup>
import AppFilter from "@/components/Filter.vue";
import AppInDevPoster from "@/components/InDevPoster.vue";

const pageInDev = true;
</script>
