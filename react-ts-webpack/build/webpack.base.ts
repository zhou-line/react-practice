// 公共配置
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
const path = require("path");

const baseConfig: Configuration = {
    // join 和 resolve 的区别
    // __dirname返回当前文件所在的绝对路径
    // join: 把全部给定的 path 片段连接到一起，并规范化生成的路径。若任意一个路径片段类型错误
    // resolve: 把一个路径或路径片段的序列解析为一个绝对路径\
    // join 是把各个path片段连接在一起， resolve 把‘／’当成根目录
    // resolve 在传入非/路径时，会自动加上当前目录形成一个绝对路径，而join仅仅用于路径拼接
    entry: path.join(__dirname, "../src/index.tsx"),

    output: {
        filename: 'static/js/[name].js', // 每个输出js的名称
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        clean: true, // webpack4 需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },

    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: 'babel-loader',
            },
            {
                test: /.css$/, //匹配 css 文件
                use: ["style-loader", "css-loader"],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "react_ts_webpack",
            filename: "index.html",
            // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
            template: path.join(__dirname, "../public/index.html"),
            inject: true, // 自动注入静态资源
            hash: true,
            cache: false,
            // 压缩html资源
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true, //去空格
                removeComments: true, // 去注释
                minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyCSS: true, // 缩小CSS样式元素和样式属性
            },
            nodeModules: path.resolve(__dirname, "../node_modules"),
        }),
    ],

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
}

export default baseConfig
