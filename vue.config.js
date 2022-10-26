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
        worldSafeExecuteJavaScript: true, // required for Electron 12+
        contextIsolation: false, // required for Electron 12+
        nodeIntegration: true,
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
