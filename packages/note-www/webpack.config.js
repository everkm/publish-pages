const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WebpackAssetsManifest = require('webpack-assets-manifest')
const {VueLoaderPlugin} = require('vue-loader')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// eslint-disable-next-line no-unused-vars
const CopyWebpackPlugin = require('copy-webpack-plugin')
// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const {getEntrypoint} = require('./webpack.entrypoint.js')
const Dotenv = require('dotenv-webpack')
const dotenv = require('dotenv')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const resolve = (dir) => path.resolve(__dirname, dir)

const env = process.env
const envFilePath = env.ENV_FILE
if (!envFilePath) {
  throw new Error('not found environment variable ENV_FILE')
}
dotenv.config({path: resolve(envFilePath)})
console.warn('env file', resolve(envFilePath))

const isProd = env.NODE_ENV === 'production'
const isDisableHash = env.DISABLE_HASH === '1'

console.warn('entrypoint', getEntrypoint())

const assetsDir = () => {
  return isDisableHash ? 'assets/' : `assets/`
}
module.exports = {
  mode: env.NODE_ENV,

  // devtool: 'cheap-module-source-map',
  // devtool: 'eval-cheap-module-source-map',
  // devtool: 'source-map',
  devtool: isProd ? false : 'eval-source-map',
  // devtool: 'cheap-module-source-map',

  // 入口配置
  entry: getEntrypoint(),

  // runtimeCompiler: true,
  target: 'web',
  // stats: 'errors-warnings',
  // stats: {children: true},
  stats: {errorDetails: true},
  externals: {
    // vue: 'Vue',
    // axios: 'axios',
  },

  // 打包输出配置
  output: {
    path: resolve('./dist'),
    filename: isProd
      ? assetsDir('js') +
        '[name]' +
        (isDisableHash ? '' : '.[chunkhash:8]') +
        '.js'
      : 'assets/[name].js', // filename是相对于path路径生成
    publicPath: process.env.VUE_APP_CDN_PREFIX,
    assetModuleFilename: 'assets/img/[hash][ext][query]',
  },

  // 引入资源省略后缀、资源别名配置
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.vue', 'css', 'scss', 'pcss'],
    alias: {
      '@': resolve('src'),
      // vue$: 'vue/dist/vue.esm-bundler.js',
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      src: resolve('src'),
    },
  },

  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false,
          },
          output: {ascii_only: true},
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // noEmitOnErrors: true,

    // ...(isProd
    //   ? {
    //       splitChunks: {
    //         chunks: 'async', // 必须三选一： "initial" | "all" | "async"
    //         minSize: 30000, // 形成一个新代码块最小的体积
    //         minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数（译注：为保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
    //         maxAsyncRequests: 5, // 按需加载时候最大的并行请求数。
    //         maxInitialRequests: 3, // 一个入口最大的并行请求数。
    //         cacheGroups: {
    //           vendor: {
    //             name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
    //             chunks: 'all', // all-异步加载快，但初始下载量较大，文件共用性好； initial-初始下载量较小，但异步加载量较大，文件间有重复内容
    //             priority: -10,
    //             reuseExistingChunk: true, // 选项用于配置在模块完全匹配时重用已有的块，而不是创建新块
    //             test: /node_modules[\\/]/,
    //           },
    //         },
    //       },
    //     }
    //   : {}),

    // end of optimization
  },

  // 定义模块规则
  module: {
    unknownContextCritical: false,
    noParse: /^(vue|vue-router|vuex|vuex-router-sync|axios)$/,
    rules: [
      {
        test: /\.vue$/,
        include: [resolve('./src'), /\/ui\/src\//],
        use: [
          {
            loader: 'vue-loader',
            options: {
              transformAssetUrls: {
                icon: ['data'], // The globally registered tag name, the default is icon
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/], // 为script有lang='ts'标识的脚本文件添加ts后缀
            },
          },
        ],
        exclude: [/node_modules/, /\.worker\.ts$/],
      },
      {
        test: /\.(postc|sa|sc|c)ss$/i,
        include: [resolve('./src'), /node_modules/, /\/ui\/src\//],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: [/assets\/svg-icon/],
      },
      // {
      //   test: /\.svg$/,
      //   include: ["./src/assets/svg-icon/"],
      //   use: [
      //     {
      //       loader: "@yzfe/svgicon-loader",
      //       options: {
      //         svgFilePath: ["./src/assets/svg-icon/"],
      //         svgoConfig: null, // Custom svgo configuration
      //       },
      //     },
      //   ],
      // },

      // end rules
    ],
  },

  // 插件选项
  plugins: [
    new Dotenv({
      path: resolve(envFilePath), // 不支持下划线变量？？
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
    }),

    // 定义环境变量
    new webpack.DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false,
    }),

    new ForkTsCheckerWebpackPlugin(),
    new RemoveEmptyScriptsPlugin(),

    // Ref: https://www.npmjs.com/package/webpack-assets-manifest
    new WebpackAssetsManifest({
      publicPath: true,
      entrypoints: true,
      output: 'assets-manifest.json',
    }),

    new VueLoaderPlugin(),

    // 清除上次构建的文件，清除目录是基于output出口目录
    ...(isProd ? [new CleanWebpackPlugin()] : []),

    new MiniCssExtractPlugin({
      filename: isProd
        ? assetsDir('css') +
          '[name]' +
          (isDisableHash ? '' : '.[chunkhash:8]') +
          '.css'
        : 'assets/[name].css', // 相对于 output.path 路径
    }),

    // 复制public文件
    // ...(isProd && fs.statSync(resolve("./public")).isDirectory()
    //   ? [
    //       new CopyWebpackPlugin({
    //         patterns: [
    //           {
    //             from: resolve("./public"),
    //             to: resolve("./dist"),
    //           },
    //         ],
    //       }),
    //     ]
    //   : []),

    ...(process.env.PROFILE === '1' ? [new BundleAnalyzerPlugin()] : []),

    // end plugins
  ],
}
