module.exports = function(api) {
  api.cache(true);

  const presets = [['@babel/env']];
  const plugins = [
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
