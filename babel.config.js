module.exports = function (api) { // eslint-disable-line func-names
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset',
      'module:react-native-dotenv'
    ],
  };
};
