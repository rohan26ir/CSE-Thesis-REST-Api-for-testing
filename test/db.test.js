const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const connectDB = require('../src/db/db');

test('connectDB uses MONGO_URI when MONGODB_URI is not set', async () => {
  const originalMongoUri = process.env.MONGO_URI;
  const originalMongodUri = process.env.MONGODB_URI;
  const originalConnect = mongoose.connect;
  const originalExit = process.exit;
  const originalLog = console.log;
  const originalError = console.error;

  process.env.MONGO_URI = 'mongodb://localhost:27017/test-db';
  delete process.env.MONGODB_URI;

  let calledUrl;
  mongoose.connect = async (uri) => {
    calledUrl = uri;
    return { connection: { host: 'localhost' } };
  };

  process.exit = () => {
    throw new Error('process.exit was called');
  };

  console.log = () => {};
  console.error = () => {};

  try {
    await connectDB();
    assert.equal(calledUrl, process.env.MONGO_URI);
  } finally {
    mongoose.connect = originalConnect;
    process.exit = originalExit;
    console.log = originalLog;
    console.error = originalError;

    if (originalMongoUri === undefined) {
      delete process.env.MONGO_URI;
    } else {
      process.env.MONGO_URI = originalMongoUri;
    }

    if (originalMongodUri === undefined) {
      delete process.env.MONGODB_URI;
    } else {
      process.env.MONGODB_URI = originalMongodUri;
    }
  }
});
