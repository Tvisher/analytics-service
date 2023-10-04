import { createPinia } from 'pinia'
import { createApp, h } from 'vue'
import router from "@/router/router";

import "@/assets/scss/main.scss";

import App from './App.vue'


import vSelect from 'vue-select';
vSelect.props.components.default = () => ({
    OpenIndicator: {
        render: () => h("span", {
            class: { "toggle-arrow": true },
        }),
    },
    Deselect: {
        render: () => h("span", {
            class: { "deselect-btn": true },
            title: ''
        }),
    },
});


createApp(App)
    .use(router)
    .use(createPinia())
    .component('vSelect', vSelect)
    .mount('#app')
