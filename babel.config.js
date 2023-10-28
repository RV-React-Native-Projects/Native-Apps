module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "/assets",
            "@appConfig": "./app.json",
            "@config": "./Config.json",
            "@cards": "./cards",
            "@common": "./common",
            "@components": "./components",
            "@constants": "./constants",
            "@contexts": "./contexts",
            "@helpers": "./helpers",
            "@hooks": "./hooks",
            "@navigation": "./navigation",
            "@screens_components": "./screens_components",
            "@screens": "./screens",
            "@skeltons": "./skeltons",
            "@services": "./services",
            "@features": "./services/features",
            "@global": "./services/global",
            "@redux": "./redux",
            "@reducers": "./redux/reducers",
          },
        },
      ],
    ],
  };
};
