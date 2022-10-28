<template>
  <router-view />
</template>
<script>
import electron, { ipcRenderer } from "electron";
import store from "./store";

const { app } = electron.remote;
export default {
  name: "App",
  data: () => ({
    loading: {},
  }),
  async created() {
    store.commit("setAppVersion", app.getVersion());

    ipcRenderer.send("check_update");
    this.checkForUpdate();
  },
  methods: {
    showLoading(key) {
      if (this.loading[key]) return;
      this.loading[key] = this.$loading.show({
        container: this.$refs.formContainer,
        onCancel: this.onCancel,
        loader: "spinner",
        color: "#A0A0A0",
        backgroundColor: "#000",
        height: 80,
        width: 80,
      });
    },
    hideLoading(key) {
      if (this.loading[key]) {
        this.loading[key].hide();
        this.loading[key] = null;
      }
    },
    checkForUpdate() {
      this.showLoading("checkUpdate");

      let setTime = setInterval(() => {
        ipcRenderer.send("UPDATE_MSG");
        ipcRenderer.on("checkResult", (event, data) => {
          if (data) {
            this.hideLoading("checkUpdate");
            clearInterval(setTime);
          }
        });
      }, 1000 * 5);
    },
  },
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
