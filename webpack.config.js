var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const port = process.env.PORT || 8080;

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.web.js', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'public/[hash]-[name].[ext]'
                    }
                }]
            },
            {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        include: [path.resolve(__dirname, "node_modules/react-native-fetch-blob")],
	        use: {
	            loader: 'babel-loader'
	        }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ],
    devServer: {
        historyApiFallback: true,
        port: port
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8000'
        })
    },
    output: {
        publicPath: '/',
    }
}
