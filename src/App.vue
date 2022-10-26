<template>
  <router-view />
</template>
<script>
import electron from "electron";
import { download } from "./utils/excel";
// import { getThisWeekLotto } from "./utils/lottos";
const { app } = electron.remote;

export default {
  name: "App",
  data: () => ({
    appVersion: "",
    loading: {},
    downloadData: false,
    lottos: [],
  }),
  async created() {
    this.appVersion = app.getVersion();
    this.showLoading("down");
    await this.downloadExcel();
  },
  async mounted() {},
  methods: {
    async downloadExcel() {
      this.downloadData = await download();
      if (!this.downloadData) await this.downloadExcel();
      else this.hideLoading("down");

      // await this.getLotto();
    },
    showLoading(key) {
      if (this.loading[key]) return;
      this.loading[key] = this.$loading.show({
        container: this.$refs.formContainer,
        onCancel: this.onCancel,
        loader: "dots",
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
