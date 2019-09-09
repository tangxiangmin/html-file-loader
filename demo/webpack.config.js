let path = require('path');

let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    let isProduction = env && env.production

    return {
        devtool: isProduction ? '' : 'source-map',
        entry: {
            index: path.resolve(__dirname, './index.js'),
        },
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: `[name]-[chunkhash:6].js`,
            publicPath: '/'
        },
        resolveLoader: {
            alias: {
                'html-file-loader': path.join(__dirname, '../src/loader'),
            }
        },
        module: {
            rules: [
                // {
                //     test: /\.js$/,
                //     loader: "babel-loader",
                //     exclude: /node_modules/
                // },
                {
                    test: /\.(png|jpg|jpeg|svg)/,
                    use: {loader: "url-loader", options: {limit: 4096}}
                },
                {
                    test: /\.(mp3)/,
                    loader: 'file-loader',
                },
                {
                    test: /\.(woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                },
                {
                    test: /\.(htm|html)$/i,
                    loader: 'html-file-loader',
                    options: {} // todo
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, './index.html')
                }
            )
        ],
        devServer: {//配置此静态文件服务器，可以用来预览打包后项目
            contentBase: path.resolve(__dirname, './'),
            host: 'localhost',
            port: 8080,
            compress: true,
            disableHostCheck: true,
        },
        stats: {
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }

    }

}
