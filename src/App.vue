<template>
  <router-view />
</template>
<script>
import electron, { ipcRenderer } from "electron";
import store from "./store";

const { app } = electron.remote;
export default {
  name: "App",
  async created() {
    console.log(app.getVersion());
    store.commit("setAppVersion", app.getVersion());
    ipcRenderer.send("check_update");
  },
  async mounted() {},
  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #eff2eb;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
