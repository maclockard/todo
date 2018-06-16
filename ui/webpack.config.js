const path = require("path");
const webpack = require("webpack");
const { CheckerPlugin } = require("awesome-typescript-loader");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const basePlugins = [
    // `CheckerPlugin` is optional. Use it if you want async error reporting.
    // We need this plugin to detect a `--watch` mode. It may be removed later
    // after https://github.com/webpack/webpack/issues/3460 will be resolved.
    new CheckerPlugin(),
    new CircularDependencyPlugin({
        exclude: /.js|node_modules/,
        failOnError: true,
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
    }),
];

const devPlugins = basePlugins;

const prodPlugins = basePlugins.concat([
    new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true,
    }),

    new MiniCssExtractPlugin({
        filename: "[name].css",
    }),

    new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: "report.html",
    }),
]);

const baseStyleLoaders = [
    require.resolve("css-loader"),
    require.resolve("sass-loader"),
];

const devStyleLoaders = [require.resolve("style-loader")].concat(
    baseStyleLoaders,
);

const prodStyleLoaders = [MiniCssExtractPlugin.loader].concat(baseStyleLoaders);

module.exports = {
    entry: {
        index: ["./src/index.ts", "./src/index.scss"],
    },

    output: {
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        path: path.resolve(__dirname, "./lib"),
    },

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    },

    mode: IS_PRODUCTION ? "production" : "development",

    devtool: IS_PRODUCTION ? false : "inline-source-map",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: require.resolve("awesome-typescript-loader"),
                options: {
                    configFileName: "./config/tsconfig.json",
                    useCache: true,
                },
            },
            {
                test: /\.scss$/,
                use: IS_PRODUCTION ? prodStyleLoaders : devStyleLoaders,
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg|png|gif)$/,
                loader: require.resolve("file-loader"),
            },
        ],
    },

    plugins: IS_PRODUCTION ? prodPlugins : devPlugins,
};
