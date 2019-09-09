module.exports = {
  apps : [{
    name      : 'diego-elasticsearch-service',
    script    : 'dist/app.js',
    env: {
      name : 'diego-elasticsearch-service',
      NODE_ENV: 'development',
      PORT: 8080,
      EL_URL: 'http://diego-elasticsearch:9200'
    }
  }]
}
