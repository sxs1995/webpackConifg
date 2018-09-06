//基于node.js 遵循common.js规范
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')  //样式
let LessExtract = new ExtractTextWebpackPlugin({
    filename:'css/less.css',
    disable:true
})
let CssExtract = new ExtractTextWebpackPlugin({
    filename:'css/css.css',
    disable:true
})
let CopyWebpackPlugin = require('copy-webpack-plugin')
let PurifyCssWebpack = require('purifycss-webpack')
let glob = require('glob')
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
                use:CssExtract.extract({
                    fallback:'style-loader',
                    use: [{
                        loader: "postcss-loader"
                    }]
                })
            }, {
                test: /\.less$/,
                use:LessExtract.extract({
                    fallback:'style-loader',
                    use: [{
                        loader: "postcss-loader"
                    },{
                        loader:'less-loader'
                    }]
                })
            }
        ]
    }, //模块配置 css 
    plugins: [
        LessExtract,
        CssExtract,
        new ExtractTextWebpackPlugin({
            filename:'css/index.css'
        }),
        new CopyWebpackPlugin([{
            from: './src/doc',
            to: 'text'
          }]),
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
        new CleanWebpackPlugin(['./build']),
        //消除掉没用的css 必须放在HtmlWebpackPlugin后面
        new PurifyCssWebpack({
            paths:glob.sync(path.resolve('src/*.html'))
        })
    ], //插件的配置
    mode: 'development', //可以更改模式
    resolve: {}, //配置解析
}
// 1.在webpack中如何配置开发服务器

// 2.webpack插件 1.将html打包到build下可以自动引入生产的.js

// 3.抽离样式  抽离到一个css文件内npm install extract-text-webpack-plugin@next mini-css-exreact-plugin

// 4.删除多余样式 npm i purifycss-webpack purify-css glob -D

// 5. npm i postcss-loader autprefixer 自动添加前缀

// 6. npm i copy-webpack-plugin -D  拷贝文件夹
