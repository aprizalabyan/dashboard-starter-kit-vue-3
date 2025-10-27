import "./assets/styles/main.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { vuetify } from "./plugins/vuetify";
import dayjs from "./plugins/dayjs";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(dayjs);

app.mount("#app");
