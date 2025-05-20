// 公共配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
    // join 和 resolve 的区别
    // __dirname返回当前文件所在的绝对路径
    // join: 把全部给定的 path 片段连接到一起，并规范化生成的路径。若任意一个路径片段类型错误
    // resolve: 把一个路径或路径片段的序列解析为一个绝对路径\
    // join 是把各个path片段连接在一起， resolve 把‘／’当成根目录
    // resolve 在传入非/路径时，会自动加上当前目录形成一个绝对路径，而join仅仅用于路径拼接
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件

    output: {
        filename: 'static/js/[name].[chunkhash:8].js', // // 加上[chunkhash:8] // 每个输出js的名称
        path: path.join(__dirname, '../dist'),  // 打包结果输出路径
        clean: true,
        publicPath: '/' // 打包后文件的公共前缀路径
    },


    module: {
        rules: [
            {
                // 只对项目src文件的ts,tsx进行loader解析
                include: [path.resolve(__dirname, '../src')],
                test: /.(ts|tsx)$/,
                use: ['thread-loader', 'babel-loader']
            },
            {
                test: /\.scss$/, //匹配所有的 scss 文件
                include: [path.resolve(__dirname, '../src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: {
                            //     localIdentName: '[local]__[hash:base64:5]',
                            //     namedExport: false
                            // },
                            sourceMap: isDev,
                            importLoaders: 2
                        },
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            //  loader执行顺序是从右往左,从下往上的
            //  匹配到css文件后先用css-loader解析css
            //  最后借助style-loader把css插入到头部style标签中
            {
                test: /\.css$/, //匹配所有的 css 文件
                include: [path.resolve(__dirname, '../src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: {
                            //     localIdentName: '[local]__[hash:base64:5]',
                            //     // css-loader 提供了 modules.namedExport 选项，当它被设置为 true 时，CSS Modules 会使用 named exports 的方式导出类名，而不是 default exports。
                            //
                            //     // 也取决于 esModule 选项的值。如果 esModule 选项的值为 true，则此值也将为 true，否则将为 false
                            //     // Named Export (命名导出): 每个 CSS 类会作为一个具名导出，例如 export const container = “unique-hash-class-name”。
                            //     // Default Export (默认导出): 所有 CSS 类会作为一个对象被默认导出，例如 export default { container: “unique-hash-class-name” }。
                            //     namedExport: false
                            // },
                            sourceMap: isDev,
                            importLoaders: 1
                        },
                    },
                    'postcss-loader'
                ]
            },
            // 预处理图片
            {
                test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/images/[name].[contenthash:8][ext]' // 加上[contenthash:8]
                },
            },
            {
                test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/fonts/[name].[contenthash:8][ext]', // 加上[contenthash:8]
                },
            },
            {
                test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/media/[name].[contenthash:8][ext]', // 加上[contenthash:8]
                },
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        }),
        // 把 process.env.BASE_ENV注入到业务代码里面,就可以通过该环境变量设置对应环境的接口地址和其他数据
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
            'process.env.REACT_APP_PROJECT_NAME': JSON.stringify("课堂教学智能标注系统")
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'], // 检查的文件扩展名
        }),
    ],

    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        // 设置别名
        alias: {
            '@': path.join(__dirname, '../src')
        },
        // 查找第三方模块只在本项目的node_modules中查找
        modules: [path.resolve(__dirname, '../node_modules')],
    },

    cache: {
        type: 'filesystem', // 使用文件缓存
    },
}
