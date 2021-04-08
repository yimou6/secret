module.exports = {
    devServer: {
        port: 9000
    },
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.ts'
        }
    }
}
