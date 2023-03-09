/* eslint-disable */

const { i18n, localePath } = require('./next-i18next.config');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([withPWA, withBundleAnalyzer], {
  pwa: {
    dest: 'public',
    disable: true,
    register: false,
  },
  i18n,
  localePath,
  optimizeFonts: false,
  images: {
    // loader: 'cloudinary',
    loader: 'custom',
    domains: ['res.cloudinary.com', 's3-eu-west-1.amazonaws.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // path: `https://res.cloudinary.com/dlwdq84ig/image/upload/`,
  },
  productionBrowserSourceMaps: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/storybook',
        destination: '/storybook/index.html',
        permanent: true,
      },
    ];
  },
});
