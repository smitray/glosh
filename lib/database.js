import mongoose from 'mongoose';

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    const mongo = process.env.mongodb;
    await mongoose.connect(
      `${mongo.uri}:${mongo.port}/${mongo.db}`, {
        ...mongo.options,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD
      }
    );
  }

  return handler(req, res);
};

const db = mongoose.connection;
db.once('open', () => {
  console.log(`connected to mongo: ${db.host}:${db.port}/${db.name}`);
});

export default connectDb;
