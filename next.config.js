module.exports = {
  reactStrictMode: true,
  "resolutions": {
    "webpack": "^5.0.0-beta.28"
  },
  webpack: (config, options) => {
    config.experiments = {
        "topLevelAwait": true
    }
    return config
  },
}
