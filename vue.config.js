const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,

    // Caminho base para os arquivos em produção (relativo)
    publicPath: './',

    // Diretório onde os arquivos serão gerados
    outputDir: 'dist',

    // Colocar todos os arquivos na raiz de `dist` sem subpastas
    assetsDir: '',

    // Remover hashes opcionais nos nomes dos arquivos
    filenameHashing: false,

    // Configurações adicionais para Webpack
    configureWebpack: {
        output: {
            filename: '[name].js', // Arquivo principal
            chunkFilename: '[name].js', // Arquivos divididos (chunks)
        },
    },

    chainWebpack: (config) => {
        // Forçar imagens, fontes e outros assets na raiz de `dist`
        config.module
            .rule('images')
            .set('generator', {
                filename: '[name][ext]'
            });

        config.module
            .rule('fonts')
            .set('generator', {
                filename: '[name][ext]'
            });

        config.module
            .rule('svg')
            .set('generator', {
                filename: '[name][ext]'
            });

        config.module
            .rule('css')
            .set('generator', {
                filename: '[name][ext]'
            });
    },
})
