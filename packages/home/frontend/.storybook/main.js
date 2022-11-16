const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../components/**/*.stories.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          // When using postCSS 8
          implementation: require('postcss'),
          postcssOptions: {
            plugins: {
              tailwindcss: {},
              autoprefixer: {},
            },
          },
        },
      },
    },
  ],
  typescript: { reactDocgen: false },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.modules.push(path.resolve(__dirname, '..'));

    config.resolve.fallback = {
      fs: false,
      tls: false,
      net: false,
      module: false,
      http: false,
      crypto: false,
      path: require.resolve('path-browserify'),
    };

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
    ];

    config.module.rules.find((rule) => rule.test.toString() === '/\\.css$/').exclude = /\.module\.css$/;

    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    });

    return config;
  },
};
