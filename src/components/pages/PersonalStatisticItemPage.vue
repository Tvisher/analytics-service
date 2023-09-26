<template>
  <router-link class="" :to="{ name: 'personalStatistics' }">
    &#8592;К списку
  </router-link>
  <h1>Персональная статистика по опросу с ID{{ $route.params.id }}</h1>
</template>
