module.exports = {
  apps : [{
    name      : 'diego-elasticsearch-service',
    script    : 'dist/app.js',
    env: {
      name : 'diego-elasticsearch-service',
      NODE_ENV: 'development'
    }
  }]
}
