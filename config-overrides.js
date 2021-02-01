var path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@Components": path.resolve(__dirname, "src/components"),
      "@Containers": path.resolve(__dirname, "src/containers"),
      "@GlobalStyles": path.resolve(__dirname, "src/globalStyles"),
    },
  };
  return config;
};
