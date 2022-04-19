const mongoose = require('mongoose');

const connectDB = async function () {
  const conn = await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/googlebooks',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
