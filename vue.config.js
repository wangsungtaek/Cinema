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
    proxy: 'https://api.blockchain.line.me'
    // proxy: 'https://explorer.blockchain.line.me'
  },
})
