module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loader: [require.resolve("@storybook/addon-storysource/loader")],
    enforce: "pre"
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
