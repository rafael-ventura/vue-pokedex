const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  // Caminho base para o projeto (ajustado para deploy estático)
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // Diretório de saída
  outputDir: 'dist',

  // Evita subpastas para assets
  assetsDir: '',

  // Remove hashes opcionais para simplificar caminhos
  filenameHashing: false,

  // Configurações adicionais para Webpack
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
  },

  // Configurações para lidar com imagens, fontes e SVGs
  chainWebpack: (config) => {
    config.module
        .rule('images')
        .set('generator', {
          filename: '[name][ext]',
        });

    config.module
        .rule('fonts')
        .set('generator', {
          filename: '[name][ext]',
        });

    config.module
        .rule('svg')
        .set('generator', {
          filename: '[name][ext]',
        });
  },
});
