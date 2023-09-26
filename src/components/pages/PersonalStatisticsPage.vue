<template>
  <h1>Персональная статистика</h1>

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
</template>
