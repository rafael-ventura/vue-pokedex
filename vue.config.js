const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-pokedex/' : '/',
  outputDir: path.resolve(__dirname, 'dist'),
  assetsDir: '', // Isso faz com que os arquivos sejam colocados diretamente no dist
  filenameHashing: false, // Opcional, remove hashes dos nomes dos arquivos
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
  },
});
