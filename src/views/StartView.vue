<template>
  <div class="startDiv">
    <button class="startBtn" @click="startBtn()">Start</button>
  </div>
</template>

<script>
import { downloadExcel } from "../utils/excel";
import fs from "fs";

export default {
  data: () => ({
    loading: {},
    windowHeight: 0,
  }),
  created() {},

  methods: {
    async startBtn() {
      fs.readdir("C://lotto", async (err, files) => {
        if (!files.includes("excel.xls")) {
          this.showLoading("down");
          const result = await downloadExcel();
          if (result) {
            this.hideLoading("down");
            this.$router.push("/home");
          }
        } else {
          this.$router.push("/home");
        }
      });
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

<style lang="scss" scoped>
.startDiv {
  height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: black;
}
.startBtn {
  width: 10.5em;
  height: 3em;
  border-radius: 0.4em;
  background-color: rgba(142, 149, 152, 0.3);
  font-weight: bold;
  font-size: 1.2em;
}
</style>
