// vue.config.js
module.exports = {
  // 打包app时放开该配置
  publicPath: './',

  //fixable rem布局
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  },

  devServer:{
    proxy:{
      '/':{
        target:'http://127.0.0.1:10086/',//本地
        secure: false,
        changeOrigin: true
      }
    }
  },
}
