import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import store from "./store/index";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRotate,
  faForward,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faRotate, faForward, faHouse);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(Loading);
app.use(store);
app.mount("#app");
