module.exports = {
  transpileDependencies: ["vuetify"],
};
const Dotenv = require('dotenv-webpack');


module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
}