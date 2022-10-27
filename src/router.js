import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./views/HomeView";
import ResultView from "./views/ResultView";
import StartView from "./views/StartView";

const routes = [
  {
    path: "/",
    component: StartView,
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: "/result",
    component: ResultView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
