'use strict'

const CompressionPlugin = require("compression-webpack-plugin");
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css'];

module.exports = {
    // 基本路径
    publicPath: "/service_web",  //默认用service_web  ipay88用qrmenu 
    // 输出文件目录
    outputDir: 'dist',
    // 用于嵌套生成的静态资产（js，css，img，fonts）的目录。
    assetsDir: '',
    // 以多页模式构建应用程序。
    pages: {
        login: {
            entry: "src/views/login/index.js", //配置入口js文件
            template: "src/views/login/login.html", //主页面
            filename: "login.html", //打包后的html文件名称
            title: "登录", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        download: {
            entry: "src/views/download/index.js", //配置入口js文件
            template: "src/views/download/download.html", //主页面
            filename: "download.html", //打包后的html文件名称
            title: "下载", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        code: {
            entry: "src/views/code/index.js", //配置入口js文件
            template: "src/views/code/code.html", //主页面
            filename: "code.html", //打包后的html文件名称
            title: "验证码", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        register: {
            entry: "src/views/register/index.js", //配置入口js文件
            template: "src/views/register/register.html", //主页面
            filename: "register.html", //打包后的html文件名称
            title: "注册" ,//打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        start: {
            entry: "src/views/start/index.js", //配置入口js文件
            template: "src/views/start/start.html", //主页面
            filename: "start.html", //打包后的html文件名称
            title: "开始点餐", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        index: {
            entry: "src/views/index/index.js", //配置入口js文件
            template: "src/views/index/index.html", //主页面
            filename: "index.html", //打包后的html文件名称
            title: "开始点餐", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        shopcart: {
            entry: "src/views/shopcart/index.js", //配置入口js文件
            template: "src/views/shopcart/shopcart.html", //主页面
            filename: "shopcart.html", //打包后的html文件名称
            title: "购物车", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        orderDetails: {
            entry: "src/views/orderDetails/index.js", //配置入口js文件
            template: "src/views/orderDetails/orderDetails.html", //主页面
            filename: "orderDetails.html", //打包后的html文件名称
            title: "订单详情", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        menutype: {
            entry: "src/views/menutype/index.js", //配置入口js文件
            template: "src/views/menutype/menutype.html", //主页面
            filename: "menutype.html", //打包后的html文件名称
            title: "菜单分类列表", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        evaluate: {
            entry: "src/views/evaluate/index.js", //配置入口js文件
            template: "src/views/evaluate/evaluate.html", //主页面
            filename: "evaluate.html", //打包后的html文件名称
            title: "评价", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        dish: {
            entry: "src/views/dish/index.js", //配置入口js文件
            template: "src/views/dish/dish.html", //主页面
            filename: "dish.html", //打包后的html文件名称
            title: "菜品列表", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        
        user: {
            entry: "src/views/user/user.js", //配置入口js文件
            template: "src/views/user/user.html", //主页面
            filename: "user.html", //打包后的html文件名称
            title: "用户中心", //打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        },
        member: {
            entry: "src/views/member/index.js", //配置入口js文件
            template: "src/views/member/member.html", //主页面
            filename: "member.html", //打包后的html文件名称
            title: "会员中心",//打包后的.html中<title>标签文本内容
            favicon:'./src/style/images/favicon.ico'
        }

    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 是否使用包含运行时编译器的Vue核心的构建。
    runtimeCompiler: false,
    // 默认情况下babel-loader忽略其中的所有文件node_modules。
    transpileDependencies: [
        'biyi-admin', // 指定对第三方依赖包进行babel-polyfill处理
    ],
    // 生产环境sourceMap
    productionSourceMap: false,
    // webpack配置
    configureWebpack: {
         //统一配置打包插件 Gzip
        plugins: [
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配文件名
                threshold: 10240,//对10K以上的数据进行压缩
                minRatio: 0.8,
                deleteOriginalAssets:false,//是否删除源文件
            })
        ]
    },
    //图片压缩
    chainWebpack: (config) => {
        // 解决ie11兼容ES6
        config.entry('index').add('babel-polyfill')
        // 开启图片压缩
        config.module.rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        // 线上开启js、css压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin')
            .use(new CompressionPlugin({
                test:/\.js$|\.html$|.\css/, // 匹配文件名
                threshold: 5120, // 对超过5k的数据压缩
                deleteOriginalAssets: false // 不删除源文件
            }))
        }

    },

    // css相关配置
    css: {
        // 启用 CSS modules
        modules: false,
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
    },
    // webpack-dev-server 相关配置
    devServer: {
        // host: 'localhost',
        // port: 8080,
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/api': {
        //         /* 目标代理服务器地址 */
        //         target: 'http://epay.mjoyapp.com/',
        //         /* 允许跨域 */
        //         changeOrigin: true,
        //         ws:true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     },
        // },


    },
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    pwa: {},
    // 第三方插件配置
    pluginOptions: {
        // ...
    },
}