module.exports = {
  name: 'Glosh',
  mongodb: {
    uri: 'mongodb://localhost',
    port: 27017,
    options: {
      promiseLibrary: global.Promise,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  }
};
