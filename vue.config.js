module.exports = {
  publicPath: "./",
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      "/vinci": {
        target: "http://localhost:9090",
        changeOrigin: true,
        pathRewrite: {
          "^/vinci": ""
        }
      }
    }
  }
}