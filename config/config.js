module.exports = {
  port: process.env.PORT || 8080,
  db: {
    url : 'mongodb://localhost:27017/app',
    options :{
        useMongoClient: true,
        //promiseLibrary: bluebird
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
