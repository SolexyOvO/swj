const { IgnorePlugin } = require("webpack");
module.exports = {
  pluginOptions: {
    plugins: [new IgnorePlugin({ 
        resourceRegExp: /serialport/ 
    })],
    electronBuilder: {
      nodeIntegration: true, // 渲染层可以使用node
      webSecurity: false, // 跨域
      enableRemoteModule: true, // 可以使用remote
      externals: ["serialport"],
    },
  },
};
