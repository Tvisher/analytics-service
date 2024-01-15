<template>
  <router-link class="" :to="{ name: 'personalStatistics' }">
    &#8592;К списку
  </router-link>

  <pre>
    {{ currentPageData }}
  </pre>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { usePersonalStatistic } from "@/stores/PersonalStatistic";

const usePersonalStatisticStore = usePersonalStatistic();
const route = useRoute();

const currentPageData = usePersonalStatisticStore.currentUserResult(
  route.params.id
);
console.log(currentPageData);
</script>
