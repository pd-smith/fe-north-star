const config = require(`./config/${process.env.ENVIRONMENT}.js`);
module.exports = {
  distDir: "build",
  publicRuntimeConfig: { ...config },
};
