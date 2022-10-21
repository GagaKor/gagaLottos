const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // productName: "",
        // artifactName: "buddycoin-desktop-Setup-${version}.${ext}",
        // icon: "./public/images/logo.png",
        // options placed here will be merged with default configuration and passed to electron-builder
      },
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    },
  },
  configureWebpack: {
    externals: {
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    },
    target: "electron-renderer",
  },
});
