/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
