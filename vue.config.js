const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: './', // Caminhos relativos para produção
    outputDir: 'dist', // Diretório de saída
    assetsDir: '', // Coloca tudo no diretório `dist`, sem subpastas
    filenameHashing: false, // Remove hashes opcionais
});
