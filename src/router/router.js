import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import PersonalStatisticsPage from '@/pages/PersonalStatisticsPage.vue';
import PersonalStatisticItemPage from '@/pages/PersonalStatisticItemPage.vue';
import GeneralStatisticsPage from '@/pages/GeneralStatisticsPage.vue';

const routes = [
    {
        path: '/',
        name: 'generalStatistics',
        component: GeneralStatisticsPage
    },
    {
        path: '/personal',
        name: 'personalStatistics',
        component: PersonalStatisticsPage,
    },
    {
        path: '/personal/:id',
        name: 'personalStatisticItem',
        component: PersonalStatisticItemPage,
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
