module.exports = {
  apps : [{
    name      : 'diego-el-service',
    script    : 'dist/app.js',
    env: {
      name : 'diego-el-service',
      NODE_ENV: 'development'
    }
  }]
}
