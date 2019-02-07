const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api/', {
      target: 'https://5bp27dtqzi.execute-api.us-east-1.amazonaws.com/dev/',
      pathRewrite: {
        '^/\\api': ''
      }
    })
  );
};
