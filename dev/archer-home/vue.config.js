const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProd = ["production", "prod"].includes(process.env.NODE_ENV);

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  devServer: {
    proxy: 'http://127.0.0.1:9607'
  },
  publicPath: isProd ? "/" : "/",
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@image", resolve("src/assets/image"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@components", resolve("src/components"));

    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          name: "npm.vue",
        },
        vuex: {
          test: /[\\/]node_modules[\\/]vuex[\\/]/,
          name: "npm.vuex",
        },
        router: {
          test: /[\\/]node_modules[\\/]vue[\\-]router[\\/]/,
          name: "npm.router",
        },
      },
    });

    if (isProd) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .end();

      config.plugins.delete("prefetch");
      const cdn = {
        css: [],
        js: [
          "https://s4.zstatic.net/npm/axios@0.26.0/dist/axios.min.js",
          "https://s4.zstatic.net/npm/vue-router@3.5.3/dist/vue-router.min.js",
          "https://s4.zstatic.net/npm/vue-i18n@8.27.0/dist/vue-i18n.min.js",
          "https://s4.zstatic.net/npm/vue@2.6.14/dist/vue.min.js",
          "https://s4.zstatic.net/npm/vuex@3.6.2/dist/vuex.min.js",
          "https://s4.zstatic.net/ajax/libs/element-ui/2.15.6/index.min.js"
        ],
      };

      config.plugin("html").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },
  configureWebpack: (config) => {
    const plugins = [];
    if (isProd) {
      config.externals = {
        axios: "axios",
        VueI18n: "vue-i18n",
        CodeMirror: "codemirror",
        vue: "Vue",
        vuex: "Vuex",
        'vue-router': "VueRouter",
        "element-ui": "ELEMENT"
      };

      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path][query][name].gz",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  pluginOptions: {
    i18n: {
      // locale: "Chinese",
      // fallbackLocale: "Chinese",
      locale: "English",
      fallbackLocale: "English",
      localeDir: "languages",
      enableInSFC: true,
    },
  },
  lintOnSave: false,
};
