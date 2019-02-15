module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'SecretApp',
        copyright: 'Copyright © 2019 yimou6',
        win: {
          icon: './public/app-icons/logo.ico'
        },
        mac: {
          icon: './public/app-icons/mac_logo.icns'
        }
      }
    }
  }
}
