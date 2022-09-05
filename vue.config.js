const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  configureWebpack: {
    experiments: {
      topLevelAwait: true
    }
  },

  devServer: {
    proxy: 'https://test-api.blockchain.line.me'
  },
})
