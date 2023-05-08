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
    // proxy: {
      // '/api/v1': {
      //   target: 'https://dosi-api.line-apps-beta.com',
      // },
      // 'v1': {
        // proxy: 'https://api.blockchain.line.me',
        // proxy: 'https://api.blockchain.line.me',
        // Beta Main net
      proxy: {
        '/v1': {
          // target: 'https://test-api.blockchain.line.me',
          target: 'https://test-api.blockchain.line-beta.me',
          // changeOrigin: true,
        }
      }
      // changeOrigin: true
      //   // proxy: 'https://api.blockchain.line-beta.me'
      //   // proxy: 'https://explorer.blockchain.line.me'
      // },
    // }
  },
})
