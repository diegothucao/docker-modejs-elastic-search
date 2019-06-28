module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    env: {
      name : 'diego-service',
      NODE_ENV: 'development',
      REDIS_PASSS: 'diegocao'
    }
  }]
}
