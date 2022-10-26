import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import store from "./store/index";

createApp(App).use(router).use(Loading).use(store).mount("#app");
