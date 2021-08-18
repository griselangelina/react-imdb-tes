module.exports = (api) => {
  const isJest = api.caller(({ name }) => name === 'babel-jest');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isJest ? 'auto' : false,
          useBuiltIns: false,
          ...(isJest ? { targets: { node: 10 } } : {}),
        },
      ],
      [
        '@babel/preset-react',
        {
          development: false,
          throwIfNamespace: false,
        },
      ],
    ],
    plugins: [
      ['transform-imports'],
      [
        '@babel/plugin-proposal-optional-chaining',
        {
          loose: false,
        },
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-proposal-json-strings',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
    ],
  };
};
