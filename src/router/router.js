import { createRouter, createWebHistory } from "vue-router";
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
    // scrollBehavior(to, from, savedPosition) {
    //     return {
    //         top: 0,
    //         behavior: 'smooth',
    //     }
    // },
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;
