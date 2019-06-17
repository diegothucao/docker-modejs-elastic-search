module.exports = {
  apps : [{
    name      : 'diego-service',
    script    : 'dist/app.js',
    env: {
      name : 'diego-rabbitmq',
      NODE_ENV: 'development',
      REDIS_PASSS: 'diegocao'
    }
  }]
}
