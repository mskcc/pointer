module.exports = function (api) {
  api.cache(true);

  const plugins = [['@babel/transform-runtime', { regenerator: true }]];
  const presets = ['@babel/preset-react', '@babel/preset-env'];

  return {
    presets,
    plugins,
  };
};
