const path = require("path")
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/assets/global.less")]
    }
  },
  publicPath: '/',
  configureWebpack: {
    externals: {
      "BMap": "BMap",
      "BMAP_NORMAL_MAP": "BMAP_NORMAL_MAP",
      "BMAP_HYBRID_MAP": "BMAP_HYBRID_MAP"
    }
  },
  // devServer: {
  //   open: false, //是否自动弹出浏览器页面
  //   host: "0.0.0.0",
  //   port: '8080',
  //   https: false,
  //   hotOnly: false,
  //   proxy: {
  //     'api': {
  //       target: 'http://118.24.156.207:8008', //API服务器的地址
  //       ws: true,  //代理websockets
  //       changeOrigin: true, // 虚拟的站点需要更管origin
  //       pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
  //         '^/api': ''
  //       }
  //     }
  //   },
  // },
}
