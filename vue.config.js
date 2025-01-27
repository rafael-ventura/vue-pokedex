const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  // Define o caminho base para o projeto
  publicPath: './',

  // Gera arquivos diretamente no `dist`, sem subpastas
  outputDir: 'dist',
  assetsDir: '',

  // Remove hashes opcionais dos arquivos para simplificar caminhos
  filenameHashing: false,

  // Configurações extras para saída de arquivos
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
  },
});
