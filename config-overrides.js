const { ProvidePlugin } = require('webpack');
const path = require('path');
const {
  override,
  addWebpackAlias,
} = require('customize-cra');
const addDevTools = config => {
  if (process.env.NODE_ENV === 'development') {
    config.devtool = 'eval-source-map';
  }
  return config;
};

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addDevTools,
  config => ({
    ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.m?[jt]sx?$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
                {
                    test: /\.m?[jt]sx?$/,
                    resolve: {
                        fullySpecified: false,
                    },
                },
            ],
        },
        plugins: [
            ...config.plugins,
            new ProvidePlugin({
                process: 'process/browser',
            }),
        ],
        resolve: {
            ...config.resolve,
            fallback: {
                assert: require.resolve('assert'),
                buffer: require.resolve('buffer'),
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                path: require.resolve('path-browserify'),
                os: require.resolve('os-browserify/browser'),
            },
        },
        ignoreWarnings: [/Failed to parse source map/],
  }),
);
