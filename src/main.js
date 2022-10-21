import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

createApp(App).use(router).use(Loading).mount("#app");
