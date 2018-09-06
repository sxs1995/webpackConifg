//基于node.js 遵循common.js规范
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
//单页 index.html 引用了 多个js
//多页 a.html  index.js  /  b.html  a.js
module.exports = {
    //entry可以写一个数组
    //entry: ['./src/index.js', './src/a.js'], //入口
    // entry: {
    //     index: './src/index.js',
    //     a: './src/a.js'
    // },
    entry: './src/index.js',
    output: {
        filename: '[name].[hash:8].js',
        //路径必须是绝对路径
        path: path.resolve('./build')
    }, //出口
    devServer: {
        contentBase: './build',
        port: '3000',
        compress: true, //服务器压缩
        open: true, //自动打开浏览器
        hot: true //热更新
    }, //开发服务器
    module: {
        rules: [ //从右往左写
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: "css-loader"
                }]
            },{
                test:/\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: "css-loader"
                },{
                    loader:'less-loader'
                }]
            }
        ]
    }, //模块配置 css 
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //打包html插件
        new HtmlWebpackPlugin({
            // filename: 'b.html',
            template: './src/index.html',
            title: '我很帅!', //标题
            hash: true,
            // chunks: ['a']
            // minify: {
            //     removeAttributeQuotes: true, //去掉双引号
            //     collapseWhitespace: true
            // }, //压缩
        }),
        new CleanWebpackPlugin(['./build'])
    ], //插件的配置
    mode: 'development', //可以更改模式
    resolve: {}, //配置解析
}
// 1.在webpack中如何配置开发服务器

// 2.webpack插件 1.将html打包到build下可以自动引入生产的.js